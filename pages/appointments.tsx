import React from 'react';
import { AppointmentsPage } from '../containers';
import { Ort, Orte, Region } from '../types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchData } from '../utils/fetcher';

const regionen: Region[] = [
  'aachen',
  'zew2',
  'aw-bgl2',
  'bav',
  'din',
  'dorsten',
  'gt2',
  'hlv',
  'coe',
  'krhs',
  'pi',
  'krwaf',
  'lindlar',
  'stl',
  'nds',
  'nuernberg',
  'roe',
  'solingen',
  'wml2',
];

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59');

  const getOrte = regionen.map((region) =>
    fetchData<Ort[]>(`http://localhost:3000/api/orte?region=${region}`, 'GET').then((ortsList) => ({
      region,
      ortsList,
    })),
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
  return <AppointmentsPage orte={orte} />;
}
