import { useState } from 'react';
import { Datalist } from '../../../components';
import { HausNummer, Ort, Strasse } from '../../../types';

interface AppointmentFilter {
  orte: Ort[];
  strassen: Strasse[];
  hausNummern: HausNummer[];
  onSelectedOrtId: (id: string | undefined) => void;
  onSelectedStrassenId: (id: string | undefined) => void;
  onSelectedHausNummerId: (id: string | undefined) => void;
  initialOrtValue?: string;
}

export function AppointmentFilter({
  orte,
  strassen,
  hausNummern,
  onSelectedOrtId,
  onSelectedStrassenId,
  onSelectedHausNummerId,
  initialOrtValue,
}: AppointmentFilter) {
  const [ortValue, setOrtValue] = useState<string>(initialOrtValue || '');
  const [strasseValue, setStrasseValue] = useState<string>('');
  const [hausNummerValue, setHausNummerValue] = useState<string>('');

  function onOrtInputChange() {
    onSelectedOrtId(undefined);
    onSelectedStrassenId(undefined);
    onSelectedHausNummerId(undefined);
    setStrasseValue('');
    setHausNummerValue('');
  }

  function onStrasseInuptChange() {
    onSelectedStrassenId(undefined);
    onSelectedHausNummerId(undefined);
    setHausNummerValue('');
  }

  function onHausNummerInuptChange() {
    onSelectedHausNummerId(undefined);
  }

  return (
    <>
      <div className='mb-2'>
        <Datalist
          value={ortValue}
          setValue={setOrtValue}
          label='Stadt'
          items={orte.map(({ id, name }) => ({ id, value: name }))}
          required
          onSelect={onSelectedOrtId}
          onInputChange={onOrtInputChange}
        />
      </div>
      <div className='mb-2'>
        <Datalist
          value={strasseValue}
          setValue={setStrasseValue}
          label='Straße'
          items={strassen.map(({ id, name }) => ({
            id,
            value: name,
          }))}
          required
          onSelect={onSelectedStrassenId}
          onInputChange={onStrasseInuptChange}
        />
      </div>
      <div className='mb-2'>
        <Datalist
          value={hausNummerValue}
          setValue={setHausNummerValue}
          label='Hausnummer'
          items={hausNummern.map(({ id, nr }) => ({
            id,
            value: nr,
          }))}
          required
          onSelect={onSelectedHausNummerId}
          onInputChange={onHausNummerInuptChange}
        />
      </div>
    </>
  );
}
