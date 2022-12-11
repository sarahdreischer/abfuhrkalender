import { Card, LoadingSpinner } from '../../../components';
import { Fraktion, HausNummer, Strasse, Termin } from '../../../types';
import { mapTermineToTermineRowProps } from '../utils/map-to-termine-rows';
import { TermineRow, TermineRowProps } from './TermineRow';

interface TermineContainerProps {
  termine: Termin[];
  fraktionen: Fraktion[];
  loading: boolean;
  selectedStrasse?: Strasse;
  selectedHausNummer?: HausNummer;
}

export function TermineContainer({
  termine,
  fraktionen,
  loading,
  selectedStrasse,
  selectedHausNummer,
}: TermineContainerProps) {
  const requiredFieldsSelected = selectedStrasse && selectedHausNummer;
  const collectionItemProps: TermineRowProps[] = mapTermineToTermineRowProps(termine, fraktionen);

  return (
    <Card
      className='overflow-auto'
      title='Ihre nächsten Abholungstermine'
      subtitle={
        requiredFieldsSelected && collectionItemProps.length > 0
          ? `${selectedStrasse?.name || ''} ${selectedHausNummer?.nr || ''}`
          : undefined
      }
    >
      {!requiredFieldsSelected && (
        <div>
          Bitte wählen Sie <strong>Stadt</strong>, <strong>Straße</strong> und{' '}
          <strong>Hausnummer</strong> aus
        </div>
      )}
      {loading && <LoadingSpinner />}
      {!loading && requiredFieldsSelected && collectionItemProps.length > 0 && (
        <>
          {collectionItemProps.map((props, i) => (
            <div key={i}>
              <TermineRow {...props} />
              {i < collectionItemProps.length - 1 && <hr />}
            </div>
          ))}
        </>
      )}
      {!loading && requiredFieldsSelected && collectionItemProps.length === 0 && (
        <div>Es sind leider keine Termine verfügbar</div>
      )}
    </Card>
  );
}
