-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factory" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "membershipDate" TIMESTAMP(3) NOT NULL,
    "membershipEndDate" TIMESTAMP(3) NOT NULL,
    "employeeCount" INTEGER NOT NULL,
    "isFreeMember" BOOLEAN NOT NULL,

    CONSTRAINT "Factory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactoryDetail" (
    "id" SERIAL NOT NULL,
    "usingDepartment" TEXT NOT NULL,
    "dateRange" TIMESTAMP(3) NOT NULL,
    "usageKw" INTEGER NOT NULL,
    "usageCost" INTEGER NOT NULL,
    "discountedPrice" BOOLEAN NOT NULL,
    "factoryId" INTEGER NOT NULL,

    CONSTRAINT "FactoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FactoryDetail_factoryId_key" ON "FactoryDetail"("factoryId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryDetail" ADD CONSTRAINT "FactoryDetail_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
