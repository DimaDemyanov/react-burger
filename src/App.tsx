import './App.css';
import AppHeader from './components/header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import React, { useEffect } from 'react';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(response => response.json())
      .then(json => {
        let ingredients = json.data;
        ingredients[0].count = 1;
        setIngredients(ingredients);
      })
      .catch(er => console.log(er))
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
