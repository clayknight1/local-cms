// routes/login.tsx
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { email: '', password: '' },
  });

  const handleLogin = async (values: typeof form.values) => {
    const { error } = await supabase.auth.signInWithPassword(values);
    if (!error) navigate('/');
  };

  return (
    <Stack gap='md' maw={400} mx='auto' mt={100}>
      <h1>CMS Login</h1>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Stack>
          <TextInput {...form.getInputProps('email')} label='Email' />
          <PasswordInput {...form.getInputProps('password')} label='Password' />
          <Button type='submit'>Login</Button>
        </Stack>
      </form>
    </Stack>
  );
}
