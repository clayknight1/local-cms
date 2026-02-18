import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/notifications/styles.css';
import './index.css';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import Events from './pages/events/Events.tsx';
import Restaurants from './pages/restaurants/Restaurants.tsx';
import Deals from './pages/deals/Deals.tsx';
import Restaurant from './pages/restaurants/Restaurant.tsx';
import Event from './pages/events/Event.tsx';
import Login from './pages/login/Login.tsx';
import { supabase } from './lib/supabase.ts';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Deal from './pages/deals/Deal.tsx';
import NewRestaurant from './pages/restaurants/NewRestaurant.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: App,
    loader: async ({ request }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw redirect('/login');
      }
      const url = new URL(request.url);
      if (url.pathname === '/') {
        throw redirect('/events');
      }
      return null;
    },
    children: [
      {
        path: 'events',
        Component: Events,
      },
      {
        path: 'events/:id',
        Component: Event,
      },
      {
        path: 'restaurants',
        Component: Restaurants,
      },
      {
        path: 'restaurants/:id',
        Component: Restaurant,
      },
      {
        path: 'restaurants/new',
        Component: NewRestaurant,
      },
      {
        path: 'deals',
        Component: Deals,
      },
      {
        path: 'deals/:id',
        Component: Deal,
      },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
