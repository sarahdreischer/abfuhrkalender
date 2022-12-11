import { useState } from 'react';
import { Card, Datalist } from '../../../components';
import { HausNummer, Ort, Strasse } from '../../../types';

interface TermineFilterProps {
  orte: Ort[];
  strassen: Strasse[];
  hausNummern: HausNummer[];
  onSelectedOrtsId: (id: string | undefined) => void;
  onSelectedStrassenId: (id: string | undefined) => void;
  onSelectedHausNummerId: (id: string | undefined) => void;
  initialOrtsValue?: string;
}

export function TermineFilter({
  orte,
  strassen,
  hausNummern,
  onSelectedOrtsId,
  onSelectedStrassenId,
  onSelectedHausNummerId,
  initialOrtsValue: initialOrtValue,
}: TermineFilterProps) {
  const [ortsValue, setOrtsValue] = useState<string>(initialOrtValue || '');
  const [strassenValue, setStrassenValue] = useState<string>('');
  const [hausNummerValue, setHausNummerValue] = useState<string>('');

  function onOrtsInputChange() {
    onSelectedOrtsId(undefined);
    onSelectedStrassenId(undefined);
    onSelectedHausNummerId(undefined);
    setStrassenValue('');
    setHausNummerValue('');
  }

  function onStrassenInuptChange() {
    onSelectedStrassenId(undefined);
    onSelectedHausNummerId(undefined);
    setHausNummerValue('');
  }

  function onHausNummerInuptChange() {
    onSelectedHausNummerId(undefined);
  }

  return (
    <Card title='Filter'>
      <div className='mb-2'>
        <Datalist
          value={ortsValue}
          setValue={setOrtsValue}
          label='Stadt'
          items={orte.map(({ id, name }) => ({ id, value: name }))}
          required
          onSelect={onSelectedOrtsId}
          onInputChange={onOrtsInputChange}
        />
      </div>
      <div className='mb-2'>
        <Datalist
          value={strassenValue}
          setValue={setStrassenValue}
          label='Straße'
          items={strassen.map(({ id, name }) => ({
            id,
            value: name,
          }))}
          required
          onSelect={onSelectedStrassenId}
          onInputChange={onStrassenInuptChange}
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
    </Card>
  );
}
