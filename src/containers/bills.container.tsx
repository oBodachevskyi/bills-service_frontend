import { useState } from 'react';
import { BillsTable } from '../components/bills-list';
import { FilterBar } from '../components/filters-bar';
import { useGetAllBillsQuery, useUpdatePaymentStatusMutation } from '../redux/slice/bills.API-slices';
import { useLazyGetAllGamesQuery } from '../redux/slice/games.API-slices';
import { useLazyGetAllPayersQuery } from '../redux/slice/payers.API-slices';
import { useAddNewBillMutation } from '../redux/slice/bills.API-slices';
import { FilterParamsType } from '../types/bills-list';
import { FormValueType } from '../types/create-new-bill.types';
import {GameType, PayerType} from '../types/data-type'

export function BillsContainer() {
  const [filterParams, setFilterParams] = useState<FilterParamsType>({
    payer: '',
    game: '',
  });
  const [gamesList, setGamesList] = useState<GameType[] | null>(null);
  const [payersList, setPayersList] = useState<PayerType[] | null>(null);
  const { data: bills } = useGetAllBillsQuery(filterParams);
  const [getAllGames] = useLazyGetAllGamesQuery();
  const [getAllPayers] = useLazyGetAllPayersQuery();
  const [addNewBill] = useAddNewBillMutation();
  const [updatePaymentStatus] =useUpdatePaymentStatusMutation();

  const onCreateBillBtnClick = async () => {
    const games = await getAllGames('games').unwrap();
    const payers = await getAllPayers('payers').unwrap();
    setGamesList(games);
    setPayersList(payers);
  };

  const onAddHandler = async (params: FormValueType) => {
    await addNewBill(params).unwrap();
  };
  const onFilterChange = (event: {
    currentTarget: { id: string; value: string };
  }) => {
     setFilterParams({
      ...filterParams,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleUpdatePaymentStatus = async (id:string) => {
    await updatePaymentStatus({id, isPaid: true}).unwrap()

  }

  return (
    <>
      <FilterBar
        gamesList={gamesList}
        payersList={payersList}
        onChange={onFilterChange}
        onCreateBillBtnClick={onCreateBillBtnClick}
        onAddHandler={onAddHandler}
        setFilterParams={setFilterParams}
        filterParams={filterParams}
      />
      {bills && <BillsTable bills={bills} handleUpdatePaymentStatus={handleUpdatePaymentStatus}/>}
    </>
  );
}
