import { AlbumModel } from "@/models/album";
import { AlbumCard, AlbumContainer, CardText } from "./AlbumStyles";
import folderIcon from "./assets/folder-icon.svg";
function Album(albumInfo: AlbumModel) {
  const { title, location, id } = albumInfo;

  const handleClick = () => {
    console.log(id);
    window.location.href = `/album/${id}`;
  };
  return (
    <AlbumContainer onClick={handleClick}>
      <AlbumCard>
        <img className="icon" src={folderIcon} />
        <CardText>
          <h3 className="album-name">{title}</h3>
          <p className="album-location">Location: {location}</p>
        </CardText>
      </AlbumCard>
    </AlbumContainer>
  );
}
export default Album;
