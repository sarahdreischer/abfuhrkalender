import type { NextApiRequest, NextApiResponse } from 'next';
import { HausNummer, Strasse } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<HausNummer[]>) {
  const region = req.query.region;
  const strasseId = req.query.strasseId;

  const hausNummern: HausNummer[] = await fetchData<Strasse>(
    `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/strassen/${strasseId}`,
    'GET',
  ).then((strasse) => strasse.hausNrList);

  res.status(200).json(hausNummern);
}
