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


class Route {
    constructor(path, component, name) {
        this.path = path;
        this.component = component;
        // If name is not provided, set the name from path.
        // eg: path = '/categories/create' -> name = 'categories-create'
        this.name = name || path.replace(/^\//g,"").replace(/\//g,'-');
    }
}

const routes = [
    new Route('/categories', Categories),
    new Route('/categories/create', CategoryCreate),
    new Route('/currencies', Currencies),
    new Route('/currencies/create', CurrencyCreate),
    new Route('/products', Products),
    new Route('/products/detail/:id', ProductEdit),
    new Route('/products/create', ProductCreate),
    new Route('/types', ProductTypes),
    new Route('/types/create', ProductTypeCreate),
    new Route('/tags/create', TagCreate),
    new Route('/tags', Tags),
    new Route('/plans/create', PlanCreate),
    new Route('/plans', Plans),
    new Route('/memberships', Memberships),
    new Route('/payments', Payments),
    new Route('/orders', Orders),
    new Route('/orders/:id', OrderDetail),
    new Route('/carts', Carts),
    new Route('/carts/:id', CartDetail),
]

export const getRoute = (name) => {
    return routes.find(route => route.name === name)
}

export default routes;