import React, { useEffect, useRef, useState } from "react";
import Styles from "./EmailForm.module.css";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const EmailForm = () => {
  const [formData, setFormData] = useState({ email: "" });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const validation = () => {
    if (formData.email === "") {
      enqueueSnackbar("Email Field is required!", { variant: "error" });
      return false;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(formData.email)) {
      enqueueSnackbar("Invalid email!", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const response = await axios.post("http://3.228.97.110:9000/api", {
          email: formData.email,
        });
  
        if (response.status === 200) {
          enqueueSnackbar("Form Submitted!", { variant: "success" });
          setFormData({ email: "" });
        }
      } catch (error) {
        console.log(error)
          enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className={Styles.form}>
      <input
        type="email"
        id="email"
        placeholder="Email Address"
        required
        value={formData.email}
        className={Styles.input}
        ref={inputRef}
        onChange={handleChange}
      />
      <button type="submit" className={Styles.btn}>
        Contact Me
      </button>
    </form>
  );
};

export default EmailForm;
