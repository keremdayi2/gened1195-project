import IngredientList from './components/IngredientList';

function App() {

  const callOpenAI = async () => {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello, world!' }],
        temperature: 0.7
      })
    });
  
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center h-screen w-scree">
        <div className="flex flex-row w-full max-w-6x">
          <div className="flex flex-col max-w-xs w-full border-r-2 border-gray-400 p-2">
            <IngredientList></IngredientList>
            <button className='text-amber-700 my-2 hover:text-amber-400 border-1 border-amber-700 rounded-md' onClick={callOpenAI}>Generate</button>
          </div>
          <div className="flex flex-col w-full items-center m-2 overflow-y-scroll">
            <p>Generated Recipe will go here</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
