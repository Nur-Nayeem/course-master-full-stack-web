import React from "react";

const Button = ({ children, py = 2, px = 3 }) => {
  return (
    <button className={`btn-primary px-${px} py-${py} `}>{children}</button>
  );
};

export default Button;
