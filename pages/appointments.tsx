import React from 'react';
import { AppointmentsPage } from '../containers';
import { Ort, Orte } from '../types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchData } from '../utils/fetcher';
import { regionen } from '../data/regionen';
import { useRouter } from 'next/router';

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

export default function Appointments({
  orte,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return <AppointmentsPage orte={orte} ortId={router.query.ortId as string} />;
}
