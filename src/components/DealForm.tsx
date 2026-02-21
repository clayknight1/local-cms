// components/DealForm.tsx
import {
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
  Stack,
  Select,
  Center,
  Loader,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import type { Deal, Business } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getBusinesses } from '../services/businesses.service';

export type DealFormValues = {
  deal_title: string;
  deal_description: string;
  terms: string;
  business_id: string;
  starts_at: string | null;
  expires_at: string | null;
  redemption_code: string;
  image_url: string;
  color: string;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
};

type DealFormProps = {
  deal?: Deal | null;
  businesses?: Business[];
  isError?: boolean;
  isPending?: boolean;
  error?: Error | null;
  onSubmit: (values: DealFormValues) => void;
};

export default function DealForm({
  deal,
  //   businesses,
  isError = false,
  isPending = false,
  error = null,
  onSubmit,
}: DealFormProps) {
  const { data: businesses } = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });

  const form = useForm<DealFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      deal_title: '',
      deal_description: '',
      terms: '',
      business_id: '',
      starts_at: null,
      expires_at: null,
      redemption_code: '',
      image_url: '',
      color: '',
      is_active: true,
      is_featured: false,
      is_new: false,
    },
  });

  useEffect(() => {
    if (deal) {
      form.setValues({
        deal_title: deal.deal_title || '',
        deal_description: deal.deal_description || '',
        terms: deal.terms || '',
        business_id: deal.business_id?.toString() || '',
        starts_at: deal.starts_at || null,
        expires_at: deal.expires_at || null,
        redemption_code: deal.redemption_code || '',
        image_url: deal.image_url || '',
        color: deal.color || '',
        is_active: deal.is_active ?? true,
        is_featured: deal.is_featured ?? false,
        is_new: deal.is_new ?? false,
      });
    }
  }, [deal]);

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
      <h1>{deal?.deal_title || 'New Deal'}</h1>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
              businesses?.map((business) => ({
                value: business.id.toString(),
                label: business.name,
              })) || []
            }
          />

          <Group grow>
            <DateInput
              {...form.getInputProps('starts_at')}
              key={form.key('starts_at')}
              label='Start Date'
              placeholder='Pick start date and time'
            />
            <DateInput
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
            <Button type='submit'>{deal ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}
