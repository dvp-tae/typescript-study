import React from "react";

type HelloType = {
  nick: string;
  onClick(name: string): void;
};

const Hello = ({ nick, onClick }: HelloType) => {
  const handleClick = () => {
    onClick(nick);
  };
  return (
    <>
      <h1>Hello {nick}</h1>
      <div>
        <button
          style={{ width: "100px", height: "30px" }}
          onClick={handleClick}
        >
          Click Me!
        </button>
      </div>
    </>
  );
};

export default Hello;
