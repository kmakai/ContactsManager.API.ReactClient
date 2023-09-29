import { useEffect, useState } from "react";

enum LastContactType {
  Email,
  Phone,
  TextMessage,
  VideoCall,
  FaceToFace,
}

enum ContactFrequency {
  Daily,
  Weekly,
  Monthly,
  Quarterly,
  Yearly,
}

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  lastContact: number;
  lastContactDate: Date;
  desiredContactFrequency: number;
  categoryId: number;
};

const ContactEditForm: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [contact, setContact] = useState<Contact>()!;

  async function saveContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(
      `https://localhost:7139/api/Contact/${contact?.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }
    );

    const data = await response.json();

    console.log(data);
  }

  async function getCategories() {
    const response = await fetch(
      "https://localhost:7139/api/Contact/Categories"
    );
    const data = await response.json();
    console.log(data);
    setCategories(data);
  }

  async function getContact() {
    const response = await fetch("https://localhost:7139/api/Contact/8");
    const data = await response.json();
    console.log(data);
    setContact(data);
  }

  useEffect(() => {
    getContact();
    getCategories();
  }, []);

  return (
    <form className="flex flex-col gap-2" onSubmit={saveContact}>
      <h1>edit contact</h1>
      <hr />
      <input
        type="text"
        placeholder="name"
        name="name"
        id="name"
        value={contact ? contact.name : ""}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, name: e.target.value } : prev
          );
        }}
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        id="email"
        value={contact ? contact.email : ""}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, email: e.target.value } : prev
          );
        }}
      />
      <input
        type="text"
        placeholder="phone"
        name="phone"
        id="phone"
        value={contact ? contact.phone : ""}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, phone: e.target.value } : prev
          );
        }}
      />
      <input
        type="date"
        name="LastContactDate"
        id="LastContactDate"
        value={
          contact
            ? new Date(contact.lastContactDate).toISOString().split("T")[0]
            : ""
        }
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, lastContactDate: new Date(e.target.value) } : prev
          );
        }}
      />
      <select
        name="LastContact"
        id="LastContact"
        value={contact ? contact.lastContact : 0}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, lastContact: +e.target.value } : prev
          );
        }}
      >
        <option value={LastContactType.Email}>Email</option>
        <option value={LastContactType.Phone}>Phone</option>
        <option value={LastContactType.TextMessage}>Text Message</option>
        <option value={LastContactType.VideoCall}>Video Call</option>
        <option value={LastContactType.FaceToFace}>In Person</option>
      </select>
      <select
        name="CategoryId"
        id="CategoryId"
        value={contact ? contact.categoryId : 0}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, categoryId: +e.target.value } : prev
          );
        }}
      >
        {categories.map((category: { id: number; name: string }) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        name="DesiredContactFrequency"
        id="DesiredContactFrequency"
        value={contact ? contact.desiredContactFrequency : ""}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, desiredContactFrequency: +e.target.value } : prev
          );
        }}
      >
        <option value={ContactFrequency.Daily}>Daily</option>
        <option value={ContactFrequency.Weekly}>Weekly</option>
        <option value={ContactFrequency.Monthly}>Monthly</option>
        <option value={ContactFrequency.Quarterly}>Quarterly</option>
        <option value={ContactFrequency.Yearly}>Yearly</option>
      </select>

      <textarea
        name="Notes"
        id="Notes"
        cols={30}
        rows={5}
        value={contact ? contact.notes : ""}
        onChange={(e) => {
          console.log(e.target.value);
          setContact((prev) =>
            prev ? { ...prev, notes: e.target.value } : prev
          );
        }}
      ></textarea>

      <button className="bg-slate-600 text-white rounded px-3 py-2">
        save contact
      </button>
    </form>
  );
};

export default ContactEditForm;
