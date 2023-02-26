import Form from 'react-bootstrap/Form';
import { PayerSelectProps } from '../types/bills-list';

export function PayerSelect(props: PayerSelectProps) {
  const { payersList, handleChange, value } = props;

  return (
    <Form.Group className='mb-3' >
      <Form.Label>Choose payer</Form.Label>
      <Form.Select id='payer' onChange={handleChange} value={value}>
        <option value=''>Select payer</option>
        {payersList &&
          payersList.map((payer) => (
            <option key={payer._id} value={payer._id}>
              {payer.name}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  );
}
