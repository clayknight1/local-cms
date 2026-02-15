import {
  TextInput,
  Textarea,
  NumberInput,
  Switch,
  Button,
  Group,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoaderData } from 'react-router';

export default function Restaurant() {
  const { restaurant } = useLoaderData();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
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
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Form values:', values);
    // TODO: Submit to Supabase
  };

  return (
    <>
      <h1>{restaurant?.name || 'New Business'}</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Button type='submit'>Save</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}
