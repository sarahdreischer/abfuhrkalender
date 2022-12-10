import React, { useEffect, useState } from 'react';
import { Card, Datalist } from '../../components';
import { CollectionItem } from './components/CollectionItem';
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
        <Card title='Filters'>
          <div className='mb-2'>
            <Datalist
              label='Ort'
              items={alleOrte.map(({ id, name }) => ({ id, value: name }))}
              required
              onSelect={setOrtId}
              onInputChange={() => setOrtId(undefined)}
            />
          </div>
          <div className='mb-2'>
            <Datalist
              label='Strasse'
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
        <Card title='Your bin collection days'>
          {!requiredFieldsSelected && <div>Please apply a filter</div>}
          {requiredFieldsSelected && (
            <>
              {termine
                .map(({ bezirk, datum }) => ({
                  fraktion: fraktionen.find((f) => f.id === bezirk.fraktionId),
                  date: parse(datum, 'yyyy-MM-dd', new Date()),
                }))
                .filter(({ fraktion, date }) => {
                  return fraktion !== undefined && (isToday(date) || isAfter(date, new Date()));
                })
                .map(({ fraktion, date }, i) => (
                  <div key={i}>
                    <CollectionItem fraktion={fraktion!} date={date} />
                    <hr />
                  </div>
                ))}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
