import React from "react";
import { Alert } from "react-bootstrap";
import CriterionItem from "./items/CriterionItem";
import ScaleItem from "./items/ScaleItem";
import CheckboxItem from "./items/CheckboxItem";
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
  const { itemType } = props;

  switch (itemType) {
    case "Criterion":
      return <CriterionItem {...props} />;

    case "Scale":
      return <ScaleItem {...props} />;

    case "Checkbox":
      return <CheckboxItem {...props} />;

    default:
      return (
        <Alert variant="secondary" className="mb-0 py-2">
          Item type <strong>{itemType}</strong> not extracted yet.
        </Alert>
      );
  }
};

export default ItemRenderer;