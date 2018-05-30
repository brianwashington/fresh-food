import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("checks user input to see if email entered is valid or not", () => {
  it("should validate e-mail address as a valid e-mail address", () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();

    wrapper.setState({ email: "abcd1234@gmail.com", password: "password" });
    expect(instance.validateLogin()).toBe(true);
  });

  it("should validate e-mail address as an invalid e-mail address", () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();

    wrapper.setState({ email: "@gmail.com", password: "password" });
    expect(instance.validateLogin()).toBe(false);
  });

  it("should not be a valid login", () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();

    wrapper.setState({ email: "abcd1234@gmail.com", password: "" });
    expect(instance.validateLogin()).toBe(false);
  });
});
