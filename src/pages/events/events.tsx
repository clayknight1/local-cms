// import { Calendar } from '@mantine/dates';
import { Button } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { Link, useLoaderData } from 'react-router';
import type { Event } from '../../types';

export default function Events() {
  const { events } = useLoaderData();

  console.log('EVENTS', events);
  return (
    <>
      <h1>Events!</h1>
      <DataTable<Event>
        records={events}
        columns={[
          {
            accessor: 'name',
            title: 'Name',
          },
          {
            accessor: 'organizer_name',
          },
          {
            accessor: 'date',
          },
          {
            accessor: 'actions',
            title: 'Actions',
            render: (event) => (
              <>
                <Button size='xs' component={Link} to={`/events/${event.id}`}>
                  Edit
                </Button>
                <Button size='xs' color='red'>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
