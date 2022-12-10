import type { NextApiRequest, NextApiResponse } from 'next';
import { HausNummer, Strasse } from '../../types';
import { fetchData } from '../../utils/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse<HausNummer[]>) {
  const region = req.query.region;
  const strasseId = req.query.strasseId;

  const url = `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/strassen/${strasseId}`;

  const hausNummern: HausNummer[] = await fetchData<Strasse>(url, 'GET')
    .then((strasse) => strasse.hausNrList)
    .catch((err) => {
      console.log(`Could not fetch 'Hausnummer' data for ${url}`, err);
      return [];
    });

  res.status(200).json(hausNummern);
}
