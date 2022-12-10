import { isAfter, isToday, parse } from 'date-fns';
import { Fraktion, Orte, Region, Termin } from '../../types';
import { CollectionItemProps } from './components/CollectionItem';

export function getRegionFromOrt(ortId: string, orte: Orte): Region | undefined {
  const entry = Object.entries(orte).filter((ortsMap) => {
    return ortsMap[1].find((ort) => ort.id === ortId);
  });

  if (entry.length > 0) {
    return entry[0][0];
  }

  return;
}

export function mapTermineToCollectionItemProps(
  termine: Termin[],
  fraktionen: Fraktion[],
): CollectionItemProps[] {
  const items = mapToCollectionItem(termine, fraktionen);
  const futureItems = filterFutureCollectionItems(items);
  return sortCollectionItemsByDate(futureItems);
}

function mapToCollectionItem(termine: Termin[], fraktionen: Fraktion[]): CollectionItemProps[] {
  return termine
    .map(({ bezirk, datum }) => ({
      fraktion: fraktionen.find((f) => f.id === bezirk.fraktionId),
      date: parse(datum, 'yyyy-MM-dd', new Date()),
    }))
    .filter(({ fraktion }) => fraktion !== undefined)
    .map(({ fraktion, date }) => ({ fraktion: fraktion!, date }));
}

function filterFutureCollectionItems(items: CollectionItemProps[]): CollectionItemProps[] {
  return items.filter(({ fraktion, date }) => {
    return fraktion && (isToday(date) || isAfter(date, new Date()));
  });
}

function sortCollectionItemsByDate(items: CollectionItemProps[]): CollectionItemProps[] {
  return items.sort((itemA, itemB) => itemA.date.getTime() - itemB.date.getTime());
}
