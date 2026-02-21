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

export default function Event() {
  const { id } = useParams();
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
    queryFn: getBusinesses,
  });

  const mutation = useMutationWithNotifications({
    mutationFn: (data: EventUpdate) => updateEvent(Number(id), data),
    invalidateKeys: [['event'], ['event', id!]],
    successTitle: 'Deal Updated!',
    onSuccess: () => navigate('/events'),
  });

  async function handleSubmit(values: EventFormValues): Promise<void> {
    const eventData: EventUpdate = {
      ...values,
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
      ></EventForm>
    </>
  );
}
