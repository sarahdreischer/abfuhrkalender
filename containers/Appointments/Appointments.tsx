import React, { useEffect, useState } from 'react';
import { Card, Datalist } from '../../components';
import { CollectionItem, CollectionItemProps } from './components/CollectionItem';
import { Fraktion, HausNummer, Ort, Orte, Region, Strasse, Termin } from '../../types';
import {
  fetchAllFraktionen,
  fetchFraktionenFuerStrasse,
  fetchHausNummernFuerStrasse,
  fetchStrassen,
  fetchTermineFuerHausnummer,
} from '../../utils/fetcher';
import { isAfter, isToday, parse } from 'date-fns';
import cn from 'classnames';
import styles from './Appointments.module.scss';

interface AppointmentsPageProps {
  orte: Orte;
}

function getRegionFromOrt(ortId: string, orte: Orte): Region {
  return Object.entries(orte).filter((ortsMap) => {
    return ortsMap[1].find((ort) => ort.id === ortId);
  })[0][0];
}

function mapToCollectionItemProps(
  termine: Termin[],
  fraktionen: Fraktion[],
): CollectionItemProps[] {
  return termine
    .map(({ bezirk, datum }) => ({
      fraktion: fraktionen.find((f) => f.id === bezirk.fraktionId),
      date: parse(datum, 'yyyy-MM-dd', new Date()),
    }))
    .filter(({ fraktion, date }) => {
      return fraktion && (isToday(date) || isAfter(date, new Date()));
    })
    .map(({ fraktion, date }) => ({
      fraktion: fraktion!,
      date,
    }));
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
  const collectionItemProps: CollectionItemProps[] = mapToCollectionItemProps(termine, fraktionen);

  const getRegion = (id: string) => getRegionFromOrt(id, orte);

  useEffect(() => {
    if (ortId) {
      const _region = getRegion(ortId);
      setRegion(_region);

      fetchAllFraktionen(_region).then(setFraktionen);
      fetchStrassen(_region, ortId).then(setStrassen);
    }
  }, [ortId]);

  useEffect(() => {
    if (strasseId && region) {
      fetchFraktionenFuerStrasse(region, strasseId).then(setFraktionen);
      fetchHausNummernFuerStrasse(region, strasseId).then(setHausNummern);
    }
  }, [strasseId]);

  useEffect(() => {
    if (region && hausNummerId) {
      fetchTermineFuerHausnummer(region, hausNummerId).then(setTermine);
    }
  }, [hausNummerId]);

  return (
    <div className='d-flex h-100 w-100 py-5 px-4'>
      <div className={cn(styles.sidebar, 'me-3')}>
        <Card title='Filter'>
          <div className='mb-2'>
            <Datalist
              label='Stadt'
              items={alleOrte.map(({ id, name }) => ({ id, value: name }))}
              required
              onSelect={setOrtId}
              onInputChange={() => setOrtId(undefined)}
            />
          </div>
          <div className='mb-2'>
            <Datalist
              label='Straße'
              items={strassen.map(({ id, name }) => ({
                id,
                value: name,
              }))}
              required
              onSelect={setStrasseId}
              onInputChange={() => setStrasseId(undefined)}
            />
          </div>
          <div className='mb-2'>
            <Datalist
              label='Hausnummer'
              items={hausNummern.map(({ id, nr }) => ({
                id,
                value: nr,
              }))}
              required
              onSelect={setHausNummerId}
              onInputChange={() => setHausNummerId(undefined)}
            />
          </div>
        </Card>
      </div>
      <div className='flex-grow-1'>
        <Card title='Ihr nächster Abholungstermin'>
          {!requiredFieldsSelected && <div>Bitte wählen Sie Stadt, Straße und Hausnummer aus</div>}
          {requiredFieldsSelected && collectionItemProps.length > 0 && (
            <>
              <div className='h6 pb-3 text-primary'>
                {strassen.find(({ id }) => id === strasseId)?.name || ''}{' '}
                {hausNummern.find(({ id }) => id === hausNummerId)?.nr || ''}
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
