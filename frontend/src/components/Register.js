import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../register.css";

export default class Register extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    userType: "",
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType
    };

    axios({
      url: "/authentication/signup",
      method: "POST",
      data: payload,
    })
      .then((res) => {
        console.log("Success");
        console.log(res);

        if (res.data.status === "success") {
          alert("Success");
          this.props.history.push("/success");
        } else {
          if (res.data.errors.userName.length > 0) {
            alert("UserName or Email not found. Please consider Signup.");
          } else if (res.data.errors.email.length) {
            alert("UserName or Email not found. Please consider Signup.");
          } else if (res.data.errors.password.length) {
            alert("Password is incorrect. Please try again.");
          }
        }
      })
      .catch((err) => {
        console.log("Internal server error");
        alert("Internal Server Error. Please try again.");
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <header className="header">
          <div className="form_box">
            <div className="button_box">
              <a href="#" id="register" class="btn btn-warning">
                Register
              </a>
              <Link to="/login" class="btn" id="login" role="button">
                Login
              </Link>
            </div>

            <div className="icon_img">
              <img src="towsonu-logo.png" alt="" />
            </div>

            <form onSubmit={this.submit}>
              <div className="form-group">
                <input
                  type="text"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  className="form-control form-warning"
                  id="exampleInputEmail1"
                  placeholder="Username"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <a href="#">Forgot Password?</a>

              <div class="form-group">
                <div class="btn-group">
                  <select
                    className="form-control btn-shadow"
                    name="userType"
                    onChange={this.handleChange}
                    value={this.state.value}
                  >
                    <option>Signup as</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>
              </div>

              <button class="btn btn-warning btn-block">Submit</button>
            </form>
            <br />
            <span>
              You are agreed with our <a href="#">Terms & Conditions </a>and
              <a href="#"> Privacy Policies</a>
            </span>
          </div>
        </header>
      </div>
    );
  }
}
