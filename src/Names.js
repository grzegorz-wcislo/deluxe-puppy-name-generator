import React, { useState } from "react";
import { generate } from "./NameGenerator";

export default () => {
  const [error, setError] = useState(null);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateNames = filters => {
    setLoading(true);
    generate(
      filters,
      names => {
        setNames(names);
        setError(null);
        setLoading(false);
      },
      msg => {
        setError(msg);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <Form submit={generateNames} disabled={loading} />
      <Error {...{ error }} />
      <Puppies {...{ names }} />
    </>
  );
};

const Error = ({ error }) => {
  if (error) {
    return (
      <div className="error">
        <p>{error.message}, please try again</p>
      </div>
    );
  } else return null;
};

const Puppy = ({ name, age }) => {
  return (
    <li className="puppy">
      <h2>{name}</h2>
    </li>
  );
};

const Puppies = ({ names }) => {
  if (names) {
    return (
      <ul className="puppies">
        {names.map(name => (
          <Puppy {...{ name }} />
        ))}
      </ul>
    );
  } else return null;
};

const Form = ({ submit, disabled }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const [letter, setLetter] = useState("a");

  const onSubmit = e => {
    e.preventDefault();
    submit({ letter });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="letters">Name's first letter:</label>
      <select name="letters" onChange={e => setLetter(e.target.value)}>
        {letters.map(l => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <button type="submit" {...{ disabled }}>
        Generate
      </button>
    </form>
  );
};
