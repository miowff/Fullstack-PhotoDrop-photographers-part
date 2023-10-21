import { AlbumModel } from "@/models/album";
import { AlbumContainer, CardText } from "./AlbumStyles";
import folderIcon from "./assets/folder-icon.svg";
import { useNavigate } from "react-router-dom";

function Album(albumInfo: AlbumModel) {
  const { title, location, id } = albumInfo;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/album/${id}`);
  };
  return (
    <AlbumContainer onClick={handleClick}>
      <img className="icon" src={folderIcon} />
      <CardText>
        <h3 className="album-name">{title}</h3>
        <h3 className="album-location">Location: {location}</h3>
      </CardText>
    </AlbumContainer>
  );
}
export default Album;
