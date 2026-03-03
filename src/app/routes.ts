import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Search } from './pages/Search';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './pages/Cart';

const basename = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: 'catalog', Component: Catalog },
        { path: 'search', Component: Search },
        { path: 'login', Component: Login },
        { path: 'register', Component: Register },
        { path: 'cart', Component: Cart },
      ],
    },
  ],
  {
    basename,
  },
);
