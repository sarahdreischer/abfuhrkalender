export interface Termin {
  id: string;
  bezirk: Bezirk;
  datum: string; // yyyy-MM-dd format
}

export interface Bezirk {
  id: string;
  name: string;
  gueltigAb: string;
  fraktionId: string;
}
