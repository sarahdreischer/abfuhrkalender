export interface Appointment {
  id: string;
  bezirk: Bezirk[];
  datum: string;
}

export interface Bezirk {
  id: string;
  name: string;
  gueltigAb: unknown;
  fraktionId: string;
}
