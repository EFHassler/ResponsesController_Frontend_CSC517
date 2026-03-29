import React from "react";
import { Alert } from "react-bootstrap";

import CriterionItem from "./items/CriterionItem";
import ScaleItem from "./items/ScaleItem";
import CheckboxItem from "./items/CheckboxItem";
import TextFieldItem from "./items/TextFieldItem";
import TextAreaItem from "./items/TextAreaItem";
import DropdownItem from "./items/DropdownItem";
import MultipleChoiceItem from "./items/MultipleChoiceItem";
import UploadFileItem from "./items/UploadFileItem";

import { NormalizedItemType } from "./types";

interface ItemRendererProps {
  itemType: NormalizedItemType;
  itemId: string;
  item: any;
  itemText: string;
  value?: string;
  comment?: string;
  options?: string[];
  min?: number;
  max?: number;
  multiValue?: string[];
  booleanValue?: boolean;
  onValueChange?: (value: string) => void;
  onCommentChange?: (value: string) => void;
  onMultiValueChange?: (value: string[]) => void;
  onBooleanChange?: (value: boolean) => void;
}

const ItemRenderer: React.FC<ItemRendererProps> = (props) => {
  switch (props.itemType) {
    case "Criterion":
      return <CriterionItem {...props} />;

    case "Scale":
      return <ScaleItem {...props} />;

    case "Checkbox":
      return <CheckboxItem {...props} />;

    case "TextField":
      return <TextFieldItem {...props} />;

    case "TextArea":
      return <TextAreaItem {...props} />;

    case "Dropdown":
      return <DropdownItem {...props} />;

    case "MultipleChoice":
      return <MultipleChoiceItem {...props} />;

    case "UploadFile":
      return <UploadFileItem {...props} />;

    default:
      return (
        <Alert variant="secondary">
          Item type {props.itemType} not supported
        </Alert>
      );
  }
};

export default ItemRenderer;