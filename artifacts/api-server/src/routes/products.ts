import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListProductsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (req, res) => {
  try {
    const rows = await db.select().from(productsTable).orderBy(productsTable.createdAt);
    const data = ListProductsResponse.parse(rows.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })));
    res.json(data);
  } catch (err) {
    req.log.error(err, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, category, price, imageUrl, description, rating } = req.body as {
      name: string;
      category: string;
      price: number;
      imageUrl: string;
      description?: string;
      rating?: number;
    };
    if (!name || !category || price === undefined || !imageUrl) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const [row] = await db
      .insert(productsTable)
      .values({ name, category, price, imageUrl, description: description ?? "", rating: rating ?? 4.5 })
      .returning();
    res.status(201).json({ ...row, createdAt: row.createdAt.toISOString() });
  } catch (err) {
    req.log.error(err, "Failed to create product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const deleted = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
    if (deleted.length === 0) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    req.log.error(err, "Failed to delete product");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
