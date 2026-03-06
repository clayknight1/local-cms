import DealForm, { type DealFormValues } from '../../components/DealForm';
import { addDeal } from '../../services/deals.service';
import type { DealInsert } from '../../types';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';
import { useNavigate } from 'react-router';
import ImageUpload from '../../components/ImageUpload';
import { useState } from 'react';
import { uploadImage } from '../../services/storage.service';
import { notifications } from '@mantine/notifications';

export default function NewDeal() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const mutation = useMutationWithNotifications({
    mutationFn: (data: DealInsert) => addDeal(data),
    invalidateKeys: [['deals']],
    successTitle: 'Deal Added!',
    onSuccess: () => navigate('/deals'),
  });

  async function handleSubmit(values: DealFormValues): Promise<void> {
    let imageUrl = values.image_url;

    if (imageUpload) {
      try {
        imageUrl = await uploadImage(imageUpload, 'restaurants');
      } catch {
        notifications.show({
          title: 'Error',
          message: 'Could not upload image. Please try again',
          color: 'red',
        });
        return;
      }
    }

    const dealData: DealInsert = {
      ...values,
      image_url: imageUrl,
      business_id: Number(values.business_id),
      starts_at: values.starts_at || null,
      expires_at: values.expires_at!,
    };
    mutation.mutate(dealData);
  }
  return (
    <>
      <DealForm onSubmit={handleSubmit}></DealForm>
      <ImageUpload
        label='Cover Image - Will fallback to business image if image not added'
        onFileSelect={setImageUpload}
      ></ImageUpload>
    </>
  );
}
