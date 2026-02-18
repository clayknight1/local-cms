import { Button, Container, Group, Table, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router';
import type { Business } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../../services/restaurants.service';
import QueryState from '../../components/QueryState';

export default function Restaurants() {
  const {
    isPending,
    isError,
    data: restaurants,
    error,
  } = useQuery({ queryKey: ['restaurants'], queryFn: getRestaurants });
  const navigate = useNavigate();

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  function handleAddRestaurant(): void {
    navigate('/restaurants/new');
  }

  const restaurantData = restaurants?.map((restaurant: Business) => (
    <Table.Tr key={restaurant.id}>
      <Table.Td>{restaurant.name}</Table.Td>
      <Table.Td>{restaurant.address}</Table.Td>
      <Table.Td>{restaurant.phone}</Table.Td>
      <Table.Td>
        <Group justify='flex-end' gap='xs'>
          <Button
            size='xs'
            component={Link}
            to={`/restaurants/${restaurant.id}`}
          >
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
        <Title order={1}>{restaurantData?.length} Restaurants</Title>

        <Button leftSection={<span>+</span>} onClick={handleAddRestaurant}>
          Add Restaurant
        </Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{restaurantData}</Table.Tbody>
      </Table>
    </Container>
  );
}
