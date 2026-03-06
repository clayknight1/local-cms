import type { EventFormValues } from '../../components/EventForm';
import EventForm from '../../components/EventForm';
import { addEvent } from '../../services/events.service';
import type { EventInsert } from '../../types';
import { useNavigate } from 'react-router';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';
import { useState } from 'react';
import ImageUpload from '../../components/ImageUpload';
import { uploadImage } from '../../services/storage.service';
import { notifications } from '@mantine/notifications';

export default function NewEvent() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const mutation = useMutationWithNotifications({
    mutationFn: (data: EventInsert) => addEvent(data),
    invalidateKeys: [['events']],
    successTitle: 'Event Added!',
    onSuccess: () => navigate('/events'),
  });

  async function handleSubmit(values: EventFormValues): Promise<void> {
    let imageUrl = values.image_url;

    if (imageUpload) {
      try {
        imageUrl = await uploadImage(imageUpload, 'events');
      } catch {
        notifications.show({
          title: 'Error',
          message: 'Could not upload image. Please try again',
          color: 'red',
        });
        return;
      }
    }

    const eventData: EventInsert = {
      ...values,
      image_url: imageUrl,
      business_id: values.business_id ? Number(values.business_id) : null,
      date: values.date, // Date object to string
      recurrence_end_date: values.recurrence_end_date
        ? values.recurrence_end_date.toISOString().split('T')[0]
        : null,
    };
    mutation.mutate(eventData);
  }

  return (
    <>
      <EventForm onSubmit={handleSubmit} />
      <ImageUpload label='Cover Image' onFileSelect={setImageUpload} />
    </>
  );
}
