import React from "react";
import { Form } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const ScaleItem: React.FC<ResponseItemProps> = ({
  itemText,
  value = "",
  min = 0,
  max = 10,
  onValueChange,
}) => {
  const scoreOptions = Array.from(
    { length: Math.max(0, max - min + 1) },
    (_, offset) => String(min + offset)
  );

  return (
    <>
      <Form.Label className="fw-semibold mb-0">{itemText}</Form.Label>

      <Form.Select
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        style={{ maxWidth: 180 }}
      >
        <option value="">Select score ({min}-{max})</option>
        {scoreOptions.map((scoreValue) => (
          <option key={scoreValue} value={scoreValue}>
            {scoreValue}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default ScaleItem;