import React from "react";
import { Form, Alert } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const DropdownItem: React.FC<ResponseItemProps> = ({
  value = "",
  options = [],
  onValueChange,
}) => {
  if (options.length === 0) {
    return <Alert variant="secondary">No options provided</Alert>;
  }

  return (
    <Form.Select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </Form.Select>
  );
};

export default DropdownItem;