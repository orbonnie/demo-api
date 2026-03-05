/*
  Warnings:

  - You are about to drop the `resources` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('development', 'staging', 'production');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('success', 'failure', 'pending');

-- DropTable
DROP TABLE "resources";

-- CreateTable
CREATE TABLE "deploy" (
    "id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "environment" "Environment" NOT NULL,
    "status" TEXT NOT NULL,
    "deployed_at" TIMESTAMP(3) NOT NULL,
    "version" TEXT NOT NULL,
    "deployer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deploy_pkey" PRIMARY KEY ("id")
);
