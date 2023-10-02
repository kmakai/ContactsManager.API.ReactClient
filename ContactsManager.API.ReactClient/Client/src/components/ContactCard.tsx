import { ContactType } from "../types";
import { Link } from "react-router-dom";

type contactProps = {
  contact: ContactType;
};

const ContactCard: React.FC<contactProps> = ({ contact }) => {
  return (
    <>
      <Link to={`/contacts/${contact.id}`}>
        <div className="border p-2 flex justify-between rounded">
          <span>{contact.name}</span>
          <span>{contact.category.name}</span>
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
        </div>
      </Link>
    </>
  );
};

export default ContactCard;
