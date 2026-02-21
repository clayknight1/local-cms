// components/EventForm.tsx
import {
  TextInput,
  Textarea,
  NumberInput,
  Switch,
  Button,
  Group,
  Stack,
  Select,
  Center,
  Loader,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import type { Event, Business } from '../types';

export type EventFormValues = {
  name: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location_name: string;
  address: string;
  latitude: number;
  longitude: number;
  organizer_name: string;
  business_id: string;
  price: string;
  registration_url: string;
  image_url: string;
  color: string;
  is_active: boolean;
  is_featured: boolean;
  is_recurring: boolean;
  is_cancelled: boolean;
  recurrence_pattern: string;
  recurrence_day: string;
  recurrence_end_date: Date | null;
};

type EventFormProps = {
  event?: Event | null;
  businesses?: Business[];
  isError?: boolean;
  isPending?: boolean;
  error?: Error | null;
  onSubmit: (values: EventFormValues) => void;
};

export default function EventForm({
  event,
  businesses,
  isError = false,
  isPending = false,
  error = null,
  onSubmit,
}: EventFormProps) {
  const form = useForm<EventFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      date: '',
      start_time: '',
      end_time: '',
      location_name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      organizer_name: '',
      business_id: '',
      price: '',
      registration_url: '',
      image_url: '',
      color: '',
      is_active: true,
      is_featured: false,
      is_recurring: false,
      is_cancelled: false,
      recurrence_pattern: '',
      recurrence_day: '',
      recurrence_end_date: null,
    },
  });

  useEffect(() => {
    if (event) {
      form.setValues({
        name: event.name || '',
        description: event.description || '',
        date: event.date || '',
        start_time: event.start_time || '',
        end_time: event.end_time || '',
        location_name: event.location_name || '',
        address: event.address || '',
        latitude: event.latitude || 0,
        longitude: event.longitude || 0,
        organizer_name: event.organizer_name || '',
        business_id: event.business_id?.toString() || '',
        price: event.price || '',
        registration_url: event.registration_url || '',
        image_url: event.image_url || '',
        color: event.color || '',
        is_active: event.is_active ?? true,
        is_featured: event.is_featured ?? false,
        is_recurring: event.is_recurring ?? false,
        is_cancelled: event.is_cancelled ?? false,
        recurrence_pattern: event.recurrence_pattern || '',
        recurrence_day: event.recurrence_day || '',
        recurrence_end_date: event.recurrence_end_date
          ? new Date(event.recurrence_end_date)
          : null,
      });
    }
  }, [event]);

  if (isError || isPending) {
    return (
      <Center h='50vh'>
        {isPending ? (
          <Loader color='blue' />
        ) : (
          <span>Error: {error?.message}</span>
        )}
      </Center>
    );
  }

  return (
    <>
      <h1>{event?.name || 'New Event'}</h1>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap='md'>
          <TextInput
            {...form.getInputProps('name')}
            key={form.key('name')}
            label='Event Name'
            placeholder='Live Music Night'
            required
          />

          <Textarea
            {...form.getInputProps('description')}
            key={form.key('description')}
            label='Description'
            placeholder='Event description'
            minRows={3}
          />

          <Group grow>
            <DateInput
              {...form.getInputProps('date')}
              key={form.key('date')}
              label='Date'
              placeholder='Pick date'
              required
            />
            <TimeInput
              {...form.getInputProps('start_time')}
              key={form.key('start_time')}
              label='Start Time'
              placeholder='7:00 PM'
            />
            <TimeInput
              {...form.getInputProps('end_time')}
              key={form.key('end_time')}
              label='End Time'
              placeholder='10:00 PM'
            />
          </Group>

          <TextInput
            {...form.getInputProps('location_name')}
            key={form.key('location_name')}
            label='Location Name'
            placeholder='The Brewery'
          />

          <TextInput
            {...form.getInputProps('address')}
            key={form.key('address')}
            label='Address'
            placeholder='123 Main St, Oceanside, CA'
          />

          <Group grow>
            <NumberInput
              {...form.getInputProps('latitude')}
              key={form.key('latitude')}
              label='Latitude'
              placeholder='33.1959'
              decimalScale={6}
            />
            <NumberInput
              {...form.getInputProps('longitude')}
              key={form.key('longitude')}
              label='Longitude'
              placeholder='-117.3795'
              decimalScale={6}
            />
          </Group>

          <Group grow>
            <TextInput
              {...form.getInputProps('organizer_name')}
              key={form.key('organizer_name')}
              label='Organizer Name'
              placeholder='Event organizer'
            />
            <Select
              {...form.getInputProps('business_id')}
              key={form.key('business_id')}
              label='Associated Business'
              placeholder='Select a business'
              data={
                businesses?.map((b) => ({
                  value: b.id.toString(),
                  label: b.name,
                })) || []
              }
              clearable
            />
          </Group>

          <Group grow>
            <TextInput
              {...form.getInputProps('price')}
              key={form.key('price')}
              label='Price'
              placeholder='Free, $10, $20-$30'
            />
            <TextInput
              {...form.getInputProps('registration_url')}
              key={form.key('registration_url')}
              label='Registration URL'
              placeholder='https://eventbrite.com/...'
            />
          </Group>

          <TextInput
            {...form.getInputProps('image_url')}
            key={form.key('image_url')}
            label='Image URL'
            placeholder='https://example.com/event-image.jpg'
          />

          <TextInput
            {...form.getInputProps('color')}
            key={form.key('color')}
            label='Color'
            placeholder='#FF6B35'
          />

          <Group>
            <Switch
              {...form.getInputProps('is_active', { type: 'checkbox' })}
              key={form.key('is_active')}
              label='Active'
            />
            <Switch
              {...form.getInputProps('is_featured', { type: 'checkbox' })}
              key={form.key('is_featured')}
              label='Featured'
            />
            <Switch
              {...form.getInputProps('is_recurring', { type: 'checkbox' })}
              key={form.key('is_recurring')}
              label='Recurring'
            />
            <Switch
              {...form.getInputProps('is_cancelled', { type: 'checkbox' })}
              key={form.key('is_cancelled')}
              label='Cancelled'
            />
          </Group>

          {form.values.is_recurring && (
            <Stack
              gap='sm'
              p='md'
              style={{ backgroundColor: '#f8f9fa', borderRadius: 8 }}
            >
              <Group grow>
                <Select
                  {...form.getInputProps('recurrence_pattern')}
                  key={form.key('recurrence_pattern')}
                  label='Recurrence Pattern'
                  placeholder='Select pattern'
                  data={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                  ]}
                />
                <Select
                  {...form.getInputProps('recurrence_day')}
                  key={form.key('recurrence_day')}
                  label='Day of Week'
                  placeholder='Select day'
                  data={[
                    { value: 'monday', label: 'Monday' },
                    { value: 'tuesday', label: 'Tuesday' },
                    { value: 'wednesday', label: 'Wednesday' },
                    { value: 'thursday', label: 'Thursday' },
                    { value: 'friday', label: 'Friday' },
                    { value: 'saturday', label: 'Saturday' },
                    { value: 'sunday', label: 'Sunday' },
                  ]}
                />
              </Group>
              <DateInput
                {...form.getInputProps('recurrence_end_date')}
                key={form.key('recurrence_end_date')}
                label='Recurrence End Date'
                placeholder='When does this series end?'
                clearable
              />
            </Stack>
          )}

          <Group justify='flex-end' mt='md'>
            <Button type='submit'>{event ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}
