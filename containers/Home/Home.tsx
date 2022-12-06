import React from 'react';

interface HomeProps {}

export function HomePage(props: HomeProps) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-75'>
      <div>
        <div className='h2 pb-5'>Find Next Garbage Collection </div>

        <form className='d-flex'>
          <input
            className='flex-grow-1 form-control mr-1'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <button className='btn btn-outline-success' type='submit'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
