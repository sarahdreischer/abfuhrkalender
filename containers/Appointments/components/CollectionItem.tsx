import format from 'date-fns/format';
import { Fraktion } from '../../../types';
import { TrashIcon } from './TrashIcon';

interface CollectionItemProps {
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
            <strong>Service: </strong>
            {fraktion.name} Collection
          </div>
          <div>
            <strong>Next collection date: </strong>
            {formattedDate}
          </div>
        </div>
      </div>
    </>
  );
}
