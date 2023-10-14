import styled from "styled-components";

export const Logo = styled.div`
  margin-top: 20px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
  }
`;
export const LogOutButton = styled.button`
  width: 120px;
  height: 40px;
  font-family: FuturaPT;
  margin-top: 10px;
  font-size: 20px;
  background-color: #f56767;
  border: none;
  color: white;
  position: absolute;
  cursor: pointer;
  &:hover {
    border: 1px solid;
    color: gray;
  }
  right: 15px;
  top: 20px;
  transform: translateY(-50%);
  @media (max-width: 460px) {
    width: 80px;
    right: 5px;
  }
  @media (max-width: 360px) {
    width: 60px;
    right: -50px;
  }
`;

