import React, { useEffect } from "react";
import { AlertContainer } from "../form/FormStyles";

interface AttachNumbersAlertProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const AttachNumbersAlert: React.FC<AttachNumbersAlertProps> = ({
  message,
  duration,
  onClose,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return <AlertContainer>{message}</AlertContainer>;
};

export default AttachNumbersAlert;
