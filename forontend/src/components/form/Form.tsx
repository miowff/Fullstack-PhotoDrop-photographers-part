import React from "react"; // Import React
import { Container } from "@/globalStyle";
import { FromContainer, Input, LoginFrom, SubmitButton } from "./FormStyles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "@/api/login";
import { AUTH_TOKEN_KEY } from "@/enums/authTokenKey";
import Alert from "./Alert";
import { BaseError } from "@/models/error";
import {
  INCORRECT_PASSWORD,
  UNEXPECTED_ERROR,
  USER_NOT_FOUND,
} from "@/enums/errorMessages";

function Form() {
  const navigate = useNavigate();
  const [login, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await signIn(password, login);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      navigate("/");
    } catch (error) {
      const { response } = error as BaseError;
      const { status } = response;
      switch (status) {
        case 401: {
          setAlertMessage(INCORRECT_PASSWORD);
          break;
        }
        case 404: {
          setAlertMessage(USER_NOT_FOUND);
          break;
        }
        default: {
          setAlertMessage(UNEXPECTED_ERROR);
          break;
        }
      }
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1800);
    }
  };

  return (
    <Container>
      <FromContainer>
        {showAlert && <Alert message={alertMessage} />}
        <LoginFrom onSubmit={handleLogin}>
          <div className="form-element">
            <Input
              placeholder="Login"
              required
              value={login}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          </div>
          <div className="form-element">
            <Input
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          <SubmitButton type="submit">
            <p className="submit-button-text">Login</p>
          </SubmitButton>
        </LoginFrom>
      </FromContainer>
    </Container>
  );
}

export default Form;
