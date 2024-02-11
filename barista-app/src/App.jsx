import { useState } from 'react'; // If you're not using useState, you can remove this import
import BaristaForm from './Components/BaristaForm';
import './App.css';

function App() {
  // const [count, setCount] = useState(0); // Remove or comment this out if 'count' is not used

  return (
    <div>
      <div className="title-container">
        <h1 className="title">On My Grind</h1>
        <p>So you think you can barista? Let's put that to the test...</p>
      </div>
      <BaristaForm />
    </div>
  );
}

export default App;

