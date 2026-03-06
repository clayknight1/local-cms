import RestaurantForm, {
  type RestaurantFormValues,
} from '../../components/RestaurantForm';
import { addBusiness } from '../../services/restaurants.service';
import { useNavigate } from 'react-router';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';
import type { BusinessInsert } from '../../types';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { uploadImage } from '../../services/storage.service';

export default function NewRestaurant() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const mutation = useMutationWithNotifications({
    mutationFn: (data: BusinessInsert) => addBusiness(data),
    invalidateKeys: [['restaurants']],
    successTitle: 'Restaurant Added!',
    onSuccess: () => navigate('/restaurants'),
  });
  function setImageFile(file: File | null) {
    setImageUpload(file);
  }
  async function handleSubmit(values: RestaurantFormValues): Promise<void> {
    let coverImageUrl = values.cover_image_url;

    if (imageUpload) {
      try {
        coverImageUrl = await uploadImage(imageUpload, 'restaurants');
      } catch {
        notifications.show({
          title: 'Error',
          message: 'Could not upload image. Please try again',
          color: 'red',
        });
        return;
      }
    }

    const dbValues = {
      ...values,
      cover_image_url: coverImageUrl,
      business_type_id: values.business_type_id
        ? Number(values.business_type_id)
        : null,
    };
    mutation.mutate(dbValues);
  }

  return (
    <>
      <RestaurantForm
        onSubmit={handleSubmit}
        onFileSelect={setImageFile}
      ></RestaurantForm>
      {/* <ImageUpload
        label='Cover Image'
        onFileSelect={setImageFile}
      ></ImageUpload> */}
    </>
  );
}
