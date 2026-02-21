import type { EventFormValues } from '../../components/EventForm';
import EventForm from '../../components/EventForm';
import { addEvent } from '../../services/events.service';
import type { EventInsert } from '../../types';
import { useNavigate } from 'react-router';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';

export default function NewEvent() {
  const navigate = useNavigate();
  const mutation = useMutationWithNotifications({
    mutationFn: (data: EventInsert) => addEvent(data),
    invalidateKeys: [['events']],
    successTitle: 'Event Added!',
    onSuccess: () => navigate('/events'),
  });

  async function handleSubmit(values: EventFormValues): Promise<void> {
    const eventData: EventInsert = {
      ...values,
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
      <EventForm onSubmit={handleSubmit}></EventForm>
    </>
  );
}
