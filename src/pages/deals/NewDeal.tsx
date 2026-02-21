import DealForm, { type DealFormValues } from '../../components/DealForm';
import { addDeal } from '../../services/deals.service';
import type { DealInsert } from '../../types';
import { useMutationWithNotifications } from '../../hooks/useMutationWithNotifications';
import { useNavigate } from 'react-router';

export default function NewDeal() {
  const navigate = useNavigate();
  const mutation = useMutationWithNotifications({
    mutationFn: (data: DealInsert) => addDeal(data),
    invalidateKeys: [['deals']],
    successTitle: 'Deal Added!',
    onSuccess: () => navigate('/deals'),
  });

  async function handleSubmit(values: DealFormValues): Promise<void> {
    const dealData: DealInsert = {
      ...values,
      business_id: Number(values.business_id),
      starts_at: values.starts_at || null,
      expires_at: values.expires_at!,
    };
    mutation.mutate(dealData);
  }
  return (
    <>
      <DealForm onSubmit={handleSubmit}></DealForm>
    </>
  );
}
