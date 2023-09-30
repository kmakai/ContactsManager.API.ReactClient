import { useEffect } from "react";
import { ContactType } from "../types";
import Contact from "./ContactCard";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { getContacts } from "../features/contactsSlice";

// type listProps = {
//   contacts: ContactType[];
// };

const ContactsList: React.FC = () => {
  // const [contacts, setContacts] = useState([]);
  // async function getContacts() {
  //   const response = await fetch("https://localhost:7139/api/Contact");
  //   const data = await response.json();
  //   console.log(data);
  //   setContacts(data);
  // }

  // useEffect(() => {
  //   getContacts();
  // }, []);

  const contacts = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  return (
    <div>
      {" "}
      <table className="contacts-cards">
        <tbody className="space-y-2">
          {contacts.map((contact: ContactType) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default ContactsList;
