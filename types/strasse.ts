import { HausNummer } from './hausnummer';
import { Ort } from './ort';

export interface Strasse {
  id: string;
  name: string;
  staticId: string;
  hausNrList: HausNummer[];
  plz: string;
  ort: Ort;
  ortsteilName: string;
}
