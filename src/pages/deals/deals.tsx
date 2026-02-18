import { Link } from 'react-router';
import type { Deal } from '../../types';
import { Button, Container, Group, Table, Title } from '@mantine/core';
import { getDeals } from '../../services/deals.service';
import { useQuery } from '@tanstack/react-query';
import QueryState from '../../components/QueryState';

export default function Deals() {
  const {
    isPending,
    isError,
    data: deals,
    error,
  } = useQuery({ queryKey: ['deals'], queryFn: getDeals });

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }
  async function handleAddDeal(): Promise<void> {}

  const dealsData = deals?.map((deal: Deal) => {
    return (
      <Table.Tr key={deal.id}>
        <Table.Td>{deal.deal_title}</Table.Td>
        <Table.Td>{deal.is_active}</Table.Td>
        <Table.Td>{deal.expires_at}</Table.Td>
        <Table.Td>{deal.category_id}</Table.Td>
        <Table.Td>
          <Button size='xs' component={Link} to={`/deals/${deal.id}`}>
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
    <Container size='xl' py='md'>
      <Group justify='space-between' mb='lg'>
        <Title order={1}>{deals?.length} Deals</Title>

        <Button leftSection={<span>+</span>} onClick={handleAddDeal}>
          Add Deal
        </Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{dealsData}</Table.Tbody>
      </Table>
    </Container>
  );
}
