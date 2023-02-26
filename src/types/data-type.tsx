export interface GameType {
    _id: string;
    name: string;
  }
  
  export interface PayerType {
    _id: string;
    name: string;
    code: string;
  }

  export interface BillType {
    readonly amount: number;
    readonly currency: 'USD' | 'EUR';
    readonly createdAt: string;
    readonly updated: string;
    readonly isPaid: boolean;
    readonly datePaid?: string;
    readonly number: string;
    readonly _id: string;
    readonly game: GameType;
    readonly payer: PayerType;
  }