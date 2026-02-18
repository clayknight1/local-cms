import './App.css';
import { AppShell, Button, NavLink, Title } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useNavigate } from 'react-router';
import { supabase } from './lib/supabase';

function App() {
  const navigate = useNavigate();
  // const [opened, { toggle }] = useDisclosure();
  async function logOut(): Promise<void> {
    await supabase.auth.signOut();
    navigate('/');
  }
  return (
    <AppShell
      padding='md'
      // header={{ height: 60 }}
      navbar={{
        width: 150,
        breakpoint: 'sm',
        // collapsed: { mobile: !opened },
      }}
      layout='alt'
    >
      {/* <AppShell.Header p='md'>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
      </AppShell.Header> */}
      <AppShell.Navbar p='md'>
        <Title style={{ color: '#ffffff' }} order={4} mb='xl'>
          Local CMS
        </Title>
        <NavLink
          component={Link}
          to='/events'
          label='Events'
          active={location.pathname.startsWith('/events')}
        />
        <NavLink
          component={Link}
          to='/restaurants'
          label='Restaurants'
          active={location.pathname.startsWith('/restaurants')}
        />
        <NavLink
          component={Link}
          to='/deals'
          label='Deals'
          active={location.pathname.startsWith('/deals')}
        />
        <Button onClick={logOut}>Log Out</Button>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
