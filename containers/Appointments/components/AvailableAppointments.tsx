import { Card } from '../../../components';
import { Fraktion, HausNummer, Strasse, Termin } from '../../../types';
import { mapTermineToCollectionItemProps } from '../utils/map-to-collection-items';
import { CollectionItem, CollectionItemProps } from './CollectionItem';

interface AvailableAppointmentsProps {
  termine: Termin[];
  fraktionen: Fraktion[];
  selectedStreet?: Strasse;
  selectedHouseNumber?: HausNummer;
}

export function AvailableAppointments({
  termine,
  fraktionen,
  selectedStreet,
  selectedHouseNumber,
}: AvailableAppointmentsProps) {
  const requiredFieldsSelected = selectedStreet && selectedHouseNumber;
  const collectionItemProps: CollectionItemProps[] = mapTermineToCollectionItemProps(
    termine,
    fraktionen,
  );

  return (
    <Card
      className='overflow-auto'
      title='Ihre nächsten Abholungstermine'
      subtitle={
        requiredFieldsSelected && collectionItemProps.length > 0
          ? `${selectedStreet?.name || ''} ${selectedHouseNumber?.nr || ''}`
          : undefined
      }
    >
      {!requiredFieldsSelected && (
        <div>
          Bitte wählen Sie <strong>Stadt</strong>, <strong>Straße</strong> und{' '}
          <strong>Hausnummer</strong> aus
        </div>
      )}
      {requiredFieldsSelected && collectionItemProps.length > 0 && (
        <>
          {collectionItemProps.map((props, i) => (
            <div key={i}>
              <CollectionItem {...props} />
              {i < collectionItemProps.length - 1 && <hr />}
            </div>
          ))}
        </>
      )}
      {requiredFieldsSelected && collectionItemProps.length === 0 && (
        <div>Es ist leider kein Termin verfügbar</div>
      )}
    </Card>
  );
}
