import { Fraktion, HausNummer, Region, Strasse, Termin } from '../types';

type FetchMethod = 'GET' | 'POST' | 'PATCH';

export async function fetchData<T>(
  url: string,
  method: FetchMethod,
  body?: any,
  contentType: string = 'application/json',
): Promise<T> {
  console.log('Fetching', Date.now());
  return fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      accept: contentType,
    },
  }).then((res: Response) => res.json() as T);
}

export async function fetchStrassen(region: Region, ortsId: string): Promise<Strasse[]> {
  return fetchData<Strasse[]>(`/api/strassen?region=${region}&id=${ortsId}`, 'GET');
}

export async function fetchAllFraktionen(region: Region): Promise<Fraktion[]> {
  return fetchData<Fraktion[]>(`/api/fraktionen?region=${region}`, 'GET');
}

export async function fetchFraktionenFuerStrasse(
  region: Region,
  strasseId: string,
): Promise<Fraktion[]> {
  return fetchData<Fraktion[]>(`/api/fraktionen?region=${region}&strasseId=${strasseId}`, 'GET');
}

export async function fetchHausNummernFuerStrasse(
  region: Region,
  strasseId: string,
): Promise<HausNummer[]> {
  return fetchData<HausNummer[]>(`/api/hausnummern?region=${region}&strasseId=${strasseId}`, 'GET');
}

export async function fetchTermineFuerHausnummer(
  region: Region,
  hausNummerId: string,
): Promise<Termin[]> {
  return fetchData<Termin[]>(`/api/termine?region=${region}&hausNummerId=${hausNummerId}`, 'GET');
}
