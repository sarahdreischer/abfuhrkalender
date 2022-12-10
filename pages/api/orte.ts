// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Ort } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Ort[]>) {
  const region = req.query.region;

  const orte = await fetchData<Ort[]>(
    `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/orte`,
    'GET',
  );
  res.status(200).json(orte);
}
