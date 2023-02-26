import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import type {
  CreateNewBillProps,
  FormValueType,
} from '../types/create-new-bill.types';
import { PayerSelect } from './payer-select';
import { GameSelect } from './game-select';
import { FilterBarCase } from '../style/styles.styled';

const initFormState = {
  payer: '',
  game: '',
  amount: '',
  currency: '',
};

export function CreateBillModal(props: CreateNewBillProps) {
  const { show, setShow, onAddHandler, payersList, gamesList } = props;
  const [showSecModal, setShowModal] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValueType>(
    () => initFormState
  );
  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (event: {
    currentTarget: { id: string; value: string };
  }) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleAddBill = () => {
    if (
      formValues.payer &&
      formValues.game &&
      formValues.amount &&
      formValues.currency &&
      Number(formValues.amount) > 0
    ) {
      onAddHandler(formValues);
      setShow(false);
    } else {
      Notify.failure('Please, enter correct information');
    }
  };
  return (
    <>
      <Modal show={!showSecModal ? show : false} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Creating new bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <PayerSelect payersList={payersList} handleChange={handleChange} />
            <GameSelect gamesList={gamesList} handleChange={handleChange} />
            <Form.Group className='mb-3'>
              <Form.Label>Enter the amount and select the currency</Form.Label>
              <FilterBarCase>
              <Form.Control
                id='amount'
                onChange={handleChange}
                type='number'
                placeholder='0.00'
                style={{ marginRight: '10px' }}
              />
              <Form.Select id='currency' onChange={handleChange}>
                <option value=''>Select currency</option>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
              </Form.Select>
              </FilterBarCase>
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>         
          <Button variant='primary' type='button' onClick={handleAddBill}>
            Create
          </Button>
          <Button variant='secondary' onClick={() => setShow(!show)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showSecModal && (
        <Modal
          show={showSecModal}
          onHide={handleClose}
          animation={false}
          enforceFocus={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
