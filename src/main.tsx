import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';
import './index.css';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Events from './pages/events/events.tsx';
import Restaurants from './pages/restaurants/restaurants.tsx';
import Deals from './pages/deals/deals.tsx';
import {
  getBusinessById,
  getRestaurants,
} from './services/restaurants.service.ts';
import Restaurant from './pages/restaurant/restaurant.tsx';
import { getDeals } from './services/deals.service.ts';
import { getEventById, getEvents } from './services/events.service.ts';
import Event from './pages/event/event.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Events,
        loader: async () => {
          return { events: await getEvents() };
        },
      },
      {
        path: 'events/:id',
        Component: Event,
        loader: async ({ params }) => {
          const id = params.id!;
          return { event: await getEventById(Number(id)) };
        },
      },
      {
        path: 'restaurants',
        loader: async () => {
          return { restaurants: await getRestaurants() };
        },
        Component: Restaurants,
      },
      {
        path: 'restaurants/:id',
        loader: async ({ params }) => {
          const id = params.id!;
          return { restaurant: await getBusinessById(Number(id)) };
        },
        Component: Restaurant,
      },
      {
        path: 'deals',
        Component: Deals,
        loader: async () => {
          return { deals: await getDeals() };
        },
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
