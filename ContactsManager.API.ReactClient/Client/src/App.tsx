import { useAppSelector, useAppDispatch } from "./features/hooks";
import { useEffect } from "react";
import "./App.css";
// import ContactForm from "./components/ContactForm";
// import ContactEditForm from "./components/ContactEditForm";
// import ContactsList from "./components/ContactsList";
import { Link, Outlet } from "react-router-dom";
import { getContacts } from "./features/contactsSlice";

function App() {
  const { contacts } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(getContacts());
    }
  });
  return (
    <>
      <div className="main-container flex m-5 border shadow-lg rounded p-2">
        <div className="side-panel space-y-2">
          <form action="">
            <input type="text" placeholder="Search" id="q" name="q" />
          </form>
          <hr />
          <button className="bg-slate-600 text-white rounded px-3 py-2">
            <Link to="/contacts/new">new contact</Link>
          </button>
          <div className="contacts-list">
            <ul className="flex flex-col gap-2">
              {contacts.map((contact: { name: string; id: number }) => (
                <li key={contact.id}>
                  <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="main-panel px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
