import { Link } from 'react-router';
import { Badge, Button, Container, Group, Table, Title } from '@mantine/core';
import { getDeals, type DealWithBusiness } from '../../services/deals.service';
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

  const dealsData = deals?.map((deal: DealWithBusiness) => {
    return (
      <Table.Tr key={deal.id}>
        <Table.Td>{deal.deal_title}</Table.Td>
        <Table.Td>
          <Badge color={deal.is_active ? 'green' : 'gray'}>
            {deal.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </Table.Td>
        <Table.Td>
          {new Date(deal.expires_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Table.Td>
        <Table.Td>{deal.businesses?.name || 'N/A'}</Table.Td>
        <Table.Td>
          <Group gap='xs'>
            <Button size='xs' component={Link} to={`/deals/${deal.id}`}>
              Edit
            </Button>
            <Button size='xs' color='red'>
              Delete
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container size='xl' py='md'>
      <Group justify='space-between' mb='lg'>
        <Title order={1}>{deals?.length} Deals</Title>
        <Button leftSection={<span>+</span>} component={Link} to='/deals/new'>
          Add Deal
        </Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Expires</Table.Th>
            <Table.Th>Business</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{dealsData}</Table.Tbody>
      </Table>
    </Container>
  );
}
