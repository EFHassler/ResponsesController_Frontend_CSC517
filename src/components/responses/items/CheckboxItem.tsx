import React from "react";
import { Form } from "react-bootstrap";
import { ResponseItemProps } from "../types";

const CheckboxItem: React.FC<ResponseItemProps> = ({
  itemText,
  options = [],
  multiValue = [],
  booleanValue = false,
  onMultiValueChange,
  onBooleanChange,
}) => {
  if (options.length > 0) {
    return (
      <>
        <Form.Label className="fw-semibold mb-0">{itemText}</Form.Label>
        <div className="d-flex flex-column gap-2">
          {options.map((option) => {
            const isChecked = multiValue.includes(option);
            return (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                checked={isChecked}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...multiValue, option]
                    : multiValue.filter((entry) => entry !== option);
                  onMultiValueChange?.(updated);
                }}
              />
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <Form.Label className="fw-semibold mb-0">{itemText}</Form.Label>
      <Form.Check
        type="checkbox"
        label="Selected"
        checked={booleanValue}
        onChange={(e) => onBooleanChange?.(e.target.checked)}
      />
    </>
  );
};

export default CheckboxItem;