import React, { useState } from 'react';
import { Card, Datalist } from '../../components';
import Image from 'next/image';
import cn from 'classnames';
import styles from './Appointments.module.scss';
import { CollectionItem } from './components/CollectionItem';
import { Fraktion, HausNummer, Ort, Strasse } from '../../types';

// Orte aus System holen
// Mit Ort die Straßen abfragen
// Mit Straße die Hausnummern abfragen
// Mit Haunummer die möglichen Fraktionen (Müllsorten) abfragen
// Mit Hausnummer und Fraktionen alle Termine abrufen

interface AppointmentsPageProps {
  hausNummern: HausNummer[];
  fraktionen: Fraktion[];
  orte: Ort[];
  strassen: Strasse[];
}

export function AppointmentsPage({
  hausNummern,
  fraktionen,
  orte,
  strassen,
}: AppointmentsPageProps) {
  const [ortId, setOrtId] = useState<string>();
  const [strasseId, setStrasseId] = useState<string>();
  const [hausnummerId, setHausnummerId] = useState<string>();

  const requiredFieldsSelected = ortId && strasseId && hausnummerId;

  return (
    <div className='d-flex h-100 w-100 py-5 px-4'>
      <div className={cn(styles.sidebar, 'me-3')}>
        <Card title='Filters'>
          <div className='mb-2'>
            <Datalist
              label='Ort'
              items={orte.map(({ id, name }) => ({ id, value: name }))}
              required
              onSelect={setOrtId}
              onInputChange={() => setOrtId(undefined)}
            />
          </div>
          <div className='mb-2'>
            <Datalist
              label='Strasse'
              items={strassen.map(({ id, name }) => ({ id, value: name }))}
              required
              onSelect={setStrasseId}
              onInputChange={() => setStrasseId(undefined)}
            />
          </div>
          <div className='mb-2'>
            <Datalist
              label='Hausnummer'
              items={hausNummern.map(({ id, nr }) => ({ id, value: nr }))}
              required
              onSelect={setHausnummerId}
              onInputChange={() => setHausnummerId(undefined)}
            />
          </div>
        </Card>
      </div>
      <div className='flex-grow-1'>
        <Card title='Your bin collection days'>
          {!requiredFieldsSelected && <div>Please apply a filter</div>}
          {requiredFieldsSelected && (
            <>
              <CollectionItem collectionType='Household' color='black' date={new Date()} />
              <hr />
              <CollectionItem collectionType='Recycling' color='green' date={new Date()} />
              <hr />
              <CollectionItem collectionType='Paper' color='blue' date={new Date()} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
