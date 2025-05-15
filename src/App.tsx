import IngredientList from './components/IngredientList';
import IngredientConstraintButton from './components/IngredientConstraintButton';
import { useState, useEffect } from 'react';
import ChatbotList from './components/ChatbotList';
import DietaryRestrictionList from './components/DietaryRestrictionList';
import CuisineList from './components/CuisineList';

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

// const defaultMessages = [
//   {role : 'user', content : 'Test content **test**\n # Testing \n ## Testing' },
//   {role : 'user', content : 'Test content **test**\n # Testing \n ## Testing' },
// ];

const defaultMessages = [{role : 'user', content : 'Generate me a recipe.'}];

// strictness button
function App() {
  const [ingredients, setIngredients] = useState(() => {
    const stored = localStorage.getItem('ingredients');
    return stored !== null ? JSON.parse(stored) : defaultIngredientsList;
  });
  const [restrictions, setRestrictions] = useState(() => {
    const stored = localStorage.getItem('restrictions');
    return stored !== null ? JSON.parse(stored) : defaultRestrictionList;
  });
  const [cuisine, setCuisine] = useState(() => {
    const stored = localStorage.getItem('cuisine');
    return stored !== null ? JSON.parse(stored) : defaultCuisineList;
  });

  const [strictIdx, setStrictIdx] = useState(() => {
    const stored = localStorage.getItem('strictIdx');
    return stored !== null ? JSON.parse(stored) : 0;
  }); 
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('messages');
    return stored !== null ? JSON.parse(stored) : defaultMessages;
  });
  
  // we will use useEffect in order to save the state to local storage
  // currently, we will save ingredients, restrictions, cuisine
  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    localStorage.setItem('restrictions', JSON.stringify(restrictions));
    localStorage.setItem('cuisine', JSON.stringify(cuisine));
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('strictIdx', JSON.stringify(strictIdx));
  }, [ingredients, restrictions, cuisine, messages, strictIdx]);

  const callAPI = async () => {
    let placeholderMessages = [...messages];
    placeholderMessages.push({role : 'assistant', content : 'Loading...'});
    setMessages([...placeholderMessages]);
    placeholderMessages.pop();

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
        history: placeholderMessages
      })
    });

    const data = await res.json();

    
    console.log("Raw response data:", data);
    let updatedMessages = [...placeholderMessages];
    updatedMessages.push({role : data.role, content : data.content});
    updatedMessages.push({role : 'user', content : ''})

    setMessages(updatedMessages);
  };

  return (
    <>
      <div className="flex h-screen justify-center w-screen">
        <div className="flex flex-row w-full max-w-6xl">
        {/* <p style={{ fontFamily: '"Inria Serif", serif' }}>Test Inria</p> */}
          <div className="flex flex-col max-w-xs w-full border-r-1 border-amber-800 p-2">
            <IngredientConstraintButton strictIdx={strictIdx} setStrictIdx={setStrictIdx}></IngredientConstraintButton>
            <IngredientList ingredients={ingredients} setIngredients={setIngredients}></IngredientList>
            <CuisineList cuisine={cuisine} setCuisine={setCuisine}></CuisineList>
            <DietaryRestrictionList restrictions={restrictions} setRestrictions={setRestrictions}></DietaryRestrictionList>
            <button className='text-amber-700 my-2 hover:text-amber-400 border-1 border-amber-700 rounded-md' onClick={callAPI}>Generate</button>
          </div>
          <ChatbotList messages={messages} setMessages={setMessages}></ChatbotList>
        </div>
      </div>
    </>
  );
}

export default App;
