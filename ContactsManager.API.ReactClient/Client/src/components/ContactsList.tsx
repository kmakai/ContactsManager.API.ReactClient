import React from "react";
import { ContactType } from "../types";
import Contact from "./Contact";

type listProps = {
  contacts: ContactType[];
};

const ContactsList: React.FC<listProps> = ({ contacts }) => {
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
