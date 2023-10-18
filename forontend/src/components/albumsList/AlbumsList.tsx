import { Container } from "@/globalStyle";
import Album from "../album/Album";
import { AlbumModel } from "@/models/album";
import { useEffect, useState } from "react";
import { BaseError } from "@/models/error";
import { useNavigate } from "react-router-dom";
import { AlbumsGrid, ButtonContainer } from "./AlbumsListStyles";
import React from "react";
import CreateAlbumForm from "../createAlbumForm/CreateAlbumForm";
import { getAlbums } from "@/api";
function AlbumsList() {
  const navigate = useNavigate();
  const [albums, setAlbum] = useState<AlbumModel[]>([]);
  const [isCreateAlbumFormOpened, setOpenCreateAlbumForm] =
    React.useState(false);
  const updateAlbums = (albums: AlbumModel[]) => {
    setAlbum(albums);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const albums = await getAlbums();
        setAlbum(albums);
      } catch (err) {
        const { response } = err as BaseError;
        const { status } = response;
        if (status == 403 || status == 401) {
          navigate("/login");
        } else {
          console.error("Error fetching data:", err);
        }
      }
    };
    fetchData();
  });
  return (
    <Container>
      <ButtonContainer>
        <button
          className="create-album-button"
          onClick={() => setOpenCreateAlbumForm(true)}
        >
          Create album
        </button>
      </ButtonContainer>
      {isCreateAlbumFormOpened && (
        <CreateAlbumForm
          onAlbumCreated={updateAlbums}
          setOpenCreateAlbumForm={setOpenCreateAlbumForm}
          isFormUpOpen={isCreateAlbumFormOpened}
          albums={albums}
        />
      )}
      <AlbumsGrid>
        {albums.map((album: AlbumModel, i: number) => (
          <Album key={i} {...album}></Album>
        ))}
      </AlbumsGrid>
    </Container>
  );
}
export default AlbumsList;
