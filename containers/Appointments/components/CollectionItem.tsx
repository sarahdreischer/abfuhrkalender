import format from 'date-fns/format';
import { TrashIcon } from './TrashIcon';

interface CollectionItemProps {
  collectionType: string;
  color: string;
  date: Date;
}

export function CollectionItem({ collectionType, color, date }: CollectionItemProps) {
  const formattedDate = format(date, 'dd.MM.yyyy');

  return (
    <>
      <div className='d-flex align-items-center'>
        <TrashIcon fill={color} width={50} height={50} />
        <div className='ms-2'>
          <div>
            <strong>Service: </strong>
            {collectionType} Collection
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
