import { Orte, Region } from '../../../types';

export function getRegionFromOrt(ortId: string, orte: Orte): Region | undefined {
  const entry = Object.entries(orte).filter((ortsMap) => {
    return ortsMap[1].find((ort) => ort.id == ortId);
  });
  return entry.length > 0 ? entry[0][0] : undefined;
}
