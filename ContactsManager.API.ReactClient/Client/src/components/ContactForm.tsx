import { ReactEventHandler, useEffect, useState } from "react";

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

const ContactForm: React.FC = () => {
  const [categories, setCategories] = useState([]);

  async function saveContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    console.log(form);
    const formData = new FormData(form);
    const contact = Object.fromEntries(formData.entries());
    console.log(contact);

    const response = await fetch("https://localhost:7139/api/Contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form className="flex flex-col gap-2" onSubmit={saveContact}>
      <h1>new contact</h1>
      <hr />
      <input type="text" placeholder="name" name="name" id="name" />
      <input type="text" placeholder="email" name="email" id="email" />
      <input type="text" placeholder="phone" name="phone" id="phone" />
      <input type="date" name="LastContactDate" id="LastContactDate" />
      <select name="LastContactType" id="LastContactType">
        <option value={LastContactType.Email}>Email</option>
        <option value={LastContactType.Phone}>Phone</option>
        <option value={LastContactType.TextMessage}>Text Message</option>
        <option value={LastContactType.VideoCall}>Video Call</option>
        <option value={LastContactType.FaceToFace}>In Person</option>
      </select>
      <select name="CategoryId" id="CategoryId">
        {categories.map((category: any) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select name="ContactFrequency" id="ContactFrequency">
        <option value={ContactFrequency.Daily}>Daily</option>
        <option value={ContactFrequency.Weekly}>Weekly</option>
        <option value={ContactFrequency.Monthly}>Monthly</option>
        <option value={ContactFrequency.Quarterly}>Quarterly</option>
        <option value={ContactFrequency.Yearly}>Yearly</option>
      </select>

      <textarea name="Notes" id="Notes" cols={30} rows={5}></textarea>

      <button className="bg-slate-600 text-white rounded px-3 py-2">
        save contact
      </button>
    </form>
  );
};

export default ContactForm;
