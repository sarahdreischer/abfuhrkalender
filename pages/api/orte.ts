// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Ort } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Ort[]>) {
  const region = req.query.region;

  const url = `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/orte`;

  const orte = await fetchData<Ort[]>(url, 'GET').catch((err) => {
    console.log(`Could not fetch 'Orte' data for ${url}`, err);
    return [];
  });
  res.status(200).json(orte);
}
