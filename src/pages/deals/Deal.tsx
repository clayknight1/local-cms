import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { getDealById, updateDeal } from '../../services/deals.service';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import QueryState from '../../components/QueryState';
import DealForm, { type DealFormValues } from '../../components/DealForm';
import type { DealInsert, DealUpdate } from '../../types';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';

export default function Deal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isPending,
    isError,
    data: deal,
    error,
  } = useQuery({ queryKey: ['deal'], queryFn: () => getDealById(Number(id)) });
  const mutation = useMutationWithNotifications({
    mutationFn: (data: DealUpdate) => updateDeal(Number(id), data),
    invalidateKeys: [['deals'], ['deal', id!]],
    successTitle: 'Deal Updated!',
    onSuccess: () => navigate('/deals'),
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

  async function handleSubmit(values: DealFormValues) {
    const dealData: DealInsert = {
      ...values,
      business_id: Number(values.business_id),
      starts_at: values.starts_at || null,
      expires_at: values.expires_at!,
    };

    mutation.mutate(dealData);
  }

  if (isError || isPending) {
    return <QueryState isError={isError} isPending={isPending} error={error} />;
  }

  return (
    <>
      <DealForm
        deal={deal}
        isError={isError}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
      ></DealForm>
    </>
  );
}
