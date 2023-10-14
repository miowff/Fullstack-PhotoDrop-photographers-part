import { AlertContainer } from "./FormStyles";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  return <AlertContainer>{message}</AlertContainer>;
};

export default Alert;
