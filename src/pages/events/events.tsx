// import { Calendar } from '@mantine/dates';
import { Button, Center, Container, Group, Loader, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router';
import type { Event } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../services/events.service';
import { useMemo } from 'react';

export default function Events() {
  const {
    isPending,
    isError,
    data: events,
    error,
  } = useQuery<Event[] | null>({
    queryKey: ['events'],
    queryFn: getEvents,
    staleTime: 5 * 60 * 1000,
  });
  const records = useMemo(() => events || [], [events]);

  function handleAddEvent(): void {}

  if (isPending) {
    return (
      <Center h='50vh'>
        <Loader color='blue'></Loader>
      </Center>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container size='xl' py='md'>
      <Group justify='space-between' mb='lg'>
        <Title order={1}>{events?.length} Events</Title>

        <Button leftSection={<span>+</span>} onClick={handleAddEvent}>
          Add Event
        </Button>
      </Group>
      <DataTable<Event>
        records={records}
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
    </Container>
  );
}
