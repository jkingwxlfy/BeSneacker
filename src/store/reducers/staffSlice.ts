import type { IProductCart } from './../../models/IProduct'
import { createSlice } from '@reduxjs/toolkit'
import type { Category } from '@models/IFilter'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '@/models/IProduct'
import type { IFilters } from '@/components/filter/Filter'
import { priceRangeCheck } from '@/utils/PriceCheck'

interface SliceState {
    allStaff: IProduct[]
    currentStaff: IProduct[]
    currentCategory: Category.SNEACKERS | Category.WEAR | ''
    searchQuery: string
    filteredProducts: IProduct[]
    filteredAndSearchedProducts: IProduct[]
    selectedFilters: IFilters
    cart: IProductCart[]
    favorite: IProduct[]
    queryError: boolean
    cartPrice: number
    isOrdered: boolean
}

const initialState: SliceState = {
    allStaff: [],
    currentStaff: [],
    currentCategory: '',
    searchQuery: '',
    filteredProducts: [],
    filteredAndSearchedProducts: [],
    selectedFilters: {
        brand: null,
        color: null,
        price: null,
    },
    cart: [],
    favorite: [],
    queryError: false,
    cartPrice: 0,
    isOrdered: false,
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload
            state.filteredProducts = []
            state.filteredAndSearchedProducts = []
        },
        getCurrentStaff: (state, action: PayloadAction<IProduct[]>) => {
            state.currentStaff = [...action.payload]
        },
        getAllStaff: (state, action: PayloadAction<IProduct[]>) => {
            state.allStaff = [...action.payload]
        },
        setSelectedFilters: (state, action: PayloadAction<IFilters>) => {
            state.selectedFilters = action.payload
            state.filteredProducts = []
            state.filteredAndSearchedProducts = []
        },
        filterAndSearchProducts: state => {
            const { searchQuery, selectedFilters, currentStaff } = state
            const { brand, color, price } = selectedFilters

            const filterAndSearchProducts = (products: IProduct[]) =>
                products.filter(item => {
                    const isBrandMatch = !brand || item.brand === brand
                    const isColorMatch = !color || item.color === color
                    const isSearchMatch =
                        !searchQuery ||
                        item.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    const isPriceInRange =
                        !price || priceRangeCheck(item.price, price)

                    return (
                        isBrandMatch &&
                        isColorMatch &&
                        isSearchMatch &&
                        isPriceInRange
                    )
                })

            state.filteredProducts = filterAndSearchProducts(currentStaff)
            state.filteredAndSearchedProducts = state.filteredProducts
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
            state.filteredAndSearchedProducts = state.filteredProducts.filter(
                item => item.title.toLowerCase().includes(state.searchQuery),
            )
        },
        clearSearchQuery: state => {
            state.searchQuery = ''
            state.filteredAndSearchedProducts = []
        },
        setQueryError: (state, action: PayloadAction<boolean>) => {
            state.queryError = action.payload
        },
        setFavorite: (state, action: PayloadAction<IProduct>) => {
            if (state.favorite.find(item => item.id === action.payload.id)) {
                state.favorite = state.favorite.filter(
                    item => item.id !== action.payload.id,
                )
            } else {
                state.favorite.push(action.payload)
            }
        },
        setCart: (state, action: PayloadAction<IProduct>) => {
            const existingItemIndex = state.cart.findIndex(
                item => item.id === action.payload.id,
            )
            if (existingItemIndex !== -1) {
                // Найденный товар для удаления
                const existingItem = state.cart[existingItemIndex]

                // Уменьшаем общую стоимость корзины
                state.cartPrice -=
                    parseInt(existingItem.price.replace(' ', ''), 10) *
                    existingItem.totalCount

                // Удаляем товар из корзины
                state.cart = state.cart.filter(
                    item => item.id !== action.payload.id,
                )
            } else {
                // Добавляем новый товар в корзину и увеличиваем общую стоимость
                state.cartPrice += parseInt(
                    action.payload.price.replace(' ', ''),
                    10,
                )
                state.cart.push({ ...action.payload, totalCount: 1 })
            }
        },

        decreaseProductCount: (state, action: PayloadAction<IProduct>) => {
            state.cart = state.cart.map(product => {
                if (
                    product.id === action.payload.id &&
                    product.totalCount > 1
                ) {
                    state.cartPrice -= parseInt(
                        action.payload.price.replace(' ', ''),
                        10,
                    )
                    return { ...product, totalCount: product.totalCount - 1 }
                }
                return product
            })
        },
        increaseProductCount: (state, action: PayloadAction<IProduct>) => {
            state.cart = state.cart.map(product => {
                if (
                    product.id === action.payload.id &&
                    product.totalCount < parseInt(product.count, 10)
                ) {
                    state.cartPrice += parseInt(
                        action.payload.price.replace(' ', ''),
                        10,
                    )
                    return { ...product, totalCount: product.totalCount + 1 }
                }
                return product
            })
        },
        setIsOrdered: (state, action: PayloadAction<boolean>) => {
            state.isOrdered = action.payload
        },
    },
})

const { actions, reducer } = staffSlice
export const {
    getCurrentStaff,
    setCurrentCategory,
    filterAndSearchProducts,
    setSearchQuery,
    clearSearchQuery,
    setSelectedFilters,
    getAllStaff,
    setQueryError,
    setFavorite,
    setCart,
    decreaseProductCount,
    increaseProductCount,
    setIsOrdered,
} = actions
export default reducer
