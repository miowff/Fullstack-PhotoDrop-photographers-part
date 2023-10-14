import styled from "styled-components";

export const AlbumsGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: dense;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-family: FuturaPT;
  font-size: 20px;
  .create-album-button {
    cursor: pointer;
    width: 150px;
  }

  @media (max-width: 1300px) {
    position: relative;
    right: 180px;
    margin-left: 350px;
  }
`;
