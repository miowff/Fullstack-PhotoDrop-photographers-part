import styled from "styled-components";
export const AlbumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: 0;
    width: 120px;
    height: 100%;
    object-fit: cover;
  }
  border: 2px solid transparent;
  &:hover {
    border-color: black;
    transition: 0.5s;
  }
  div {
    margin: 15px;
  }
  h3 {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 665px) {
    img {
      margin: 0;
      width: 100px;
      height: 80%;
      object-fit: cover;
    }
  }
  @media (max-width: 265px) {
    max-width: 200px;
    img {
      margin: 0;
      width: 100px;
      height: 70%;
      object-fit: cover;
    }
  }
  @media (max-width: 210px) {
    max-width: 150px;
  }
`;
export const CardText = styled.div`
  gap: 35px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  font-family: FuturaPT;
  width: 90%;
  @media (max-width: 265px) {
    h3 {
      font-size: 13px;
    }
    gap: 15px;
  }
  @media (max-width: 201px) {
    h3 {
      font-size: 7px;
    }
    gap: 15px;
  }
`;
