import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Datalist } from '../../components';
import { Orte } from '../../types';

interface HomeProps {
  orte: Orte;
}

export function HomePage({ orte }: HomeProps) {
  const [ortId, setOrtId] = useState<string>();
  const [ortValue, setOrtValue] = useState('');
  const router = useRouter();

  const alleOrte = Object.values(orte).flat();

  function onSearchSubmit() {
    if (ortId) {
      router.push({ pathname: '/appointments', query: { ortId } });
    }
  }

  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100 container-xxl'>
      <div className='w-50'>
        <div className='h2 text-center pb-5'>Ihr Abfuhrkalender</div>

        <div className='d-flex'>
          <div className='flex-grow-1 me-2'>
            <Datalist
              className='h-100'
              placeholder='Bitte geben Sie eine Stadt ein'
              value={ortValue}
              setValue={setOrtValue}
              onInputChange={() => setOrtId(undefined)}
              onSelect={setOrtId}
              items={alleOrte.map(({ id, name }) => ({ id, value: name }))}
            />
          </div>
          <button className='btn btn-outline-success' type='submit' onClick={onSearchSubmit}>
            Suchen
          </button>
        </div>
      </div>
    </div>
  );
}
