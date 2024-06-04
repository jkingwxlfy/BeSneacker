import {
    HomePage,
    ProductListPage,
    ProductItemPage,
    CartPage,
    FavoritePage,
    OrderPage,
    Page404,
} from '@/pages'

export interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RouteNames {
    NOT_FOUND = '*',
    HOME = '/',
    PRODUCT_LIST = `/category/:category`,
    PRODUCT_ITEM = '/category/:category/:id',
    CART = '/cart',
    FAVORITE = '/favorite',
    ORDER = '/order/:id',
}

export const routes: IRoute[] = [
    { path: RouteNames.NOT_FOUND, component: Page404 },
    { path: RouteNames.HOME, component: HomePage },
    { path: RouteNames.PRODUCT_LIST, component: ProductListPage },
    { path: RouteNames.PRODUCT_ITEM, component: ProductItemPage },
    { path: RouteNames.CART, component: CartPage },
    { path: RouteNames.FAVORITE, component: FavoritePage },
    { path: RouteNames.ORDER, component: OrderPage },
]
