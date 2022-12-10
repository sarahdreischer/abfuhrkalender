import type { NextApiRequest, NextApiResponse } from 'next';
import { Strasse } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Strasse[]>) {
  const region = req.query.region;
  const strasseId = req.query.id;

  const url = `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/orte/${strasseId}/strassen`;
  const strassen = await fetchData<Strasse[]>(url, 'GET').catch((err) => {
    console.log(`Could not fetch 'Strassen' data for ${url}`, err);
    return [];
  });
  res.status(200).json(strassen);
}
