import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import Header from "../../shared/widgets/Header/Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const type = "register";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post("http://localhost:8000/signup", user).then((res) => {
        if (res.data.errors) {
          setFormErrors(res.data.errors);
        } else if (res.data.message === "true") {
          navigate(`/login`);
        } else if (res.data.message === false) {
          navigate(`/*`);
        } else {
          setFormErrors({ final: res.data.message });
        }
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.name) {
      errors.name = "Name required";
    } else if (values.name.length < 2) {
      errors.name = "Minimum 2 characters required";
    } else if (values.name.length > 18) {
      errors.name = "Maximum 18 characters required";
    }

    if (!values.email) {
      errors.email = "Email required";
    } else if (!regex.test(values.email)) {
      errors.email = "Incorrect Email Format";
    }

    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 6) {
      errors.password = "Min 6 characters required";
    } else if (values.password.length > 12) {
      errors.password = "Max 12 characters allowed";
    }

    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm Password required";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Confirm password didn't match password";
    }

    if (!checkboxCheck) {
      errors.checkbox = "Accept Terms & Conditions to Continue";
    }

    return errors;
  };

  return (
    <div>
      <Header />

      <div className="main_signup">
        <div className="form-part_signup">
          <div className="form-container_signup">
            <div className="top_signup">
              <h2>Create Account</h2>
              <Link to="/login">Sign In</Link>
            </div>

            <div className="line_signup"></div>

            <div className="main-msg_signup">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_signup">
              <form onSubmit={submitForm}>
                <div className="form-main-box_signup">
                  <div className="form-box_signup box1_signup">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={user.name}
                      onChange={handleForm}
                    />
                    <p className="errors-msg_signup">{formErrors.name}</p>
                  </div>

                  <div className="form-box_signup box2_signup">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={user.email}
                      onChange={handleForm}
                    />
                    <p className="errors-msg_signup">{formErrors.email}</p>
                  </div>

                  <div className="form-box_signup box3_signup">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={user.password}
                      onChange={handleForm}
                    />
                    <p className="errors-msg_signup">{formErrors.password}</p>
                  </div>

                  <div className="form-box_signup box4_signup">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      value={user.confirmpassword}
                      onChange={handleForm}
                    />
                    <p className="errors-msg_signup">
                      {formErrors.confirmpassword}
                    </p>
                  </div>

                  <div className="box6_signup">
                    <div>
                      <input
                        type="checkbox"
                        id="cb1"
                        onClick={() => setCheckboxCheck(!checkboxCheck)}
                      />
                      <label for="cb1"></label>
                      <p>
                        <span>I agree to</span>{" "}
                        <a href="youtube.com">Terms and Conditions</a>
                      </p>
                    </div>
                    <p className="errors-msg_signup">{formErrors.checkbox}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={submitForm}
                  className="create-btn_signup"
                >
                  Create New Account
                  <BsArrowRightShort
                    size={27}
                    className="create-btn-logo_signup"
                  />
                </button>
              </form>

              <div className="line_signup"></div>

              <div className="bottom-part_signup">
                <p>Have an account ? </p>
                <Link to="/login">&nbsp;Login Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
