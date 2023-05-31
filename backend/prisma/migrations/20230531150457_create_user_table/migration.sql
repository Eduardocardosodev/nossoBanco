-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "dateOfBirth" TIME NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
