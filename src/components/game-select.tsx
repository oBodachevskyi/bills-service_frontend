import Form from 'react-bootstrap/Form';
import { GameSelectProps } from '../types/bills-list';

export function GameSelect(props: GameSelectProps) {
  const { gamesList, handleChange, value } = props;
  return (
    <Form.Group className='mb-3'>
      <Form.Label>Choose game</Form.Label>

      <Form.Select id='game' onChange={handleChange} value={value}>
        <option value=''>Select game</option>
        {gamesList &&
          gamesList.map((game) => (
            <option key={game._id} value={game._id}>
              {game.name}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  );
}
