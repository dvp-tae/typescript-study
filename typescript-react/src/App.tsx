import { useRef, useState } from "react";
import Hello from "./components/Hello";
import Form from "./components/Form";
import { FormInput } from "./type";

function App() {
  const [userName, setsUserName] = useState<string>();
  const input = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    setsUserName(input.current?.value);
  };

  const onClick = (name: string) => {
    console.log(`${name} says hello`);
  };

  const handleSubmit = (form: FormInput) => {
    console.log(form);
  };

  return (
    <>
      <div>
        <h1>Hello, {userName}!</h1>
        <input type="text" ref={input} />
        <button onClick={handleChange}>Change name!</button>
      </div>
      <hr />
      <div>
        <Hello nick="First" onClick={onClick} />
      </div>
      <hr />
      <div>
        <Form onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default App;
