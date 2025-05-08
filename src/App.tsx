import IngredientList from './components/IngredientList';
import IngredientConstraintButton from './components/IngredientConstraintButton';
import { useState } from 'react';
import ChatbotList from './components/ChatbotList';
import DietaryRestrictionList from './components/DietaryRestrictionList';
import CuisineList from './CuisineList';

const api_key = import.meta.env.VITE_SECRET_API_KEY;


// we lifted the state up so we can make calls here.
const defaultIngredientsList = [
  { selected: true, name: "Eggs" },
  { selected: false, name: "Bread" },
];

const defaultRestrictionList = [
  {selected : false, name: 'Vegetarian'},
  {selected : false, name: 'Vegan'},
  {selected : false, name: 'Gluten free'},
  {selected : false, name: 'Peanut allergy'},
  {selected : false, name: 'Dairy free'},
];

const defaultCuisineList = [
  { selected: false, name: 'American 🇺🇸'},
  { selected: false, name: 'Turkish 🇹🇷'},
  { selected: false, name: 'Mexican 🇲🇽'},
];

// strictness button
function App() {
  const [ingredients, setIngredients] = useState(defaultIngredientsList);
  const [restrictions, setRestrictions] = useState(defaultRestrictionList);
  const [cuisine, setCuisine] = useState(defaultCuisineList);

  const [strictIdx, setStrictIdx] = useState(0); 

  const [messages, setMessages] = useState([{role : 'user', content : 'Generate me a recipe.'}]);
  
  const callAPI = async () => {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'api-key': api_key
      },
      body: JSON.stringify({
        ingredients: ingredients,
        strictness: strictIdx,
        restrictions: restrictions,
        cuisine: cuisine,
        history: messages
      })
    });
  
    const data = await res.json();

    console.log("Raw response data:", data);
    
    let updatedMessages = [...messages];
    updatedMessages.push({role : data.role, content : data.content});
    updatedMessages.push({role : 'user', content : ''})

    setMessages(updatedMessages);
  };

  return (
    <>
      <div className="flex h-screen justify-center w-screen">
        <div className="flex flex-row w-full max-w-6xl">
          <div className="flex flex-col max-w-xs w-full border-r-2 border-amber-800 p-2">
            <IngredientConstraintButton strictIdx={strictIdx} setStrictIdx={setStrictIdx}></IngredientConstraintButton>
            <IngredientList ingredients={ingredients} setIngredients={setIngredients}></IngredientList>
            <CuisineList cuisine={cuisine} setCuisine={setCuisine}></CuisineList>
            <DietaryRestrictionList restrictions={restrictions} setRestrictions={setRestrictions}></DietaryRestrictionList>
            <button className='text-amber-700 my-2 hover:text-amber-400 border-1 border-amber-700 rounded-md' onClick={callAPI}>Generate</button>
          </div>
          <div className="flex flex-col w-full items-center m-2 overflow-y-scroll">
          <ChatbotList messages={messages} setMessages={setMessages}></ChatbotList>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
