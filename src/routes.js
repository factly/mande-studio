import Memberships from './pages/memberships/index';
import Payments from './pages/payments/index';
import Plans from './pages/plans/index';
import PlanCreate from './pages/plans/create';
import Orders from './pages/orders/index';
import OrderDetail from './pages/orders/detail';
import Carts from './pages/carts/index';
import CartDetail from './pages/carts/detail';
import Tags from './pages/tags/index';
import TagCreate from './pages/tags/create';
import ProductCreate from './pages/products/create';
import Products from './pages/products';
import CategoryCreate from './pages/categories/create';
import Categories from './pages/categories';
import CurrencyCreate from './pages/currencies/create';
import Currencies from './pages/currencies';
import ProductTypes from './pages/product_types';
import ProductTypeCreate from './pages/product_types/create';
import ProductEdit from './pages/products/edit';

import {
  PieChartOutlined,
  ContainerOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  MoneyCollectFilled,
  FilePptOutlined,
} from '@ant-design/icons';

class Route {
  constructor({ path, component, title, icon, onNavigation = false, exact = true }) {
    this.path = path;
    this.component = component;
    this.title = title;
    this.icon = icon;
    this.onNavigation = onNavigation;
    this.exact = exact;
    // If urlName is not provided, set the urlName from path.
    // eg: path = '/categories/create' -> urlName = 'categories-create'
    this.urlName = path.replace(/^\//g, '').replace(/\//g, '-').replace(':id', 'detail');
  }
}

const routes = [
  new Route({
    path: '/',
    title: 'Dashboard',
    icon: PieChartOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/carts',
    component: Carts,
    title: 'Carts',
    icon: ShoppingCartOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/carts/:id',
    component: CartDetail,
  }),
  new Route({
    path: '/categories',
    component: Categories,
    title: 'Categories',
    icon: TagOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/categories/create',
    component: CategoryCreate,
  }),
  new Route({
    path: '/currencies',
    component: Currencies,
    title: 'Currencies',
    icon: MoneyCollectFilled,
    onNavigation: true,
  }),
  new Route({
    path: '/currencies/create',
    component: CurrencyCreate,
  }),
  new Route({
    path: '/memberships',
    component: Memberships,
    title: 'Memberships',
    icon: IdcardOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/orders',
    component: Orders,
    title: 'Orders',
    icon: ShoppingOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/orders/:id',
    component: OrderDetail,
  }),
  new Route({
    path: '/payments',
    component: Payments,
    title: 'Payments',
    icon: CreditCardOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/plans',
    component: Plans,
    title: 'Plans',
    icon: ContainerOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/plans/create',
    component: PlanCreate,
  }),
  new Route({
    path: '/products',
    component: Products,
    title: 'Products',
    icon: ContainerOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/products/create',
    component: ProductCreate,
  }),
  new Route({
    path: '/products/:id',
    component: ProductEdit,
  }),
  new Route({
    path: '/tags',
    component: Tags,
    title: 'Tags',
    icon: TagOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/tags/create',
    component: TagCreate,
  }),
  new Route({
    path: '/types',
    component: ProductTypes,
    title: 'Product Types',
    icon: FilePptOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/types/create',
    component: ProductTypeCreate,
  }),
];

export const getRoute = (name) => {
  return routes.find((route) => route.urlName === name);
};

export default routes;
