import { User } from "./user";

export class inviting {
  sender: User | null = null;
  recipient: User | null = null;
  number: number | null = null;
  isAccepted: boolean = false;

  public setInviting(isAccepted: boolean, sender: User | null, recipient: User | null){
    this.isAccepted = isAccepted;
    this.sender = sender;
    this.recipient = recipient;
  }
}