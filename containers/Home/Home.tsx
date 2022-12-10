import { useState } from 'react';
import { useRouter } from 'next/router';
import { Datalist } from '../../components';
import { Orte } from '../../types';
import cn from 'classnames';
import styles from './Home.module.scss';

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
      <div className={styles.container}>
        <div className='h2 text-center pb-5'>Ihr Abfuhrkalender</div>

        <div className={styles.form}>
          <div className={cn('flex-grow-1', styles.formSearchField)}>
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
          <div>
            <button className='btn btn-outline-success' type='submit' onClick={onSearchSubmit}>
              Suchen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
