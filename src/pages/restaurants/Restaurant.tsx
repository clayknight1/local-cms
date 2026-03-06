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
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { uploadImage } from '../../services/storage.service';

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
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  function setImageFile(file: File | null) {
    setImageUpload(file);
  }

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
        restaurant={restaurant}
        isError={isError}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
        onFileSelect={setImageFile}
        existingImageUrl={restaurant?.cover_image_url}
      />
      {/* <ImageUpload
        key={restaurant?.id}
        label='Cover Image'
        existingImageUrl={restaurant?.cover_image_url}
        onFileSelect={setImageFile}
      ></ImageUpload> */}
    </>
  );
}
