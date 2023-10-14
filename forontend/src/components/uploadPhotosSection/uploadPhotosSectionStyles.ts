import styled from "styled-components";
export const UploadPhotosSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: 10px;
  font-family: FuturaPT;
  font-size: 21px;
  gap: 170px;
  button {
    cursor: pointer;
    height: 50px;
  }
  button:hover {
    border: 1px solid;
    color: gray;
  }
  align-items: center;
  @media (max-width: 880px) {
    gap: 10px;
    flex-direction: column;
  }
  @media (max-width: 550px) {
    font-size: 18px;
  }
`;
export const RemoveAllPhotos = styled.button`
  color: white;
  background-color: #f56767;
  border: none;
  width: 180px;
  @media (max-width: 550px) {
    width: 100px;
  }
`;
export const UploadPhotos = styled.button`
  color: white;
  background-color: green;
  border: none;
  width: 180px;
  height: 50px;
  @media (max-width: 550px) {
    width: 100px;
  }
`;
export const BackToMenu = styled.button`
  width: 180px;
  border: 1px solid;
  @media (max-width: 550px) {
    width: 100px;
  }
`;
export const InputWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 180px;
  text-align: center;
  span {
    font-size: 21px;
    position: relative;
    z-index: 0;
    display: inline-block;
    width: 180px;
    height: 50px;
    background: blue;
    color: #fff;
    padding: 10px 0;
  }
  &:hover {
    .label {
      color: gray;
    }
  }
  @media (max-width: 550px) {
    width: 100px;
    span {
      width: 100px;
      height: 70px;
    }
  }
`;
export const InputPhotos = styled.input`
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

export const PhotosGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  grid-auto-rows: dense;
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    display: inline-block;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
  @media (max-width: 230px) {
    div {
      max-width: 230px;
    }
  }
`;
export const PhotoControls = styled.div`
  position: relative;
  align-self: self-start;
  left: 80px;
  top: 10px;
  gap: 10px;
  button {
    align-items: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
