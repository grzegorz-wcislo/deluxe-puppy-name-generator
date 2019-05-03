import React from "react";
import Header from "./Header";
import Names from "./Names";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Names />
      </main>
      <Footer />
    </div>
  );
};

export default App;
