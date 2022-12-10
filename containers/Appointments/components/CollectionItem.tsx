import format from 'date-fns/format';
import { Fraktion } from '../../../types';
import { TrashIcon } from './TrashIcon';

export interface CollectionItemProps {
  fraktion: Fraktion;
  date: Date;
}

export function CollectionItem({ fraktion, date }: CollectionItemProps) {
  const formattedDate = format(date, 'dd.MM.yyyy');

  return (
    <>
      <div className='d-flex align-items-center'>
        <TrashIcon fill={'#' + fraktion.farbeRgb} width={50} height={50} />
        <div className='ms-2'>
          <div>
            <strong>Abfallsorte: </strong>
            {fraktion.name}
          </div>
          <div>
            <strong>Nächster Abholungstermin: </strong>
            {formattedDate}
          </div>
        </div>
      </div>
    </>
  );
}
