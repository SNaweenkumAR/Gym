import axios from 'axios';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners'; // Ensure correct import
import { toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMsg] = useState('');
  const [load, setLoad] = useState(false);

  const sendMail = async(e) => {
    e.preventDefault();
    setLoad(true);

    try {

      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/send/mail`, 
        {
          name,
          email,
          message
        },
        {
          withCredentials:true,
          headers:{"Content-Type":"application/json"},
        }
      );
      setName("");
      setEmail("");
      setMsg("");
      toast.success(data.message);
      setLoad(false)
      
    } catch (error) {
       if(error.response){
           toast.error(error.response.data.message);
       }else{
        toast.error('An error occured while sending msg');
       }
       setLoad(false);

    }
  }

  return (
    <section className="contact">
      <form onSubmit={sendMail}>
        <h1>Contact Us</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={load}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {load && <ClipLoader size={20} color="white" />}
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
