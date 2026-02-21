import RestaurantForm, {
  type RestaurantFormValues,
} from '../../components/RestaurantForm';
import { addBusiness } from '../../services/restaurants.service';
import { useNavigate } from 'react-router';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';
import type { BusinessInsert } from '../../types';

export default function NewRestaurant() {
  const navigate = useNavigate();
  const mutation = useMutationWithNotifications({
    mutationFn: (data: BusinessInsert) => addBusiness(data),
    invalidateKeys: [['restaurants']],
    successTitle: 'Restaurant Added!',
    onSuccess: () => navigate('/restaurants'),
  });
  async function handleSubmit(values: RestaurantFormValues): Promise<void> {
    const dbValues = {
      ...values,
      business_type_id: values.business_type_id
        ? Number(values.business_type_id)
        : null,
    };
    mutation.mutate(dbValues);
  }

  return (
    <>
      <RestaurantForm onSubmit={handleSubmit}></RestaurantForm>
    </>
  );
}
