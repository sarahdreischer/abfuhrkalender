import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { HomePage } from '../containers';
import { regionen } from '../data/regionen';
import { Ort, Orte, Region } from '../types';
import { fetchData } from '../utils/fetcher';

export async function getServerSideProps({ res, locale }: GetServerSidePropsContext) {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59');

  const externalApi = (region: Region) =>
    `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/orte`;
  const getOrte = regionen.map((region) =>
    fetchData<Ort[]>(externalApi(region), 'GET').then((ortsList) => ({ region, ortsList })),
  );

  const results = await Promise.all(getOrte);

  return {
    props: {
      orte: results.reduce((alleOrte, pair) => {
        alleOrte[pair.region] = pair.ortsList;
        return alleOrte;
      }, {} as Orte),
    },
  };
}

export default function Home({ orte }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomePage orte={orte} />;
}
