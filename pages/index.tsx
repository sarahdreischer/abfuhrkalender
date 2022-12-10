import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { HomePage } from '../containers';
import { regionen } from '../data/regionen';
import { Ort, Orte } from '../types';
import { fetchData } from '../utils/fetcher';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59');

  const getOrte = regionen.map((region) =>
    fetchData<Ort[]>(
      `https://${region}-abfallapp.regioit.de/abfall-app-${region}/rest/orte`,
      'GET',
    ).then((ortsList) => ({ region, ortsList })),
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
