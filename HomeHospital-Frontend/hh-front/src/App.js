import Login from "./components/Login";
import Forgot from "./components/ForgotPass"
import { useState } from "react";
function App(props) {
  const [formState, setForms] = useState([]);
  const addForms = (log) => {
    let logs = [...formState, log];
    setForms(logs);
  };

  return (
   <Forgot/>
  );
  // <Login addForms={addForms} />
}

export default App;
