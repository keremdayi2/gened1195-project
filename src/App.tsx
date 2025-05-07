import IngredientList from './components/IngredientList';
import IngredientConstraintButton from './components/IngredientConstraintButton';
import { useState } from 'react';

const api_key = import.meta.env.VITE_SECRET_API_KEY;


// we lifted the state up so we can make calls here.
const defaultList = [
  { selected: false, name: "Eggs" },
  { selected: false, name: "Bread" },
];

// strictness button
const idxToStrict : string[] = ['Strict', 'Include', 'Suggest'];
const idxToColor : string[] = ['text-red-700', 'text-blue-500', 'text-green-500'];

function App() {
  const [ingredients, setIngredients] = useState(defaultList);
  const [strictIdx, setStrictIdx] = useState(0); 

  const [messages, setMessages] = useState([{role : 'user', content : 'Generate me a recipe.'}]);
  
  const callAPI = async () => {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'api-key': api_key
      },
      body: JSON.stringify({
        ingredients : ingredients,
        strictness : strictIdx
      })
    });
  
    const data = await res.json();

    console.log("Raw response data:", data);
    
    let updatedMessages = [...messages];
    updatedMessages.push(data);

    setMessages(updatedMessages);
  };

  return (
    <>
      <div className="flex justify-center h-screen w-scree">
        <div className="flex flex-row w-full max-w-6x">
          <div className="flex flex-col max-w-xs w-full border-r-2 border-gray-400 p-2">
            <IngredientConstraintButton strictIdx={strictIdx} setStrictIdx={setStrictIdx}></IngredientConstraintButton>
            <IngredientList ingredients={ingredients} setIngredients={setIngredients}></IngredientList>
            <button className='text-amber-700 my-2 hover:text-amber-400 border-1 border-amber-700 rounded-md' onClick={callAPI}>Generate</button>
          </div>
          <div className="flex flex-col w-full items-center m-2 overflow-y-scroll">
            <p>{messages[messages.length-1].content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
