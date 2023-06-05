import { Request, Response } from 'express';
import { SendMoneyDTO } from '../dto/AccountDTO';
import { TransactionService } from '../services/TransactionService';
import { AccountNotFound } from '../errors/AccountNotFound';
import { InsufficientBalance } from '../errors/InsufficientBalance';

export class TransactionController {
  private transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  public createTransaction = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { senderAccountId, recipientAccountId, amount } = req.body;

      // Chame o método do serviço para criar a transação
      const createdTransaction =
        await this.transactionService.createTransaction({
          senderAccountId,
          recipientAccountId,
          amount,
        });

      res.status(201).json({ message: 'Transação criada com sucesso.' });
    } catch (error: any) {
      if (error instanceof AccountNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InsufficientBalance) {
        res.status(422).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar a transação.' });
      }
    }
  };
}
