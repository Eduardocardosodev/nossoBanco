-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 100.00,
    "user_id" INTEGER,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "debitedTransaction" BOOLEAN NOT NULL,
    "creditedTransaction" BOOLEAN NOT NULL,
    "account_id" INTEGER,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
