import React from "react";
import { Form } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const TextAreaItem: React.FC<ResponseItemProps> = ({
  value = "",
  onValueChange,
}) => {
  return (
    <Form.Control
      as="textarea"
      rows={4}
      placeholder="Your comments..."
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    />
  );
};

export default TextAreaItem;