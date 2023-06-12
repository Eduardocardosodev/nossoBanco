import { prismaClient } from '../database/prismaClient';
import { CreateAccountDTO } from '../dto/AccountDTO';
import { Account } from '../entities/Account';
import { AccountNotFound } from '../errors/AccountNotFound';

export class AccountService {
  public async getAccounts(): Promise<Account[]> {
    const accounts = await prismaClient.account.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });

    // Mapeie os dados para suas entidades personalizadas
    const mappedAccounts: Account[] = accounts.map((account) => {
      return new Account(account.id, Number(account.balance));
    });

    return mappedAccounts;
  }

  public async getById(id: number): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { id },
    });

    if (!account) {
      return null;
    }

    // Mapeie os dados para sua entidade Account
    const mappedAccount: Account = new Account(
      account.id,
      Number(account.balance)
    );

    return mappedAccount;
  }

  public async createAccount(accountDTO: CreateAccountDTO): Promise<Account> {
    const newAccount = await prismaClient.account.create({
      data: {
        ...accountDTO,
      },
    });

    // Mapeie os dados para sua entidade Account
    const mappedAccount: Account = new Account(
      newAccount.id,
      Number(newAccount.balance)
    );

    return mappedAccount;
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
