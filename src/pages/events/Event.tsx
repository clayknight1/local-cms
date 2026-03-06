import { useNavigate, useParams } from 'react-router';
import {
  getEventById,
  updateEvent,
  type EventWithBusiness,
} from '../../services/events.service';
import { useQuery } from '@tanstack/react-query';
import QueryState from '../../components/QueryState';
import { getBusinesses } from '../../services/businesses.service';
import EventForm, { type EventFormValues } from '../../components/EventForm';
import type { EventUpdate } from '../../types';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';
import ImageUpload from '../../components/ImageUpload';
import { useState } from 'react';
import { uploadImage } from '../../services/storage.service';
import { notifications } from '@mantine/notifications';

export default function Event() {
  const { id } = useParams();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const navigate = useNavigate();
  const {
    isPending,
    isError,
    data: event,
    error,
  } = useQuery<EventWithBusiness | null>({
    queryKey: ['event', id],
    queryFn: () => getEventById(Number(id)),
  });

  const { data: businesses } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => getBusinesses(),
  });

  const mutation = useMutationWithNotifications({
    mutationFn: (data: EventUpdate) => updateEvent(Number(id), data),
    invalidateKeys: [['event'], ['event', id!]],
    successTitle: 'Deal Updated!',
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

    const eventData: EventUpdate = {
      ...values,
      image_url: imageUrl,
      business_id: values.business_id ? Number(values.business_id) : null,
      date: values.date,
      recurrence_end_date: values.recurrence_end_date
        ? values.recurrence_end_date.toISOString().split('T')[0]
        : null,
    };

    mutation.mutate(eventData);
  }

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  return (
    <>
      <EventForm
        event={event}
        businesses={businesses}
        isError={isError}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
      />
      <ImageUpload
        key={event?.id}
        label='Cover Image'
        existingImageUrl={event?.image_url}
        onFileSelect={setImageUpload}
      ></ImageUpload>
    </>
  );
}
