import { useEffect, useState } from "react";
import "./App.css";
import Contact from "./components/Contact";

function App() {
  const [contacts, setContacts] = useState([]);
  async function getContacts() {
    const response = await fetch("https://localhost:7139/api/Contact");
    const data = await response.json();
    console.log(data);
    setContacts(data);
  }

  useEffect(() => {
    getContacts();
  }, []);

  return <></>;
}

export default App;
