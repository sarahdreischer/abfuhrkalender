import React from 'react';
import { AppointmentsPage } from '../containers';
import orte from '../public/beispiel-orte-data.json';
import strassen from '../public/beispiel-strassen-data.json';
import hausNummern from '../public/beispiel-hausnummern-data.json';
import fraktionen from '../public/beispiel-fraktionen-data.json';
import { Fraktion, HausNummer, Ort, Strasse } from '../types';

export default function Appointments() {
  return (
    <AppointmentsPage
      orte={orte as unknown[] as Ort[]}
      strassen={strassen as unknown[] as Strasse[]}
      hausNummern={hausNummern.hausNrList as unknown[] as HausNummer[]}
      fraktionen={fraktionen as unknown[] as Fraktion[]}
    />
  );
}
