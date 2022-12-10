import type { NextApiRequest, NextApiResponse } from 'next';
import { Termin } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Termin[]>) {
  const region = req.query.region;
  const hausNummerId = req.query.hausNummerId;

  const url = `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/hausnummern/${hausNummerId}/termine`;

  const termine: Termin[] = await fetchData<Termin[]>(url, 'GET').catch((err) => {
    console.log(`Could not fetch 'Termine' data for ${url}`, err);
    return [];
  });

  res.status(200).json(termine);
}
