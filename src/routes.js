import Memberships from './pages/memberships/index';
import Payments from './pages/payments/index';
import Plans from './pages/plans/index';
import PlanCreate from './pages/plans/create';
import PlanEdit from './pages/plans/edit';
import Orders from './pages/orders/index';
import OrderDetail from './pages/orders/detail';
import Carts from './pages/carts/index';
import CartDetail from './pages/carts/detail';
import Catalogs from './pages/catalogs/index';
import CatalogCreate from './pages/catalogs/create';
import CatalogEdit from './pages/catalogs/edit';
import Tags from './pages/tags/index';
import TagCreate from './pages/tags/create';
import TagEdit from './pages/tags/edit';
import ProductCreate from './pages/products/create';
import Products from './pages/products';
import CurrencyCreate from './pages/currencies/create';
import Currencies from './pages/currencies';
import CurrencyEdit from './pages/currencies/edit';
import ProductEdit from './pages/products/edit';
import Formats from './pages/formats/index';
import FormatCreate from './pages/formats/create';
import FormatEdit from './pages/formats/edit';
import DatasetCreate from './pages/datasets/create';
import DatasetEdit from './pages/datasets/edit';
import DatasetDetail from './pages/datasets/detail';
import Datasets from './pages/datasets/index';
import MediaEdit from './pages/media/edit';
import Media from './pages/media/index';

import {
  PieChartOutlined,
  ContainerOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  MoneyCollectFilled,
  FileImageOutlined,
  FolderOpenOutlined,
  SolutionOutlined,
  FileUnknownOutlined,
  DatabaseOutlined,
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
    path: '/catalogs',
    component: Catalogs,
    title: 'Catalogs',
    icon: DatabaseOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/catalogs/create',
    component: CatalogCreate,
  }),
  new Route({
    path: '/catalogs/:id/edit',
    component: CatalogEdit,
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
    path: '/currencies/:id/edit',
    component: CurrencyEdit,
  }),
  new Route({
    path: '/datasets',
    component: Datasets,
    title: 'Datasets',
    icon: FolderOpenOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/datasets/:id',
    component: DatasetDetail,
  }),
  new Route({
    path: '/datasets/create',
    component: DatasetCreate,
  }),
  new Route({
    path: '/datasets/:id/edit',
    component: DatasetEdit,
  }),
  new Route({
    path: '/formats',
    component: Formats,
    title: 'Formats',
    icon: FileUnknownOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/formats/create',
    component: FormatCreate,
  }),
  new Route({
    path: '/formats/:id/edit',
    component: FormatEdit,
  }),
  new Route({
    path: '/memberships',
    component: Memberships,
    title: 'Memberships',
    icon: IdcardOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/media',
    component: Media,
    title: 'Media',
    icon: FileImageOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/media/:id/edit',
    component: MediaEdit,
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
    icon: SolutionOutlined,
    onNavigation: true,
  }),
  new Route({
    path: '/plans/create',
    component: PlanCreate,
  }),
  new Route({
    path: '/plans/:id/edit',
    component: PlanEdit,
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
    path: '/products/:id/edit',
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
    path: '/tags/:id/edit',
    component: TagEdit,
  }),
];

export const getRoute = (name) => {
  return routes.find((route) => route.urlName === name);
};

export default routes;
