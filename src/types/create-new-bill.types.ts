import { GameType, PayerType } from "./data-type";

export interface FormValueType {
  payer: string;
  game: string;
  amount: string;
  currency: string;
}

export interface CreateNewBillProps {
  readonly show: boolean;
  readonly setShow: (params: boolean) => void;
  readonly onAddHandler: (params: FormValueType) => void;
  readonly payersList:
    | PayerType[]
    | null;
  readonly gamesList:
    | GameType[]
    | null;
}
