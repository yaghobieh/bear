export interface ToolbarSignatureProps {
  title: string;
  disabled?: boolean;
  onInsert: (dataUrl: string) => void;
}
