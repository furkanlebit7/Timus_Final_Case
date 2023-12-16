/*
  Warnings:

  - You are about to drop the `Factory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FactoryDetail" DROP CONSTRAINT "FactoryDetail_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropTable
DROP TABLE "Factory";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "factory_list" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "membershipDate" TIMESTAMP(3) NOT NULL,
    "membershipEndDate" TIMESTAMP(3) NOT NULL,
    "employeeCount" INTEGER NOT NULL,
    "isFreeMember" BOOLEAN NOT NULL,

    CONSTRAINT "factory_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryDetail" ADD CONSTRAINT "FactoryDetail_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "factory_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
