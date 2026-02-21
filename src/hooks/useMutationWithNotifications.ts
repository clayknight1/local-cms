import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useMutationWithNotifications<TData, TVariables>({
  mutationFn,
  invalidateKeys,
  successTitle = 'Success!',
  successMessage = 'Operation completed',
  onSuccess,
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys?: string[][];
  successTitle?: string;
  successMessage?: string;
  onSuccess?: (data: TData) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Invalidate queries
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      // Show notification
      notifications.show({
        title: successTitle,
        message: successMessage,
        color: 'green',
      });

      // Call custom callback if provided
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });
}
