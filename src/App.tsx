
import IngredientConstraintButton from './components/IngredientConstraintButton';
import IngredientList from './components/IngredientList';

function App() {
  return (
    <>
      <div className="flex justify-center h-screen w-scree">
        <div className="flex flex-row w-full max-w-6x">
          <div className="flex flex-col max-w-xs w-full rounded-md p-2 border-2 border-amber-400">
            <p>Navbar</p>
            <IngredientConstraintButton></IngredientConstraintButton>
            <IngredientList></IngredientList>
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
