import './App.css';
import { AppShell, NavLink, Title } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router';

function App() {
  // const [opened, { toggle }] = useDisclosure();
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
        <NavLink component={Link} to='/' label='Events' />
        <NavLink component={Link} to='/restaurants' label='Restaurants' />
        <NavLink component={Link} to='/deals' label='Deals' />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
