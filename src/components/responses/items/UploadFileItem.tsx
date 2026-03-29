import React from "react";
import { Form } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const UploadFileItem: React.FC<ResponseItemProps> = ({
  itemId,
  onValueChange,
}) => {
  return (
    <Form.Control
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          onValueChange?.(file.name);
        }
      }}
    />
  );
};

export default UploadFileItem;