import { styled } from "styled-components";
export const FormContainer = styled.div`
  z-index: 15;
  position: absolute;
  background-color: white;
  border: 2px solid #ccc;
  padding: 10px;
  margin-top: 100px;
  margin-left: 190px;
  box-shadow: 10px 5px 5px gray;
  display: flex;
  flex-direction: column;
  font-family: FuturaPT;
  font-size: 15px;
  ul {
    margin-top: 10px;
    list-style-type: none;
    padding: 0;
  }
  button {
    margin-top: 10px;
    width: 75px;
  }
  .selectNumberCheckbox {
    margin: 10px;
  }
`;
export const NumbersContainer = styled.div`
  border: 1px solid #ccc;
  margin-top: 15px;
  input {
    margin-right: 5px;
  }
  ul {
    max-height: 100px;
    overflow-y: scroll;
    list-style-type: none;
    list-style-type: none;
    padding: 0; 
    margin: 0; 

    li {
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
  }
`;
export const FormButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
