import {
    HomePage,
    ProductListPage,
    ProductItemPage,
    CartPage,
    FavoritePage,
} from '@/pages'

export interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RouteNames {
    HOME = '/',
    PRODUCT_LIST = `/:category`,
    PRODUCT_ITEM = '/:category/:id',
    CART = '/cart',
    FAVORITE = '/favorite',
}

export const routes: IRoute[] = [
    { path: RouteNames.HOME, component: HomePage },
    { path: RouteNames.PRODUCT_LIST, component: ProductListPage },
    { path: RouteNames.PRODUCT_ITEM, component: ProductItemPage },
    { path: RouteNames.CART, component: CartPage },
    { path: RouteNames.FAVORITE, component: FavoritePage },
]
