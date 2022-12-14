import React from "react";
// import NavLink from "react-router-dom"

const Button = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    {/* <NavLink to="/editor" >Get Started </NavLink> */} Get Started
  </button>
);

export default Button;