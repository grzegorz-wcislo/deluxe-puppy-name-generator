import React, {useState, createContext, useContext} from 'react';
import Header from './Header';
import Names from './Names';
import Footer from './Footer';


const App = () => {
  const names = ["Misia", "Lula"];

  return (
    <div className="App">
      <Header />
      <Names />
      {/* <NamesContext.Provider value={{}}> */}
      {/*   <Form /> */}
      {/*   <Puppies names={names}/> */}
      {/* </NamesContext.Provider> */}
      <Footer />
    </div>
  );
};

export default App;
