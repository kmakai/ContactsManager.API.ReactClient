import { ContactType } from "../types";

type contactProps = {
  contact: ContactType;
};

const ContactCard: React.FC<contactProps> = ({ contact }) => {
  return (
    // <div className="contact-card border my-2 bg-slate-100 text-slate-900 flex flex-col">
    //   <div className="">{contact.name}</div>
    //   <div className="">{contact.email}</div>
    //   <div className="">{contact.phone}</div>
    // </div>
    <>
      <tr className="border p-2 flex justify-between">
        <td>{contact.name}</td>
        <td>{contact.category.name}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
      </tr>
    </>
  );
};

export default ContactCard;
