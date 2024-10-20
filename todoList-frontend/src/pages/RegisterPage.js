import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다.");
      }
      const response = await api.post("/user", { name, email, password });
      if (response.status == 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-enter the password"
            onChange={(event) => setSecPassword(event.target.value)}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
