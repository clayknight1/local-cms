import { Link, useLoaderData } from 'react-router';
import type { Deal } from '../../types';
import { Button, Table } from '@mantine/core';

export default function Deals() {
  const { deals } = useLoaderData();
  console.log('DEALS', deals);

  const dealsData = deals.map((deal: Deal) => {
    return (
      <Table.Tr key={deal.id}>
        <Table.Td>{deal.deal_title}</Table.Td>
        <Table.Td>{deal.is_active}</Table.Td>
        <Table.Td>{deal.expires_at}</Table.Td>
        <Table.Td>{deal.category_id}</Table.Td>
        <Table.Td>
          <Button size='xs' component={Link} to={`/restaurants/${deal.id}`}>
            Edit
          </Button>
          <Button size='xs' color='red'>
            Delete
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <>
      <h1>Deals</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{dealsData}</Table.Tbody>
      </Table>
    </>
  );
}
