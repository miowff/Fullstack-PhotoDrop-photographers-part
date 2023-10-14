import { AlbumModel, CreateAlbumModel } from "@/models/album";
import {
  BlurContainer,
  CreateAlbum,
  FormContainer,
  FormHeader,
  SubmitButton,
} from "./createAlbumFormStyles";
import { useState } from "react";
import { addAlbum } from "@/api/albums";
type CreateAlbumProps = {
  onAlbumCreated: (albums: AlbumModel[]) => void;
  setOpenCreateAlbumForm: React.Dispatch<React.SetStateAction<boolean>>;
  isFormUpOpen: boolean;
  albums: AlbumModel[];
};
const CreateAlbumForm: React.FC<CreateAlbumProps> = ({
  onAlbumCreated,
  setOpenCreateAlbumForm,
  isFormUpOpen,
  albums,
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [creatorName, setCreator] = useState("");
  const handleAddAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newAlbum: CreateAlbumModel = {
        title,
        location,
        dataPicker: creatorName,
      };
      const createdAlbum = await addAlbum(newAlbum);
      albums.push(createdAlbum);
      onAlbumCreated(albums);
      setOpenCreateAlbumForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BlurContainer isBlurred={isFormUpOpen}>
      <FormContainer>
        <FormHeader>
          <div>
            <button
              className="close-button"
              onClick={() => setOpenCreateAlbumForm(false)}
            >
              X
            </button>
          </div>
        </FormHeader>
        <CreateAlbum onSubmit={handleAddAlbum}>
          <div className="form-element">
            <input
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-element">
            <input
              className="input"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-element">
            <input
              className="input"
              placeholder="Creator Name"
              value={creatorName}
              onChange={(e) => setCreator(e.target.value)}
              required
            />
          </div>
          <SubmitButton>
            <p className="submit-button-text">Save</p>
          </SubmitButton>
        </CreateAlbum>
      </FormContainer>
    </BlurContainer>
  );
};
export default CreateAlbumForm;
