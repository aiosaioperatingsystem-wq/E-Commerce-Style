import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { ListOrdersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/orders", async (req, res) => {
  try {
    const rows = await db.select().from(ordersTable).orderBy(ordersTable.createdAt);
    const data = ListOrdersResponse.parse(
      rows.map(r => ({ ...r, createdAt: r.createdAt.toISOString() }))
    );
    res.json(data);
  } catch (err) {
    req.log.error(err, "Failed to list orders");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { customerName, customerPhone, deliveryAddress, totalPrice, items } = req.body as {
      customerName?: string;
      customerPhone: string;
      deliveryAddress: string;
      totalPrice: number;
      items: unknown;
    };
    if (!customerPhone || !deliveryAddress || totalPrice === undefined || !items) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const [row] = await db
      .insert(ordersTable)
      .values({ customerName: customerName ?? "", customerPhone, deliveryAddress, totalPrice, items })
      .returning();
    res.status(201).json({ ...row, createdAt: row.createdAt.toISOString() });
  } catch (err) {
    req.log.error(err, "Failed to create order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
