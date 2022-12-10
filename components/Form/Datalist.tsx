import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

export interface DatalistItem {
  id: string;
  value: string;
}

interface DatalistProps {
  label: string;
  items: DatalistItem[];
  onSelect: (id: string) => void;
  onInputChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function Datalist({
  label,
  items,
  onSelect,
  onInputChange,
  placeholder = '',
  required = false,
}: DatalistProps) {
  return (
    <DatalistInput
      placeholder={placeholder + (required ? '*' : '')}
      label={label}
      onSelect={(item) => onSelect(item.id)}
      onChange={(e) => onInputChange(e.target.value)}
      items={items}
    />
  );
}
