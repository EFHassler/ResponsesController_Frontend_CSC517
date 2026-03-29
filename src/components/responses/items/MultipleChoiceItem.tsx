import React from "react";
import { Form } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const MultipleChoiceItem: React.FC<ResponseItemProps> = ({
  value = "",
  options = [],
  itemId,
  onValueChange,
}) => {
  return (
    <div className="d-flex flex-column gap-2">
      {options.map((opt) => (
        <Form.Check
          key={opt}
          type="radio"
          name={`mc-${itemId}`}
          label={opt}
          checked={value === opt}
          onChange={() => onValueChange?.(opt)}
        />
      ))}
    </div>
  );
};

export default MultipleChoiceItem;