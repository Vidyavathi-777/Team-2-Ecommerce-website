/*
  Warnings:

  - You are about to drop the column `key` on the `ProductSpecification` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductSpecification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductSpecification" DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "specId" TEXT;

-- CreateTable
CREATE TABLE "SpecificationTemplate" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "SpecificationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpecificationTemplate_key_key" ON "SpecificationTemplate"("key");

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_specId_fkey" FOREIGN KEY ("specId") REFERENCES "SpecificationTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
