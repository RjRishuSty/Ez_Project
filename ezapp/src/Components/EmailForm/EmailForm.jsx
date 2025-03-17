import React, { useEffect, useRef, useState } from "react";
import Styles from "./EmailForm.module.css";

const EmailForm = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errorMsg, setErrorMsg] = useState({ error: "", color: "" });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (errorMsg.error) {
      const timer = setTimeout(() => {
        setErrorMsg({ error: "", color: "" });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrorMsg({ error: "", color: "" });
  };
  const validation = () => {
    if (formData.email === "") {
      setErrorMsg({ error: "Email field is required.", color: "red" });
      return false;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(formData.email)) {
      setErrorMsg({ error: "Invalid email!", color: "red" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return;
    try {
      const response = await fetch(`https://test.ezworks.ai/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setErrorMsg({ error: "Form submitted.", color: "green" });
        setFormData({ email: "" });
      } else if (response.status === 422) {
        setErrorMsg({ error: data.message, color: "red" });
      } else {
        setErrorMsg({ error: "Something went wrong.", color: "red" });
      }
    } catch (error) {
      setErrorMsg({ error: "Network error. Please try again.", color: "red" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.form}>
      <div className={Styles.inputGroup}>
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
        {(errorMsg.error || formData.email) && (
          <p className={Styles.errorMsg} style={{ color: errorMsg.color }}>
            {errorMsg.error}
          </p>
        )}
      </div>
      <button type="submit" className={Styles.btn}>
        Contact Me
      </button>
    </form>
  );
};

export default EmailForm;
