import { useEffect, useState } from "react";
import "./App.css";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";

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

  return (
    <>
      <div className="main-container flex m-5 border shadow-lg rounded p-2">
        <div className="side-panel space-y-2">
          <form action="">
            <input type="text" placeholder="Search" id="q" name="q" />
          </form>
          <hr />
          <button className="bg-slate-600 text-white rounded px-3 py-2">
            new contact
          </button>
          <div className="contacts-list">
            <ul className="flex flex-col gap-2">
              {contacts.map((contact: { name: string; id: number }) => (
                <li key={contact.id}>{contact.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="main-panel px-4">
          {/* <table className="contacts-cards">
            <tbody className="space-y-2">
              {contacts.map((contacts: any) => (
                <Contact key={contacts.id} contact={contacts} />
              ))}
            </tbody>
          </table> */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default App;
