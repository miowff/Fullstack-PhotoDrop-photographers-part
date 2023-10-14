import styled from "styled-components";

export const FromContainer = styled.div`
  max-width: 700px;
  margin: 100px auto;
`;
export const LoginFrom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Input = styled.input`
  width: 400px;
  height: 50px;
  font-family: FuturaPT;
  @media (max-width: 600px) {
    width: 170px;
  }
`;
export const SubmitButton = styled.button`
  background-color: blue;
  margin-top: 15px;
  color: #fff;
  font-size: 17px;
  font-family: FuturaPT;
  height: 50px;
  cursor: pointer;
`;
export const AlertContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #ff3333;
  color: white;
  border-radius: 5px;
  font-family: FuturaPT;
  top: 10%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
`;
