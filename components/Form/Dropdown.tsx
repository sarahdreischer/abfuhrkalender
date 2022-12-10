interface DropdownProps {
  label: string;
  values: string[];
}

export function Dropdown({ label, values }: DropdownProps) {
  return (
    <div className='dropdown w-100'>
      <button
        className='btn btn-secondary dropdown-toggle w-100'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Dropdown button
      </button>
      <ul className='dropdown-menu'>
        <li>
          <a className='dropdown-item' href='#'>
            Action
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            Another action
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
}
