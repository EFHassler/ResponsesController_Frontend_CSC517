export type NormalizedItemType =
  | "SectionHeader"
  | "Criterion"
  | "TextField"
  | "TextArea"
  | "Dropdown"
  | "MultipleChoice"
  | "Scale"
  | "Checkbox"
  | "UploadFile"
  | "Unknown";

export interface ResponseItemProps {
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