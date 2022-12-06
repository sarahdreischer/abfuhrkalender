import { useRouter } from 'next/router';
import React from 'react';

interface HomeProps {}

export function HomePage(props: HomeProps) {
  const router = useRouter();

  function onSearchSubmit() {
    router.push('/appointments');
  }

  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100'>
      <div className='w-50'>
        <div className='h2 text-center pb-5'>Find out when your Garbage is next collected </div>

        <form className='d-flex'>
          <input className='flex-grow-1 form-control me-2' type='search' placeholder='Postcode' />
          <button className='btn btn-outline-success' type='submit' onClick={onSearchSubmit}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
