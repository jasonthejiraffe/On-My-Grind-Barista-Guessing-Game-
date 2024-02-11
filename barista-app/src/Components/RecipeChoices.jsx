import React from "react";

const RecipeChoices = ({ handleChange, label, choices, checked }) => {
  return (
    <div className="radio-buttons">
      {choices.map((choice) => (
        <li key={choice}>
          <input
            id={`${label}-${choice}`}
            value={choice}
            name={label}
            type="radio"
            onChange={handleChange}
            checked={checked === choice}
          />
          <label htmlFor={`${label}-${choice}`}>{choice}</label>
        </li>
      ))}
    </div>
  );
};

export default RecipeChoices;
