import React, { useEffect, useState } from "react";
import "./login.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FacebookFilled, GooglePlusCircleFilled, LinkedinFilled } from "@ant-design/icons";


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [department, setDepartment] = useState('')
  const [type, setType] = useState('EMP')



  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  })


  function setEmailHandler(e) {
    setEmail(e.target.value)
  }

  function setPasswordHandler(e) {
    setPassword(e.target.value)
  }

  function setConfirmPasswordHandler(e) {
    setConfirmPassword(e.target.value)
  }
  function setLastnameHandler(e) {
    setlastname(e.target.value)
  }
  function setFirstnameHandler(e) {
    setfirstname(e.target.value)
  }
  function setDepartmentHandler(e) {
    setDepartment(e.target.value)
  }


  async function postLogindata(e) {
    const data = {
      "email": email,
      "password": password
    }
    console.log(data)

    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login', data);
      localStorage.setItem("user_details", JSON.stringify(response.data));
      setLoggedIn(true);
      navigate('/page/dashboard')
    } catch (error) {
      console.error('Failed to log in:', error);
    }

  }

  async function signupHandler(e) {
    e.preventDefault()
    const data = {
      "email": email,
      "password": password,
      "password2": confirmpassword,
      "department": department,
      "first_name": firstname,
      "last_name": lastname,
      "type": type
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/register', data);
      setLoggedIn(true);
      navigate('/#')
    } catch (error) {
      console.error('Failed to log in:', error);
    }

  }

  return (
    <div>

      <div className="block">
        <div className="container2" id="container">
          <div className="form-container sign-up-container">
            <form className="form-style" action="">
              <h1 className="heading">Create Account</h1>
              <div className="social-container2">
                <a href="#" className="social anchor2"><FacebookFilled /></a>
                <a href="#" className="social anchor2"><GooglePlusCircleFilled /></a>
                <a href="#" className="social anchor2"><LinkedinFilled /></a>
              </div>
              <span className="this-span">or use your email for registration</span>
              <input className="signup-input" type="text" placeholder="First Name" onChange={setFirstnameHandler} />
              <input className="signup-input" type="text" placeholder="Last Name" onChange={setLastnameHandler} />
              <input className="signup-input" type="text" placeholder="Department" onChange={setDepartmentHandler} />
              <input className="signup-input" type="email" placeholder="Email" onChange={setEmailHandler} />
              <input className="signup-input" type="password" placeholder="Password" onChange={setPasswordHandler} />
              <input className="signup-input" type="text" placeholder="Confirm Password" onChange={setConfirmPasswordHandler} />
              <button className="sign-up-button" onClick={signupHandler}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="form-style">
              <h1 className="h11">Sign in</h1>
              <div className="social-container">
                <a href="#" className="social anchor2"><FacebookFilled /></a>
                <a href="#" className="social anchor2"><GooglePlusCircleFilled /></a>
                <a href="#" className="social anchor2"><LinkedinFilled /></a>
              </div>
              <span className="this-span">or use your account</span>
              <input className="form-input" type="email" placeholder="Email" onChange={setEmailHandler} />
              <input className="form-input" type="password" placeholder="Password" onChange={setPasswordHandler} />
              <a href="#" className="anchor2">Forgot your password?</a>
              <button className="sign-in-button" type="button" onClick={postLogindata}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h11">Welcome Back!</h1>
                <p className="text-style">To keep connected with us please login with your personal info</p>
                <button className="sign-in-button ghost" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h11">Hello!!!</h1>
                <p className="text-style">Enter your personal details and start journey with us</p>
                <button className="sign-in-button ghost" id="signUp" >Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
export default Login;






