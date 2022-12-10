import React, { useEffect, useState } from 'react';
import { Card } from '../../components';
import { CollectionItem, CollectionItemProps } from './components/CollectionItem';
import { Fraktion, HausNummer, Ort, Orte, Region, Strasse, Termin } from '../../types';
import {
  fetchAllFraktionen,
  fetchFraktionenFuerStrasse,
  fetchHausNummernFuerStrasse,
  fetchStrassen,
  fetchTermineFuerHausnummer,
} from '../../utils/fetcher';
import { AppointmentFilter } from './components/AppointmentFilter';
import { getRegionFromOrt, mapTermineToCollectionItemProps } from './utils';
import cn from 'classnames';
import styles from './Appointments.module.scss';

interface AppointmentsPageProps {
  orte: Orte;
}

export function AppointmentsPage({ orte }: AppointmentsPageProps) {
  const [region, setRegion] = useState<Region>();
  const [strassen, setStrassen] = useState<Strasse[]>([]);
  const [fraktionen, setFraktionen] = useState<Fraktion[]>([]);
  const [hausNummern, setHausNummern] = useState<HausNummer[]>([]);
  const [termine, setTermine] = useState<Termin[]>([]);

  const [ortId, setOrtId] = useState<string>();
  const [strasseId, setStrasseId] = useState<string>();
  const [hausNummerId, setHausNummerId] = useState<string>();

  const alleOrte: Ort[] = Object.values(orte).flat();
  const requiredFieldsSelected = ortId && strasseId && hausNummerId;
  const collectionItemProps: CollectionItemProps[] = mapTermineToCollectionItemProps(
    termine,
    fraktionen,
  );
  const selectedStreetName = strassen.find(({ id }) => id === strasseId)?.name || '';
  const selectedHouseNumber = hausNummern.find(({ id }) => id === hausNummerId)?.nr || '';

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
        <Card title='Filter'>
          <AppointmentFilter
            orte={alleOrte}
            strassen={strassen}
            hausNummern={hausNummern}
            onSelectedOrtId={setOrtId}
            onSelectedStrassenId={setStrasseId}
            onSelectedHausNummerId={setHausNummerId}
          />
        </Card>
      </div>
      <div className='flex-grow-1'>
        <Card className='overflow-auto' title='Ihr nächster Abholungstermin'>
          {!requiredFieldsSelected && <div>Bitte wählen Sie Stadt, Straße und Hausnummer aus</div>}
          {requiredFieldsSelected && collectionItemProps.length > 0 && (
            <>
              <div className='h6 pb-3 text-primary'>
                {selectedStreetName} {selectedHouseNumber}
              </div>
              {collectionItemProps.map(({ fraktion, date }, i) => (
                <div key={i}>
                  <CollectionItem fraktion={fraktion!} date={date} />
                  {i < collectionItemProps.length - 1 && <hr />}
                </div>
              ))}
            </>
          )}
          {requiredFieldsSelected && collectionItemProps.length === 0 && (
            <div>Es ist leider kein Termin verfügbar</div>
          )}
        </Card>
      </div>
    </div>
  );
}
