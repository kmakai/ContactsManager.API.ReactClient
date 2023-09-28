function Contact(props: any) {
  const { contact } = props;
  return (
    <div className="contact-card border my-2 bg-slate-100 text-slate-900 flex flex-col">
      <div className="">{contact.name}</div>
      <div className="">{contact.email}</div>
      <div className="">{contact.phone}</div>
    </div>
  );
}

export default Contact;
