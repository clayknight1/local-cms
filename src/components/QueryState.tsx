type QueryStateType = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

import { Center, Loader } from '@mantine/core';

export default function QueryState({
  isPending,
  isError,
  error,
}: QueryStateType) {
  if (isPending) {
    return (
      <Center h='50vh'>
        <Loader color='blue'></Loader>
      </Center>
    );
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }
}
