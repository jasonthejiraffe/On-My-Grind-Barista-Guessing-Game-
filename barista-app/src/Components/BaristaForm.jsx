import React, { useState, useEffect } from 'react';
import RecipeChoices from './RecipeChoices';
import drinksJson from './drinks.json'; // Ensure the path is correctly set based on your project structure

const BaristaForm = () => {
  // State for handling user inputs for each ingredient category
  const [inputs, setInputs] = useState({
    temperature: '',
    milk: '',
    syrup: '',
    blended: ''
  });

  // State for the current drink and its true recipe
  const [currentDrink, setCurrentDrink] = useState('');
  const [trueRecipe, setTrueRecipe] = useState({});

  // State variables for tracking the correctness of each ingredient
  const [correctTemperature, setCorrectTemperature] = useState('');
  const [correctSyrup, setCorrectSyrup] = useState('');
  const [correctMilk, setCorrectMilk] = useState('');
  const [correctBlended, setCorrectBlended] = useState('');

  // Effect hook to select an initial drink when the component mounts
  useEffect(() => {
    getNextDrink();
  }, []);

  // Function to select a random drink from the JSON data
  const getNextDrink = () => {
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  
    // Reset the color styling for the answer spaces
    setCorrectTemperature(''); // Assuming an empty string signifies the default state
    setCorrectSyrup('');
    setCorrectMilk('');
    setCorrectBlended('');
  };  

  // Function to handle user input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to reset inputs and correctness indicators, and select a new drink
  const onNewDrink = () => {
    setInputs({
      temperature: '',
      milk: '',
      syrup: '',
      blended: ''
    });
    getNextDrink(); // Also resets correctness states internally
  };

  // Function to check user answers against the true recipe
  const onCheckAnswer = () => {
    setCorrectTemperature(inputs['temperature'] === trueRecipe['temperature'] ? 'correct' : 'wrong');
    setCorrectSyrup(inputs['syrup'] === trueRecipe['syrup'] ? 'correct' : 'wrong');
    setCorrectMilk(inputs['milk'] === trueRecipe['milk'] ? 'correct' : 'wrong');
    setCorrectBlended(inputs['blended'] === trueRecipe['blended'] ? 'correct' : 'wrong');
  };

  // Ingredient options
  const ingredients = {
    temperature: ['hot', 'lukewarm', 'cold'],
    syrup: ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
    milk: ['cow', 'oat', 'goat', 'almond', 'none'],
    blended: ['yes', 'turbo', 'no']
  };

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button type="button" className="button newdrink" onClick={onNewDrink}>🔄 New Drink</button>
      </div>
      <form className="container" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(ingredients).map((ingredient) => (
          // Wrap each set of ingredient choices in a mini-container for Flexbox layout
          <div className="mini-container" key={ingredient}>
            <h3>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</h3>
            <div className="answer-space" id={eval(`correct${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}`)}>
              {inputs[ingredient]}
            </div>
            <RecipeChoices
              handleChange={handleChange}
              label={ingredient}
              choices={ingredients[ingredient]}
              currentVal={inputs[ingredient]}
            />
          </div>
        ))}
        <button type="button" className="button check-answer" onClick={onCheckAnswer}>
          Check Answer
        </button>
      </form>
    </div>
  );
};

export default BaristaForm;