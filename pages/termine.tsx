import React from 'react';
import { TerminePage } from '../containers';
import { Ort, Orte, Region } from '../types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchData } from '../utils/fetcher';
import { regionen } from '../data/regionen';
import { useRouter } from 'next/router';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
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

export default function Termine({ orte }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return <TerminePage orte={orte} ortId={router.query.ortId as string} />;
}
