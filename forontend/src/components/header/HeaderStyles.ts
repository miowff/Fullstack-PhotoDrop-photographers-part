import styled from "styled-components";

export const Logo = styled.div`
  margin-top: 20px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 280px) {
    img {
      width: 130px;
    }
  }
  @media (max-width: 220px) {
    img {
      width: 90px;
    }
  }
`;
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
export const LogOutButton = styled.button`
  float: right;
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
  }
  @media (max-width: 370px) {
    width: 60px;
    font-size: 16px;
  }
  @media (max-width: 335px) {
    width: 50px;
    font-size: 15px;
  }
  @media (max-width: 315px) {
    width: 30px;
    font-size: 13px;
  }
`;
