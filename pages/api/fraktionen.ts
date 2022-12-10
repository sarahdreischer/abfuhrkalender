import type { NextApiRequest, NextApiResponse } from 'next';
import { Fraktion } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Fraktion[]>) {
  const region = req.query.region;
  const strasseId = req.query.strasseId;

  const url = strasseId
    ? `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/strassen/${strasseId}/fraktionen`
    : `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/fraktionen`;

  const fraktionen = await fetchData<Fraktion[]>(url, 'GET').catch((err) => {
    console.log(`Could not fetch 'Fraktionen' data for ${url}`, err);
    return [];
  });
  res.status(200).json(fraktionen);
}
