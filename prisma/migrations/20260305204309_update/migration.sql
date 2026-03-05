/*
  Warnings:

  - The primary key for the `deploy` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "deploy" DROP CONSTRAINT "deploy_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "deploy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "deploy_id_seq";
