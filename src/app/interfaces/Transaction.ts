import { IContact } from './Contact';
import { IUser } from './User';

export interface ITransaction {
  /** Who sends the transaction  */
  sender: IUser;

  /** Date of the transaction */
  transactionDate: Date;

  /** Receiver of the transaction */
  receiver: IContact;

  /** Amount of transaction */
  amount: number;
  
}
