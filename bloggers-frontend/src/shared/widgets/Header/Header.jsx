import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const [click,setClick] = useState(false);

  const [shadow,setShadow] = useState(false);
    const changeShadow = () => {
      if(window.scrollY >= 100){
        setShadow(true)
      }else{
        setShadow(false)
      }
      setClick(click);
    }

    window.addEventListener('scroll', changeShadow);

  return (
    <div className={shadow ? "header_header header_shadow_header" : "header_header"}>
      <div className="left_section_header">
          <Link to="/">
            Bloggers
          </Link>
      </div>

      <div className={click ? "right_section_header active_header" : "right_section_header"}>
        <div className="button_container_header">
          <button onClick={() => navigate("/login")} className="btn_light_header">Log in</button>
          <button onClick={() => navigate("/signup")} className="btn_primary_header">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
