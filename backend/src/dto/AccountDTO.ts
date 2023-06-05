export interface CreateAccountDTO {
  balance: number;
  user_id: number;
}

export interface SendMoneyDTO {
  senderAccountId: number;
  recipientAccountId: number;
  amount: number;
}
