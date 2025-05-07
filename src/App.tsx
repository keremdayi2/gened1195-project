import IngredientList from './components/IngredientList';
import { useState } from 'react';


// we lifted the state up so we can make calls here.
const defaultList = [
  { selected: false, name: "Eggs" },
  { selected: false, name: "Bread" },
];

function App() {
  const [ingredients, setIngredients] = useState(defaultList);
  const [messages, setMessages] = useState('');
  
  const callOpenAI = async () => {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'api-key': import.meta.env.SECRET_API_KEY
      },
      body: JSON.stringify({
        ingredients : ingredients,
        
      })
    });
  
    const data = await res.json();
    console.log(data);

    setMessages(JSON.stringify(data));
  };

  return (
    <>
      <div className="flex justify-center h-screen w-scree">
        <div className="flex flex-row w-full max-w-6x">
          <div className="flex flex-col max-w-xs w-full border-r-2 border-gray-400 p-2">
            <IngredientList ingredients={ingredients} setIngredients={setIngredients}></IngredientList>
            <button className='text-amber-700 my-2 hover:text-amber-400 border-1 border-amber-700 rounded-md' onClick={callOpenAI}>Generate</button>
          </div>
          <div className="flex flex-col w-full items-center m-2 overflow-y-scroll">
            <p>{messages}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
