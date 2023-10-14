import React, { useState } from "react";
import {
  FormButtonsContainer,
  FormContainer,
  NumbersContainer,
} from "./addUsersFormStyles";

export interface UsersPhoto {
  phoneNumbers: string[];
  photoId: number;
}

interface UsersProps {
  usersNumbers: string[];
  photoKey: string;
  existingUsersPhoto: Map<string, string[]>;
  onClose: () => void;
  onSelectedPhoneNumbers: (usersPhoto: Map<string, string[]>) => void;
}

const AddUsersForm: React.FC<UsersProps> = ({
  usersNumbers,
  photoKey,
  existingUsersPhoto,
  onClose,
  onSelectedPhoneNumbers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState<string[]>(
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (phoneNumber: string) => {
    setSelectedPhoneNumbers((prevPhoneNumbers) => {
      if (prevPhoneNumbers.includes(phoneNumber)) {
        return prevPhoneNumbers.filter((num) => num !== phoneNumber);
      } else {
        return [...prevPhoneNumbers, phoneNumber];
      }
    });
  };

  const handleAddButtonClick = () => {
    existingUsersPhoto.set(photoKey, selectedPhoneNumbers);
    onSelectedPhoneNumbers(existingUsersPhoto);
    onClose();
  };

  const filteredUsers = usersNumbers.filter((number: string) =>
    number.includes(searchTerm)
  );

  return (
    <FormContainer>
      <input
        type="text"
        placeholder="Phone number"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <NumbersContainer>
          <ul>
            {filteredUsers.map((number, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(number)}
                />
                <span>{number}</span>
              </li>
            ))}
          </ul>
        </NumbersContainer>
      </div>
      <FormButtonsContainer>
        <button onClick={handleAddButtonClick}>Add</button>
        <button onClick={onClose}>Close</button>
      </FormButtonsContainer>
    </FormContainer>
  );
};

export default AddUsersForm;
