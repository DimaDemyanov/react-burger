import './App.css';
import AppHeader from './components/header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import React, { useEffect } from 'react';
import { fetchIngredients } from './utils/api';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    fetchIngredients(API_URL, setIngredients);
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className='menu-container'>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(key => ingredients[key]).filter(it => it !== undefined)} />
      </div>
    </div>
  );
}

export default App;
