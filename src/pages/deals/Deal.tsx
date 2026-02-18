import {
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
  Stack,
  Select,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import type { Business } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getDealById } from '../../services/deals.service';
import { getBusinesses } from '../../services/businesses.service';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import QueryState from '../../components/QueryState';

export default function Deal() {
  const { id } = useParams();
  const {
    isPending,
    isError,
    data: deal,
    error,
  } = useQuery({ queryKey: ['deal'], queryFn: () => getDealById(Number(id)) });
  const { data: businesses } = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      deal_title: '',
      deal_description: '',
      terms: deal?.terms || '',
      business_id: '',
      starts_at: new Date(),
      expires_at: new Date(),
      redemption_code: '',
      image_url: '',
      color: deal?.color || '',
      is_active: true,
      is_featured: false,
      is_new: false,
    },
  });

  useEffect(() => {
    form.setValues({
      deal_title: deal?.deal_title || '',
      deal_description: deal?.deal_description || '',
      terms: deal?.terms || '',
      business_id: deal?.business_id?.toString() || '',
      starts_at: deal?.starts_at ? new Date(deal.starts_at) : new Date(),
      expires_at: deal?.expires_at ? new Date(deal.expires_at) : new Date(),
      redemption_code: deal?.redemption_code || '',
      image_url: deal?.image_url || '',
      color: deal?.color || '',
      is_active: deal?.is_active ?? true,
      is_featured: deal?.is_featured ?? false,
      is_new: deal?.is_new ?? false,
    });
  }, [deal]);

  const handleSubmit = (values: typeof form.values) => {
    console.log('Form values:', values);
    // TODO: Submit to Supabase
  };

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  return (
    <>
      <h1>{deal?.deal_title || 'New Deal'}</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap='md'>
          <TextInput
            {...form.getInputProps('deal_title')}
            key={form.key('deal_title')}
            label='Deal Title'
            placeholder='50% Off Happy Hour'
            required
          />

          <Textarea
            {...form.getInputProps('deal_description')}
            key={form.key('deal_description')}
            label='Description'
            placeholder='Describe the deal'
            minRows={3}
          />

          <Select
            {...form.getInputProps('business_id')}
            key={form.key('business_id')}
            label='Business'
            placeholder='Select a business'
            data={
              businesses?.map((business: Business) => ({
                value: business.id.toString(),
                label: business.name,
              })) || []
            }
          />

          <Group grow>
            <DateTimePicker
              {...form.getInputProps('starts_at')}
              key={form.key('starts_at')}
              label='Start Date'
              placeholder='Pick start date and time'
            />
            <DateTimePicker
              {...form.getInputProps('expires_at')}
              key={form.key('expires_at')}
              label='Expiration Date'
              placeholder='Pick expiration date and time'
              required
            />
          </Group>

          <TextInput
            {...form.getInputProps('redemption_code')}
            key={form.key('redemption_code')}
            label='Redemption Code'
            placeholder='SAVE50'
          />

          <Textarea
            {...form.getInputProps('terms')}
            key={form.key('terms')}
            label='Terms & Conditions'
            placeholder='Valid on weekdays only, one per customer, etc.'
            minRows={2}
          />

          <TextInput
            {...form.getInputProps('image_url')}
            key={form.key('image_url')}
            label='Image URL'
            placeholder='https://example.com/deal-image.jpg'
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
              {...form.getInputProps('is_new', { type: 'checkbox' })}
              key={form.key('is_new')}
              label='New'
            />
          </Group>

          <Group justify='flex-end' mt='md'>
            <Button type='submit'>Save</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}
