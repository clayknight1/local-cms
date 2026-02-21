// import { Calendar } from '@mantine/dates';
import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Table,
  Title,
} from '@mantine/core';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  getEvents,
  type EventWithBusiness,
} from '../../services/events.service';

export default function Events() {
  const {
    isPending,
    isError,
    data: events,
    error,
  } = useQuery<EventWithBusiness[] | null>({
    queryKey: ['events'],
    queryFn: getEvents,
    staleTime: 5 * 60 * 1000,
  });

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

  const eventsData = events?.map((event) => (
    <Table.Tr key={event.id}>
      <Table.Td>{event.name}</Table.Td>
      <Table.Td>
        {new Date(event.date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Table.Td>
      <Table.Td>{event.location_name || 'N/A'}</Table.Td>
      <Table.Td>
        {event.businesses?.name || event.organizer_name || 'N/A'}
      </Table.Td>
      <Table.Td style={{ minWidth: 100 }}>
        <Badge color={event.is_active ? 'green' : 'gray'}>
          {event.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap='xs' wrap='nowrap'>
          <Button size='xs' component={Link} to={`/events/${event.id}`}>
            Edit
          </Button>
          <Button size='xs' color='red'>
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size='xl' py='md'>
      <Group justify='space-between' mb='lg'>
        <Title order={1}>{events?.length} Events</Title>
        <Button leftSection={<span>+</span>} component={Link} to='/events/new'>
          Add Event
        </Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Event Name</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Organizer</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{eventsData}</Table.Tbody>
      </Table>
    </Container>
  );
}
