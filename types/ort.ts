export interface Ort {
  id: string;
  name: string;
}

export type Region = string;

export interface Orte {
  [region: Region]: Ort[];
}
