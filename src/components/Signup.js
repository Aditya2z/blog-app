/* eslint-disable react/destructuring-assignment */
import React from "react";
import "../styles/style.css";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      emailError: "",
      passwordError: "",
      usernameError: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    let emailError = "";
    let passwordError = "";
    let usernameError = "";

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
      !/[A-Za-z]/.test(this.state.password) || !/\d/.test(this.state.password)
    ) {
      passwordError = "Password must contain at least one letter and one number";
    }

    if (!this.state.username) {
      usernameError = "Username field cannot be empty";
    } else if (this.state.username.length < 6) {
      usernameError = "Username must be at least 6 characters long";
    }

    if (emailError || passwordError || usernameError) {
      this.setState({ emailError, passwordError, usernameError });
      return false;
    }

    this.setState({ emailError: "", passwordError: "", usernameError: "" });
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validateForm();

    if (isValid) {
      // Perform signup logic here
      console.log("Signup successful");
    }
  };

  render() {
    return (
      <div className="signup-container">
        <h1 className="signup-heading">Signup Page</h1>
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
              placeholder="Create Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className="input-field"
            />
            <span className="error">{this.state.passwordError}</span>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Create Username"
              value={this.state.username}
              onChange={this.handleInputChange}
              className="input-field"
            />
            <span className="error">{this.state.usernameError}</span>
          </div>

          <button type="submit" className="btn-2">
            Signup
          </button>
        </form>

        <p>
          Already have an account?
          <a href="/login">Login</a>
        </p>
      </div>
    );
  }
}

export default SignupPage;
