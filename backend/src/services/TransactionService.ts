import { Transactions } from '@prisma/client';
import { SendMoneyDTO } from '../dto/AccountDTO';
import { AccountService } from './AccountService';
import { prismaClient } from '../database/prismaClient';
import { AccountNotFound } from '../errors/AccountNotFound';
import { InsufficientBalance } from '../errors/InsufficientBalance';

export class TransactionService {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  public createTransaction = async (
    transactions: SendMoneyDTO
  ): Promise<Transactions> => {
    // Verifique se as contas existem
    const senderAccount = await this.accountService.getById(
      transactions.senderAccountId
    );
    const recipientAccount = await this.accountService.getById(
      transactions.recipientAccountId
    );

    if (!senderAccount || !recipientAccount) {
      throw new AccountNotFound();
    }

    // Verifique se o saldo da conta de origem é suficiente
    if (Number(senderAccount.balance) < transactions.amount) {
      throw new InsufficientBalance();
    }

    // Atualize o saldo das contas
    const updatedSenderAccount = await this.accountService.updateAccountBalance(
      transactions.senderAccountId,
      transactions.amount,
      'debit'
    );

    const updatedRecipientAccount =
      await this.accountService.updateAccountBalance(
        transactions.recipientAccountId,
        transactions.amount,
        'credit'
      );

    // Crie a transação
    const createdTransaction = await prismaClient.transactions.create({
      data: {
        value: transactions.amount,
        debitedTransaction: true, //senderAccount.id
        creditedTransaction: true, //recipientAccount.id
        account: {
          connect: {
            id: transactions.senderAccountId,
          },
        },
      },
    });

    return createdTransaction;
  };
}
