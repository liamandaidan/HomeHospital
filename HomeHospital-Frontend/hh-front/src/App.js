import Login from "./components/Login";
import { useState } from "react";
function App(props) {
  const [formState, setForms] = useState([]);
  const addForms = (log) => {
    let logs = [...formState, log];
    setForms(logs);
  };

  return <Login addForms={addForms} />;
}

export default App;
