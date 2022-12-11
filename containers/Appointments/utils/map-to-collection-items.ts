import { isAfter, isToday, parse } from 'date-fns';
import { Fraktion, Orte, Region, Termin } from '../../../types';
import { CollectionItemProps } from '../components/CollectionItem';

interface CollectionItem {
  fraktion: Fraktion;
  date: Date;
}

export function mapTermineToCollectionItemProps(
  termine: Termin[],
  fraktionen: Fraktion[],
): CollectionItemProps[] {
  const items = mapToCollectionItem(termine, fraktionen);
  const futureItems = filterFutureCollectionItems(items);
  const sortedItems = sortCollectionItemsByDate(futureItems);
  return groupByFraktion(sortedItems);
}

function mapToCollectionItem(termine: Termin[], fraktionen: Fraktion[]): CollectionItem[] {
  return termine
    .map(({ bezirk, datum }) => ({
      fraktion: fraktionen.find((f) => f.id === bezirk.fraktionId),
      date: parse(datum, 'yyyy-MM-dd', new Date()),
    }))
    .filter(({ fraktion }) => fraktion !== undefined)
    .map(({ fraktion, date }) => ({ fraktion: fraktion!, date }));
}

function filterFutureCollectionItems(items: CollectionItem[]): CollectionItem[] {
  return items.filter(({ fraktion, date }) => {
    return fraktion && (isToday(date) || isAfter(date, new Date()));
  });
}

function sortCollectionItemsByDate(items: CollectionItem[]): CollectionItem[] {
  return items.sort((itemA, itemB) => itemA.date.getTime() - itemB.date.getTime());
}

function groupByFraktion(items: CollectionItem[]): CollectionItemProps[] {
  return items.reduce((groups, item) => {
    const matched: CollectionItemProps | undefined = groups.find(
      (group) => group.fraktion.id === item.fraktion.id,
    );
    if (!matched) {
      return [...groups, { fraktion: item.fraktion, dates: [item.date] }];
    }
    const remaining: CollectionItemProps[] = groups.filter(
      (group) => group.fraktion.id !== matched.fraktion.id,
    );
    return [...remaining, { fraktion: matched.fraktion, dates: [...matched.dates, item.date] }];
  }, [] as CollectionItemProps[]);
}
