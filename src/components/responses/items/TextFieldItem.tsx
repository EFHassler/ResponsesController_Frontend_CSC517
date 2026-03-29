import React from "react";
import { Form } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const TextFieldItem: React.FC<ResponseItemProps> = ({
  value = "",
  onValueChange,
}) => {
  return (
    <Form.Control
      type="text"
      placeholder="Your response..."
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    />
  );
};

export default TextFieldItem;