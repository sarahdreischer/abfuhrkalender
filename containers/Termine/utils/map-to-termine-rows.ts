import { isAfter, isToday, parse } from 'date-fns';
import { Fraktion, Orte, Region, Termin } from '../../../types';
import { TermineRowProps } from '../components/TermineRow';

interface SingleTermineRow {
  fraktion: Fraktion;
  date: Date;
}

export function mapTermineToTermineRowProps(
  termine: Termin[],
  fraktionen: Fraktion[],
): TermineRowProps[] {
  const items = mapToSingleTermineRows(termine, fraktionen);
  const futureItems = filterFutureTermine(items);
  const sortedItems = sortTermineByDate(futureItems);
  return groupByFraktion(sortedItems);
}

function mapToSingleTermineRows(termine: Termin[], fraktionen: Fraktion[]): SingleTermineRow[] {
  return termine
    .map(({ bezirk, datum }) => ({
      fraktion: fraktionen.find((f) => f.id === bezirk.fraktionId),
      date: parse(datum, 'yyyy-MM-dd', new Date()),
    }))
    .filter(({ fraktion }) => fraktion !== undefined)
    .map(({ fraktion, date }) => ({ fraktion: fraktion!, date }));
}

function filterFutureTermine(items: SingleTermineRow[]): SingleTermineRow[] {
  return items.filter(({ fraktion, date }) => {
    return fraktion && (isToday(date) || isAfter(date, new Date()));
  });
}

function sortTermineByDate(items: SingleTermineRow[]): SingleTermineRow[] {
  return items.sort((itemA, itemB) => itemA.date.getTime() - itemB.date.getTime());
}

function groupByFraktion(items: SingleTermineRow[]): TermineRowProps[] {
  return items.reduce((groups, item) => {
    const matched: TermineRowProps | undefined = groups.find(
      (group) => group.fraktion.id === item.fraktion.id,
    );
    if (!matched) {
      return [...groups, { fraktion: item.fraktion, dates: [item.date] }];
    }
    const remaining: TermineRowProps[] = groups.filter(
      (group) => group.fraktion.id !== matched.fraktion.id,
    );
    return [...remaining, { fraktion: matched.fraktion, dates: [...matched.dates, item.date] }];
  }, [] as TermineRowProps[]);
}
