import './App.css';
import AppHeader from './components/header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import INGREDIENTS from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className='menu-container'>
        <BurgerIngredients ingredients={INGREDIENTS} />
        <BurgerConstructor ingredients={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(key => INGREDIENTS[key])} />
      </div>
    </div>
  );
}

export default App;
