import { Dispatch, SetStateAction, useState } from 'react';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

export interface DatalistItem {
  id: string;
  value: string;
}

interface DatalistProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  items: DatalistItem[];
  onSelect: (id: string) => void;
  onInputChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function Datalist({
  value,
  setValue,
  label,
  items,
  onSelect,
  onInputChange,
  placeholder = '',
  required = false,
}: DatalistProps) {
  return (
    <DatalistInput
      value={value}
      setValue={setValue}
      placeholder={placeholder}
      label={label + (required ? '*' : '')}
      onSelect={(item) => onSelect(item.id)}
      onChange={(e: any) => onInputChange(e.target.value)}
      items={items}
    />
  );
}
