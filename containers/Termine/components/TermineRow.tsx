import format from 'date-fns/format';
import { Fraktion } from '../../../types';
import { TrashIcon } from '../icons/TrashIcon';

export interface TermineRowProps {
  fraktion: Fraktion;
  dates: Date[];
}

export function TermineRow({ fraktion, dates }: TermineRowProps) {
  const formattedDates = dates.map((date) => format(date, 'dd.MM.yyyy'));

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
            {formattedDates.length === 1 && (
              <>
                <strong>Nächster Abholungstermin: </strong> {formattedDates[0]}
              </>
            )}
            {formattedDates.length > 1 && (
              <>
                <strong>Nächste Abholungstermine:</strong>
                <ul>
                  {formattedDates.map((date, i) => (
                    <li key={i}>{date}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
