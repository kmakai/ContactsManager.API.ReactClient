import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { ContactType } from "../types";
import { useAppSelector, useAppDispatch } from "../features/hooks";
import { getContact, deleteContact } from "../features/contactsSlice";

const Contact: React.FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const contact = useAppSelector((state) => state.contacts.contact);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function OnDelete() {
    if (confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(+contactId!));
    } else {
      return;
    }

    setTimeout(() => {
      navigate(`/`);
    }, 1000);
  }

  useEffect(() => {
    dispatch(getContact(+contactId!));
  }, [dispatch, contactId]);
  return (
    <div>
      <h1>contact info</h1>
      <hr />
      <p>{contact?.name}</p>
      <p>{contact?.email}</p>
      <p>{contact?.phone}</p>
      <p>{contact?.category.name}</p>
      <button>
        <Link to={`/contacts/${contact?.id}/edit`}>edit</Link>
      </button>
      <button className="ms-4 bg-red-800 text-white" onClick={() => OnDelete()}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
