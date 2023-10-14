import { styled } from "styled-components";
export const FormContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: 0.5s;
  z-index: 10;
  margin-bottom: 200px;
  input {
    width: 400px;
    height: 50px;
    font-family: FuturaPT;
  }
  .close-button {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    input {
      max-width: 200px;
    }
    
  }
`;
export const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 80px;
  font-family: FuturaPT;
  .close-button {
    width: 25px;
    height: 25px;
  }
`;
export const CreateAlbum = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
`;
export const SubmitButton = styled.button`
  background-color: blue;
  font-family: FuturaPT;
  margin-top: 15px;
  color: #fff;
  font-size: 18px;
  height: 50px;
  cursor: pointer;
`;
export const BlurContainer = styled.div<{ isBlurred: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: ${(props) => (props.isBlurred ? "blur(8px)" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
