CREATE TABLE IF NOT EXISTS "products" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" text NOT NULL,
        "category" text NOT NULL,
        "price" integer NOT NULL,
        "image_url" text NOT NULL,
        "description" text DEFAULT '' NOT NULL,
        "rating" real DEFAULT 4.5 NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
        "id" serial PRIMARY KEY NOT NULL,
        "customer_name" text DEFAULT '' NOT NULL,
        "customer_phone" text NOT NULL,
        "delivery_address" text NOT NULL,
        "total_price" integer NOT NULL,
        "items" jsonb NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
