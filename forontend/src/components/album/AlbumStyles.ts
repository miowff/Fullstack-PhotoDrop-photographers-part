import styled from "styled-components";
export const AlbumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 100%;
    object-fit: cover;
  }
  border: 2px solid transparent;
  &:hover {
    border-color: black;
    transition: 0.5s;
  }
`;
export const AlbumCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  cursor: pointer;
  margin-right: 200px;
  width: 300px;
  height: 100px;
  h2 {
    font-size: 21px;
  }
`;
export const CardText = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: FuturaPT;
`;
