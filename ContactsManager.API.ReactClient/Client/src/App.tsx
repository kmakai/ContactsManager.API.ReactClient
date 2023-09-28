import { useEffect, useState } from "react";
import "./App.css";

function App() {
  async function getContacts() {
    const response = await fetch("https://localhost:7139/api/Contact");
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getContacts();
  });

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
