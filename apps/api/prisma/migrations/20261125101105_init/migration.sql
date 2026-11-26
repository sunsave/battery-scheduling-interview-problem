-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Battery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "capacityKwh" REAL NOT NULL,
    "nickname" TEXT,
    "exportLimitKw" REAL NOT NULL,
    CONSTRAINT "Battery_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Battery_customerId_key" ON "Battery"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Battery_serialNumber_key" ON "Battery"("serialNumber");
