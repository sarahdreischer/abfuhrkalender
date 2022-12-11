import React, { useEffect, useState } from 'react';
import { Fraktion, HausNummer, Ort, Orte, Region, Strasse, Termin } from '../../types';
import {
  fetchAllFraktionen,
  fetchFraktionenFuerStrasse,
  fetchHausNummernFuerStrasse,
  fetchStrassen,
  fetchTermineFuerHausnummer,
} from '../../utils/fetcher';
import { AppointmentFilter } from './components/AppointmentFilter';
import cn from 'classnames';
import styles from './Appointments.module.scss';
import { AvailableAppointments } from './components/AvailableAppointments';
import { getRegionFromOrt } from './utils/map-ort-to-region';

interface AppointmentsPageProps {
  orte: Orte;
  ortId?: string;
}

export function AppointmentsPage({ orte, ortId: initialOrtId }: AppointmentsPageProps) {
  const [region, setRegion] = useState<Region>();
  const [strassen, setStrassen] = useState<Strasse[]>([]);
  const [fraktionen, setFraktionen] = useState<Fraktion[]>([]);
  const [hausNummern, setHausNummern] = useState<HausNummer[]>([]);
  const [termine, setTermine] = useState<Termin[]>([]);

  const [ortId, setOrtId] = useState<string | undefined>(initialOrtId);
  const [strasseId, setStrasseId] = useState<string | undefined>();
  const [hausNummerId, setHausNummerId] = useState<string | undefined>();

  const alleOrte: Ort[] = Object.values(orte).flat();

  const getRegion = (id: string) => getRegionFromOrt(id, orte);

  useEffect(() => {
    if (ortId) {
      const _region = getRegion(ortId);
      setRegion(_region);

      if (_region) {
        fetchAllFraktionen(_region).then(setFraktionen);
        fetchStrassen(_region, ortId).then(setStrassen);
      }
    } else {
      clearRegion();
      clearHausNummern();
    }
  }, [ortId]);

  useEffect(() => {
    if (strasseId && region) {
      fetchFraktionenFuerStrasse(region, strasseId).then(setFraktionen);
      fetchHausNummernFuerStrasse(region, strasseId).then(setHausNummern);
    } else {
      clearHausNummern();
    }
  }, [strasseId]);

  useEffect(() => {
    if (region && hausNummerId) {
      fetchTermineFuerHausnummer(region, hausNummerId).then(setTermine);
    }
  }, [hausNummerId]);

  function clearRegion() {
    setRegion(undefined);
  }

  function clearHausNummern() {
    setHausNummern([]);
  }

  return (
    <div className={cn('h-100 w-100 py-5 px-4 container-lg', styles.container)}>
      <div className={cn(styles.sidebar, 'me-3')}>
        <AppointmentFilter
          orte={alleOrte}
          strassen={strassen}
          hausNummern={hausNummern}
          onSelectedOrtId={setOrtId}
          onSelectedStrassenId={setStrasseId}
          onSelectedHausNummerId={setHausNummerId}
          initialOrtValue={alleOrte.find((ort) => ort.id == initialOrtId)?.name}
        />
      </div>
      <div className='flex-grow-1'>
        <AvailableAppointments
          termine={termine}
          fraktionen={fraktionen}
          selectedStreet={strassen.find(({ id }) => id === strasseId)}
          selectedHouseNumber={hausNummern.find(({ id }) => id === hausNummerId)}
        />
      </div>
    </div>
  );
}
