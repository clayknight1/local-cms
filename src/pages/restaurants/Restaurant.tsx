import {
  getBusinessById,
  updateBusiness,
} from '../../services/restaurants.service';
import { notifications } from '@mantine/notifications';
import type { Business } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import QueryState from '../../components/QueryState';
import RestaurantForm, {
  type RestaurantFormValues,
} from '../../components/RestaurantForm';

export default function Restaurant() {
  const { id } = useParams();
  const {
    isPending,
    isError,
    data: restaurant,
    error,
  } = useQuery<Business | null>({
    queryKey: ['event', id],
    queryFn: () => getBusinessById(Number(id)),
  });

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  async function handleSubmit(values: RestaurantFormValues) {
    await updateBusiness(Number(id), values);
    notifications.show({ title: 'Update Successful!', message: 'Nice Work' });
  }

  return (
    <RestaurantForm
      restaurant={restaurant}
      isError={isError}
      isPending={isPending}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}
