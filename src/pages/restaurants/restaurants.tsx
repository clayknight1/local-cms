import { Button, Table } from '@mantine/core';
import { Link, useLoaderData } from 'react-router';
import type { Business } from '../../types';

export default function Restaurants() {
  const { restaurants } = useLoaderData();

  const restaurantData = restaurants.map((restaurant: Business) => (
    <Table.Tr key={restaurant.id}>
      <Table.Td>{restaurant.name}</Table.Td>
      <Table.Td>{restaurant.address}</Table.Td>
      <Table.Td>{restaurant.phone}</Table.Td>
      <Table.Td>
        <Button size='xs' component={Link} to={`/restaurants/${restaurant.id}`}>
          Edit
        </Button>
        <Button size='xs' color='red'>
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <h1>Total {restaurantData?.length}</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{restaurantData}</Table.Tbody>
      </Table>
    </>
  );
}
