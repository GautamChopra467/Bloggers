import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import Header from "../../shared/widgets/Header/Header";


const Login = () => {

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  }

  useEffect(() => {
  
    if( Object.keys(formErrors).length === 0 && isSubmit ){
      axios.post("http://localhost:8000/login",
      { 
        ...user
      },{
        withCredentials:true
      })
      .then( ({data}) => {
        console.log(data)
        if(data.errors){
          setFormErrors(data.errors);
        }
        else  if(data.message === "true"){
          navigate(`/user/${data.id}`);
        }
        else if(data.message === false)
        {
            navigate(`/*`) ; 
        }
        else {
          setFormErrors({final: data.message})
        }
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.email){
      errors.email = "Email required";
    }else if(!regex.test(values.email)){
      errors.email = "Incorrect Email Format";
    }

    if(!values.password){
      errors.password = "Password required";
    }else if(values.password.length < 6){
      errors.password = "Min 6 characters required";
    }else if(values.password.length > 12){
      errors.password = "Max 12 characters allowed";
    }

    return errors;
  }


  return (
    <div>    
      <Header />
      <div className="main_login">
        <div className="main-part_login">
          <div className="form-container_login">
            <div className="top_login">
              <h2>Sign in</h2>
              <Link to="/signup">Create an account</Link>
            </div>

            <div className="line_login"></div>

            <div className="main-error-msg_login">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_login">
              <form>
                <div className="form-full_login">
                <div className="form-container-box_login">
                  <label>Email Address</label>
                  <input type="text" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_login">{formErrors.email}</p>
                </div>

                <div className="form-container-box_login">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleForm} />
                  <p className="errors-msg_login">{formErrors.password}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_login">
                  Login now
                  <BsArrowRightShort size={27} className="create-btn-logo_login" />
                </button> 
              </form>

              <div className="line_login"></div>

              <div className="bottom-part_login">
                <p>New to Bloggers ?&nbsp;</p>
                <Link to="/signup">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
