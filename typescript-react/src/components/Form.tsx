import React, { useState } from "react";
import { FormInput, OnSubmit } from "../type";

const Form = ({ onSubmit }: OnSubmit) => {
  const [form, setForm] = useState<FormInput>({
    id: "",
    password: "",
  });

  const { id, password } = form;
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm({
      id: "",
      password: "",
    });
    onSubmit(form);
  };
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" value={id} onChange={handleChangeInput} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChangeInput}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
