import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { ContactType } from "../types";
import { useAppSelector, useAppDispatch } from "../features/hooks";
import { getContact, deleteContact } from "../features/contactsSlice";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { LastContactType } from "../types";

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
    <div className="flex gap-4">
      <div className="left">
        <div className="flex gap-2">Info</div>
        <hr />
        <div className="flex gap-2">
          <span>Name:</span>
          <p>{contact?.name}</p>
        </div>

        <div className="flex gap-2">
          <span>Email:</span>
          <p>{contact?.email}</p>
        </div>

        <div className="flex gap-2">
          <span>Phone:</span>
          <p>{contact?.phone}</p>
        </div>

        <div className="flex gap-2">
          <span>Relation:</span>
          <p>{contact?.category.name}</p>
        </div>
      </div>
      <div className="right">
        <h1>Notes</h1>
        <hr />
        <p>{contact?.notes}</p>

        <div className="flex gap-2">
          <span>Last Contacted:</span>
          <span>{new Date(contact?.lastContactDate).toLocaleDateString()}</span>
          by
          <p>{Object.values(LastContactType)[contact?.lastContact]}</p>
        </div>
        <button className="ms-auto">
          <Link
            to={`/contacts/${contact?.id}/edit`}
            className="flex items-center gap-2"
          >
            <FaUserEdit /> edit
          </Link>
        </button>
        <button
          className=" text-red-300 flex items-center gap-2"
          onClick={() => OnDelete()}
        >
          <TiUserDeleteOutline /> delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
