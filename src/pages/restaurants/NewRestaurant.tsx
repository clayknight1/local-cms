import RestaurantForm, {
  type RestaurantFormValues,
} from '../../components/RestaurantForm';
import { addBusiness } from '../../services/restaurants.service';

export default function NewRestaurant() {
  async function handleSubmit(values: RestaurantFormValues): Promise<void> {
    addBusiness(values);
  }

  return (
    <>
      <RestaurantForm onSubmit={handleSubmit}></RestaurantForm>
    </>
  );
}
