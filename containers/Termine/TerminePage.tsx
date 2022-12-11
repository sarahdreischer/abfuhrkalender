import React, { useEffect, useState } from 'react';
import { Fraktion, HausNummer, Ort, Orte, Region, Strasse, Termin } from '../../types';
import {
  fetchAllFraktionen as fetchAlleFraktionen,
  fetchFraktionenFuerStrasse,
  fetchHausNummernFuerStrasse,
  fetchStrassen,
  fetchTermineFuerHausnummer,
} from '../../utils/fetcher';
import { TermineFilter } from './components/TermineFilter';
import { TermineContainer } from './components/TermineContainer';
import { getRegionFromOrt } from './utils/map-ort-to-region';
import cn from 'classnames';
import styles from './TerminePage.module.scss';

interface TerminePageProps {
  orte: Orte;
  ortId?: string;
}

export function TerminePage({ orte, ortId: initialOrtId }: TerminePageProps) {
  const [region, setRegion] = useState<Region>();
  const [strassen, setStrassen] = useState<Strasse[]>([]);
  const [fraktionen, setFraktionen] = useState<Fraktion[]>([]);
  const [hausNummern, setHausNummern] = useState<HausNummer[]>([]);
  const [termine, setTermine] = useState<Termin[]>([]);

  const [ortsId, setOrtsId] = useState<string | undefined>(initialOrtId);
  const [strassenId, setStrassenId] = useState<string | undefined>();
  const [hausNummerId, setHausNummerId] = useState<string | undefined>();
  const [loadingTermine, setLoadingTermine] = useState<boolean>(false);

  const alleOrte: Ort[] = Object.values(orte).flat();

  useEffect(() => {
    if (ortsId) {
      const _region = getRegionFromOrt(ortsId, orte);
      setRegion(_region);

      if (_region) {
        fetchAlleFraktionen(_region).then(setFraktionen);
        fetchStrassen(_region, ortsId).then(setStrassen);
      }
    } else {
      clearRegion();
      clearHausNummern();
    }
  }, [ortsId]);

  useEffect(() => {
    if (strassenId && region) {
      fetchFraktionenFuerStrasse(region, strassenId).then(setFraktionen);
      fetchHausNummernFuerStrasse(region, strassenId).then(setHausNummern);
    } else {
      clearHausNummern();
    }
  }, [strassenId]);

  useEffect(() => {
    if (region && hausNummerId) {
      fetchTermineFuerHausnummer(region, hausNummerId)
        .then(setTermine)
        .then(() => setLoadingTermine(false));
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
        <TermineFilter
          orte={alleOrte}
          strassen={strassen}
          hausNummern={hausNummern}
          onSelectedOrtsId={setOrtsId}
          onSelectedStrassenId={setStrassenId}
          onSelectedHausNummerId={(id) => {
            setLoadingTermine(id !== undefined);
            setHausNummerId(id);
          }}
          initialOrtsValue={alleOrte.find((ort) => ort.id == initialOrtId)?.name}
        />
      </div>
      <div className='flex-grow-1'>
        <TermineContainer
          termine={termine}
          fraktionen={fraktionen}
          loading={loadingTermine}
          selectedStrasse={strassen.find(({ id }) => id === strassenId)}
          selectedHausNummer={hausNummern.find(({ id }) => id === hausNummerId)}
        />
      </div>
    </div>
  );
}
