import type { NextApiRequest, NextApiResponse } from 'next';
import { Strasse } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Strasse[]>) {
  const region = req.query.region;
  const strasseId = req.query.id;

  const strassen = await fetchData<Strasse[]>(
    `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/orte/${strasseId}/strassen`,
    'GET',
  );
  res.status(200).json(strassen);
}
