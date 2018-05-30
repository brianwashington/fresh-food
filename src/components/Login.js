import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  state = {
    email: "",
    password: "",
    emailErrorMsg: "",
    passwordErrorMsg: ""
  };

  validateLogin() {
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    let isValid = true;
    let emailErrorMsg = "";
    let passwordErrorMsg = "";

    const emailRegExp = new RegExp(/^[a-z]\w*@\w+\.[a-z]{2,}$/, "gi");

    if (!email) {
      emailErrorMsg = "Email cannot be blank";
      isValid = false;
    } else if (!email.match(emailRegExp)) {
      emailErrorMsg = "Email address is not valid";
      isValid = false;
    }
    this.setState({ emailErrorMsg });

    if (!password) {
      passwordErrorMsg = "Password cannot be blank";
      isValid = false;
    }
    this.setState({ passwordErrorMsg });

    return isValid;
  }

  updateEmail(event) {
    this.setState({ email: event.target.value.trim() });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value.trim() });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.validateLogin()) return;
    this.props.history.push(`/recipes`);
  }

  render() {
    const { emailErrorMsg, passwordErrorMsg } = this.state;

    return (
      <form className="login-container" onSubmit={this.handleSubmit}>
        <h1>
          Welcome to{" "}
          <div style={{ color: "#91c11e" }}>
            <span style={{ fontFamily: "Dancing Script" }}>Fresh&nbsp;</span>FOOD
          </div>
        </h1>
        <h3>Login</h3>

        <input
          type="text"
          name="email"
          className="email"
          placeholder="Email"
          onChange={this.updateEmail}
        />

        <div className={emailErrorMsg ? "error show" : "error"}>
          {emailErrorMsg}
        </div>

        <input
          type="password"
          name="password"
          className="password"
          placeholder="Password"
          onChange={this.updatePassword}
        />

        <div className={passwordErrorMsg ? "error show" : "error"}>
          {passwordErrorMsg}
        </div>

        <button type="submit" className="submit">
          Log In
        </button>
      </form>
    );
  }
}

export default Login;
