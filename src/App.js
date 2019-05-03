import React, {useState} from 'react';
import {getWords, getNouns, getAdjectives} from './WordsAPI';
import {generate} from './NameGenerator';

const Puppy = ({name, age}) => {
  return (
    <li className="puppy">
      <h2>{name}</h2>
    </li>
  );
};

const Puppies = ({names}) => {
  return names ? (
    <ul className="puppies">
      {names.map(name => <Puppy {...{name}} />)}
    </ul>
  ) : null;
};

const Form = () => {
  const letters = "abcdefghijklmnoprstuwxyz".split('');
  const [letter, setLetter] = useState("a");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Wybraliśmy literkę ${letter}`);

    generate({letter}, console.table, console.log);
  };

  return (
    <form onSubmit={onSubmit}>
      <select name="letters" onChange={e => setLetter(e.target.value)}>
        {letters.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
	  <input type="submit"/>
    </form>
  );
};

const App = () => {
  const names = ["Misia", "Lula"];

  return (
    <div className="App">
      <h1>Deluxe Puppy Name Generator</h1>
      <Form />
      <Puppies names={names}/>
      <Puppies />
    </div>
  );
};

export default App;
