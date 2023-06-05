import { Account } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { CreateAccountDTO } from '../dto/AccountDTO';
import { AccountNotFound } from '../errors/AccountNotFound';

export class AccountService {
  public async getAccounts(): Promise<Account[]> {
    return await prismaClient.account.findMany();
  }

  public async getById(id: number): Promise<Account | null> {
    return prismaClient.account.findUnique({
      where: { id },
    });
  }

  public async createAccount(accountDTO: CreateAccountDTO): Promise<Account> {
    const newAccount = await prismaClient.account.create({
      data: {
        ...accountDTO,
      },
    });

    return newAccount;
  }

  public async updateAccountBalance(
    accountId: number,
    amount: number,
    transactionType: 'debit' | 'credit'
  ): Promise<void> {
    const account = await prismaClient.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new AccountNotFound();
    }

    // Atualize o saldo da conta
    const updatedAccount = await prismaClient.account.update({
      where: { id: accountId },
      data: {
        balance:
          transactionType === 'debit'
            ? Number(account.balance) - amount
            : Number(account.balance) + amount,
      },
    });
  }
}
