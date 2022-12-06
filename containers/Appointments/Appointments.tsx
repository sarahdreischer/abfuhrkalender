import React from 'react';
import { Card } from '../../components';
import cn from 'classnames';
import styles from './Appointments.module.scss';

export function AppointmentsPage() {
  return (
    <div className='d-flex h-100 w-100 py-5 px-4'>
      <div className={cn(styles.sidebar, 'me-3')}>
        <Card>
          <div>Card Content</div>
        </Card>
      </div>
      <div className='flex-grow-1'>
        <Card>
          <div>The Rest</div>
        </Card>
      </div>
    </div>
  );
}
