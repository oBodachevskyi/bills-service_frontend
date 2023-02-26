import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import type { BillsListProps } from '../types/bills-list';
import Moment from 'moment';
import { TableContainer } from '../style/styles.styled';

export function BillsTable(props: BillsListProps) {
  const { bills, handleUpdatePaymentStatus } = props;
  const handelBillClick = (id: string) => {
    handleUpdatePaymentStatus(id);
  };

  return (
    <TableContainer>
      <Table striped bordered hover style={{ textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Bill`s code</th>
            <th>Payer</th>
            <th>Game</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Creation date</th>
            <th>Payment date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(
            ({
              _id,
              number,
              game,
              payer,
              amount,
              currency,
              createdAt,
              datePaid,
            }) => (
              <tr key={_id}>
                <td>{number}</td>
                <td>{payer.name}</td>
                <td>{game.name}</td>
                <td>{amount}</td>
                <td>{currency}</td>
                <td>{Moment(createdAt).format('DD-MM-YYYY')}</td>
                <td style={{ textAlign: 'center' }}>
                  {datePaid ? (
                    Moment(datePaid).format('DD-MM-YYYY')
                  ) : (
                    <Button
                      style={{ width: '130px', height: '38px' }}
                      variant='primary'
                      id='pay'
                      onClick={() => handelBillClick(_id)}
                    >
                      Pay bill
                    </Button>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
