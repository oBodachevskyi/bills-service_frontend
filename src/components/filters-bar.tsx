import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FilterBarProps } from '../types/bills-list';
import { CreateBillModal } from './create-bill-modal';
import { GameSelect } from './game-select';
import { PayerSelect } from './payer-select';
import {
  FilterBarCase,
  FilterBarContainer,
  GameSelectFilterBarCase,
  PayerSelectFilterBarCase,
} from '../style/styles.styled';
const Logs = require('../assets/24playLogo.jpg');

export function FilterBar(props: FilterBarProps) {
  const {
    onCreateBillBtnClick,
    payersList,
    gamesList,
    onAddHandler,
    onChange,
    filterParams,
    setFilterParams,
  } = props;
  const [show, setShow] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const openFilters = () => {
    onCreateBillBtnClick();
    setShowFilters(!showFilters);
  };

  const createBillBtnClick = () => {
    onCreateBillBtnClick();
    setShow(true);
  };

  return (
    <>
      <FilterBarContainer>
        <img src={Logs} alt='' width='170' height='38' />
        <FilterBarCase>
          <Button
            variant='primary'
            onClick={openFilters}
            style={{ marginRight: '10px' }}
          >{`${showFilters ? 'Close' : 'Open'} filter-bar`}</Button>

          <Button variant='primary' onClick={createBillBtnClick}>
            Create new bill
          </Button>
        </FilterBarCase>
      </FilterBarContainer>

      {showFilters && (
        <FilterBarContainer>
          <FilterBarCase>
            <PayerSelectFilterBarCase>
              <PayerSelect
                payersList={payersList}
                handleChange={onChange}
                value={filterParams.payer}
              />
            </PayerSelectFilterBarCase>
            <GameSelectFilterBarCase>
              <GameSelect
                gamesList={gamesList}
                handleChange={onChange}
                value={filterParams.game}
              />
            </GameSelectFilterBarCase>
          </FilterBarCase>
          <Button
            style={{ width: '130px', height: '38px' }}
            variant='primary'
            onClick={() => {
              setFilterParams({ payer: '', game: '' });
            }}
          >
            Clear filters
          </Button>
        </FilterBarContainer>
      )}

      {show && (
        <CreateBillModal
          show={show}
          setShow={setShow}
          gamesList={gamesList}
          payersList={payersList}
          onAddHandler={onAddHandler}
        />
      )}
    </>
  );
}
