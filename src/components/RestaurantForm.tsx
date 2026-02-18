import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import QueryState from './QueryState';
import {
  Button,
  Group,
  NumberInput,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import type { Business } from '../types';

export type RestaurantFormValues = {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website_url: string;
  business_type: string;
  price_range: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  logo_url: string;
  cover_image_url: string;
};

type RestaurantFormProps = {
  restaurant?: Business | null;
  isError?: boolean;
  isPending?: boolean;
  error?: Error | null;
  onSubmit: (values: RestaurantFormValues) => void;
};

export default function RestaurantForm({
  restaurant,
  isError = false,
  isPending = false,
  error = null,
  onSubmit,
}: RestaurantFormProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      email: '',
      website_url: '',
      business_type: '',
      price_range: '',
      latitude: 0,
      longitude: 0,
      is_active: true,
      logo_url: '',
      cover_image_url: '',
    },
  });

  useEffect(() => {
    if (restaurant) {
      form.setValues({
        name: restaurant?.name || '',
        description: restaurant?.description || '',
        address: restaurant?.address || '',
        city: restaurant?.city || '',
        state: restaurant?.state || '',
        zip: restaurant?.zip || '',
        phone: restaurant?.phone || '',
        email: restaurant?.email || '',
        website_url: restaurant?.website_url || '',
        business_type: restaurant?.business_type || '',
        price_range: restaurant?.price_range || '',
        latitude: restaurant?.latitude || 0,
        longitude: restaurant?.longitude || 0,
        is_active: restaurant?.is_active ?? true,
        logo_url: restaurant?.logo_url || '',
        cover_image_url: restaurant?.cover_image_url || '',
      });
    }
  }, [restaurant]);

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  return (
    <>
      <h1>{restaurant?.name || 'New Business'}</h1>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap='md'>
          <TextInput
            {...form.getInputProps('name')}
            key={form.key('name')}
            label='Name'
            placeholder='Business Name'
            required
          />

          <Textarea
            {...form.getInputProps('description')}
            key={form.key('description')}
            label='Description'
            placeholder='Brief description'
            minRows={3}
          />

          <TextInput
            {...form.getInputProps('business_type')}
            key={form.key('business_type')}
            label='Business Type'
            placeholder='e.g., Restaurant, Bar, Cafe'
          />

          <TextInput
            {...form.getInputProps('address')}
            key={form.key('address')}
            label='Address'
            placeholder='Street Address'
            required
          />

          <Group grow>
            <TextInput
              {...form.getInputProps('city')}
              key={form.key('city')}
              label='City'
              placeholder='City'
            />
            <TextInput
              {...form.getInputProps('state')}
              key={form.key('state')}
              label='State'
              placeholder='State'
            />
            <TextInput
              {...form.getInputProps('zip')}
              key={form.key('zip')}
              label='ZIP'
              placeholder='ZIP Code'
            />
          </Group>

          <Group grow>
            <NumberInput
              {...form.getInputProps('latitude')}
              key={form.key('latitude')}
              label='Latitude'
              placeholder='Latitude'
              decimalScale={6}
              required
            />
            <NumberInput
              {...form.getInputProps('longitude')}
              key={form.key('longitude')}
              label='Longitude'
              placeholder='Longitude'
              decimalScale={6}
              required
            />
          </Group>

          <Group grow>
            <TextInput
              {...form.getInputProps('phone')}
              key={form.key('phone')}
              label='Phone'
              placeholder='(555) 123-4567'
            />
            <TextInput
              {...form.getInputProps('email')}
              key={form.key('email')}
              label='Email'
              placeholder='contact@business.com'
              type='email'
            />
          </Group>

          <TextInput
            {...form.getInputProps('website_url')}
            key={form.key('website_url')}
            label='Website'
            placeholder='https://example.com'
          />

          <TextInput
            {...form.getInputProps('price_range')}
            key={form.key('price_range')}
            label='Price Range'
            placeholder='e.g., $, $$, $$$'
          />

          <TextInput
            {...form.getInputProps('logo_url')}
            key={form.key('logo_url')}
            label='Logo URL'
            placeholder='https://example.com/logo.png'
          />

          <TextInput
            {...form.getInputProps('cover_image_url')}
            key={form.key('cover_image_url')}
            label='Cover Image URL'
            placeholder='https://example.com/cover.jpg'
          />

          <Switch
            {...form.getInputProps('is_active', { type: 'checkbox' })}
            key={form.key('is_active')}
            label='Active'
          />

          <Group justify='flex-end' mt='md'>
            <Button type='submit' disabled={!form.isDirty()}>
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}
