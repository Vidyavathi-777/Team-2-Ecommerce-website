/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `productId` on the `ProductSpecification` table. All the data in the column will be lost.
  - You are about to drop the column `specId` on the `ProductSpecification` table. All the data in the column will be lost.
  - You are about to drop the `SpecificationTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `key` to the `ProductSpecification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `ProductSpecification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductSpecification" DROP CONSTRAINT "ProductSpecification_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSpecification" DROP CONSTRAINT "ProductSpecification_specId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ProductSpecification" DROP COLUMN "productId",
DROP COLUMN "specId",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- DropTable
DROP TABLE "SpecificationTemplate";

-- CreateTable
CREATE TABLE "ProductOnSpecification" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,

    CONSTRAINT "ProductOnSpecification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductOnSpecification" ADD CONSTRAINT "ProductOnSpecification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnSpecification" ADD CONSTRAINT "ProductOnSpecification_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "ProductSpecification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
