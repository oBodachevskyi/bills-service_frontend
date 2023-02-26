import { FormValueType } from "./create-new-bill.types";
import { BillType, GameType, PayerType } from "./data-type";

export interface BillsListProps {
  readonly bills: BillType[];
  readonly handleUpdatePaymentStatus: (id: string) => void;
}

export interface FilterBarProps {
  readonly onCreateBillBtnClick: () => void;
  readonly payersList: PayerType[] | null;
  readonly gamesList: GameType[] | null;
  readonly onAddHandler: (params: FormValueType) => void;
  readonly onChange: (event: {
    currentTarget: {
      id: string;
      value: string;
    };
  }) => void;
  readonly filterParams: FilterParamsType;
  readonly setFilterParams: (params: { payer: string; game: string }) => void;
}

export interface GameSelectProps {
  readonly gamesList: GameType[] | null;
  readonly handleChange: (event: {
    currentTarget: {
      id: string;
      value: string;
    };
  }) => void;
  readonly value?: string;
}

export interface PayerSelectProps {
  readonly payersList: PayerType[] | null;
  readonly handleChange: (event: {
    currentTarget: {
      id: string;
      value: string;
    };
  }) => void;
  readonly value?: string;
}

export interface FilterParamsType {
  readonly payer: string;
  readonly game: string;
}
