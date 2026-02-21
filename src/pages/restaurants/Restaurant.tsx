import {
  getBusinessById,
  updateBusiness,
} from '../../services/restaurants.service';
import type { Business, BusinessUpdate } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import QueryState from '../../components/QueryState';
import RestaurantForm, {
  type RestaurantFormValues,
} from '../../components/RestaurantForm';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isPending,
    isError,
    data: restaurant,
    error,
  } = useQuery<Business | null>({
    queryKey: ['restaurant', id],
    queryFn: () => getBusinessById(Number(id)),
  });

  const mutation = useMutationWithNotifications({
    mutationFn: (data: BusinessUpdate) => updateBusiness(Number(id), data),
    invalidateKeys: [['restaurants'], ['restaurant', id!]],
    successTitle: 'Restaurant Updated!',
    onSuccess: () => navigate('/restaurants'),
  });

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  async function handleSubmit(values: RestaurantFormValues) {
    const dbValues = {
      ...values,
      business_type_id: values.business_type_id
        ? Number(values.business_type_id)
        : null,
    };
    mutation.mutate(dbValues);
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
