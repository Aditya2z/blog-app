/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = "Email field cannot be empty";
    } else if (!this.state.email.includes("@")) {
      emailError = "Invalid email address";
    }

    if (!this.state.password) {
      passwordError = "Password field cannot be empty";
    } else if (this.state.password.length < 6) {
      passwordError = "Password must be at least 6 characters long";
    } else if (
      !/[A-Za-z]/.test(this.state.password)
      || !/\d/.test(this.state.password)
    ) {
      passwordError = "Password must contain at least one letter and one number";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    this.setState({ emailError: "", passwordError: "" });
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validateForm();

    if (isValid) {
      // Perform login logic here
      console.log("Login successful");
    }
  };

  render() {
    return (
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputChange}
              className="input-field"
            />
            <span className="error">{this.state.emailError}</span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className="input-field"
            />
            <span className="error">{this.state.passwordError}</span>
          </div>

          <button type="submit" className="btn-2">
            Login
          </button>
        </form>

        <p>
          Don't have an account?
          <Link to="/signup" className="accent"> Sign up</Link>
        </p>
      </div>
    );
  }
}

export default LoginPage;
