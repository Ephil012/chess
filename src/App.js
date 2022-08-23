import Board from "./Board";
import { useState } from 'react';

function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const listItems = numbers.map((number) => 
    {
      let res = <option value={number}>{number}</option>
      return res
    }
  );
  
  const [size, setSize] = useState(numbers[numbers.length - 1]);

  return (
    <div className="min-h-screen min-w-screen bg-slate-100 flex flex-col content-between flex-1 py-4">
      <Board n={size}/>
      <div className='flex flex-col content-center items-center'>
        <label className='font-medium text-lg'>Board Size</label>
        <select className='p-4 drop-shadow-med rounded-lg mt-2' defaultValue={size} onChange={event => setSize(event.target.value)}>
          {listItems}
        </select>
      </div>
    </div>
  );
}

export default App;
