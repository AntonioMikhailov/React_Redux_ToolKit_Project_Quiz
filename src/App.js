import React from "react";
import { Provider } from "react-redux";
 import { store } from "./store";
import Quiz from './Quiz'
 
function App() {
  return (
    <>
      <div className="container">
      <Provider store={store}>
         <Quiz/>
      </Provider>
      </div>
    </>
  );
}
export default App;
