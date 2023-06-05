import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import { AccountNotFound } from '../errors/AccountNotFound';
import { SendMoneyDTO } from '../dto/AccountDTO';

class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
    this.index = this.index.bind(this);
  }

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const accounts = await this.accountService.getAccounts();

      if (accounts.length === 0) {
        throw new AccountNotFound();
      }

      res.status(200).json({ accounts });
    } catch (error: any) {
      if (error instanceof AccountNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar as contas' });
      }
    }
  }

  // public async sendMoney(req: Request, res: Response): Promise<void> {
  //   const { senderAccountId, recipientAccountId, amount } =
  //   req.body as SendMoneyDTO;

  //   // Verificar se as contas existem
  //   const senderAccount = await this.accountService.getById(senderAccountId);
  //   const recipientAccount = await this.accountService.getById(
  //     recipientAccountId
  //     );

  //     if (!senderAccount || !recipientAccount) {
  //       throw new AccountNotFound();
  //     }

  //     // Verificar se o saldo é suficiente para a transferência
  //     if (senderAccount.balance < amount) {
  //       res
  //       .status(400)
  //       .json({ message: 'Saldo insuficiente para a transferência' });
  //       return;
  //     }
  //     try {
  //       // Executar a transação de envio de dinheiro
  //   await this.transactionService.sendMoney(senderAccountId, recipientAccountId, amount);

  //   res.status(200).json({ message: 'Transferência realizada com sucesso' });
  //   } catch (error: any) {
  //     if (error instanceof AccountNotFound) {
  //       res.status(404).json({ error: error.message });
  //     } else {
  //       console.log(error.message);
  //       res.status(500).json({ error: 'Erro ao listar as contas' });
  //     }
  //   }
  // }
}
export default AccountController;
