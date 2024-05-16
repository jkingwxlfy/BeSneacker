/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link, useNavigate } from 'react-router-dom'
import { RouteNames } from '@/routes'
import { Select } from 'antd'
import type { IProduct } from '@/models/IProduct'
import { Category } from '@/models/IFilter'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { useHttp } from '@/hooks/useHttp'
import {
    setSelectedFilters,
    filterAndSearchProducts,
    clearSearchQuery,
    setCurrentCategory,
    getCurrentStaff,
    setQueryError,
} from '@/store/reducers/staffSlice'
import { useEffect, useState } from 'react'
import type { IStatus } from '@/models/IStatus'

import Filter from '@/components/filter/Filter'
import ProductItem from '@/components/product-item/ProductItem'

import './productlistpage.scss'
import Spinner from '@/components/UI/spinner/Spinner'

const selectOptions = [
    { value: 'По популярности', label: <span>По популярности</span> },
    { value: 'По дате выхода', label: <span>По дате выхода</span> },
    { value: 'По возрастанию', label: <span>По возрастанию</span> },
    { value: 'По убыванию', label: <span>По убыванию</span> },
]

interface IProductListProps {
    products: IProduct[]
    category: Category
}

const ProductList: React.FC<IProductListProps> = ({ products, category }) => {
    if (!products.length) {
        return <div className='product-list-page__empty'>Нет товаров</div>
    }

    return products.map((item: IProduct) => (
        <ProductItem data={item} key={item.id} category={category} />
    ))
}

const ProductListPage: React.FC = () => {
    const { category } = useParams()
    const { currentStaff, selectedFilters, filteredAndSearchedProducts } =
        useAppSelector(state => state.staff)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentCategory =
        category === Category.SNEACKERS ? Category.SNEACKERS : Category.WEAR
    const { request } = useHttp()
    const [status, setStatus] = useState<IStatus>({
        loading: true,
        error: false,
    })

    const onReturnBack = () => {
        if (category) {
            navigate(`/${category}`)
            dispatch(setSelectedFilters({ ...selectedFilters, brand: null }))
            dispatch(clearSearchQuery())
            dispatch(filterAndSearchProducts())
        }
    }

    useEffect(() => {
        if (currentStaff.length) {
            dispatch(filterAndSearchProducts())
        }
    }, [currentStaff, selectedFilters.brand])

    useEffect(() => {
        if (status.error) {
            dispatch(setQueryError(true))
        } else {
            dispatch(setQueryError(false))
        }

        return () => {
            dispatch(setQueryError(false))
        }
    }, [status.error])

    useEffect(() => {
        dispatch(setCurrentCategory(currentCategory))
        request(`http://localhost:3000/${currentCategory}`)
            .then((data: IProduct[]) => {
                dispatch(getCurrentStaff(data))
                setStatus({ error: false, loading: false })
            })
            .catch(e => {
                console.log(e)
                setStatus({ error: true, loading: false })
            })
    }, [])

    return (
        <section className='product-list-page'>
            <div className='product-list-page__container'>
                <div className='product-links'>
                    <Link to={RouteNames.HOME}>На главную</Link>
                    <p>/</p>
                    <div onClick={onReturnBack}>
                        {category === Category.SNEACKERS
                            ? 'Кроссовки'
                            : 'Одежда'}
                    </div>
                    {selectedFilters.brand ? (
                        <>
                            <p>/</p>
                            <div>{selectedFilters.brand}</div>
                        </>
                    ) : null}
                </div>
                <div className='product-list-page__title'>
                    {category === Category.SNEACKERS ? 'Кроссовки' : 'Одежда'}
                </div>
                {/* <div className='product-list-page__select'>
                    <Select
                        options={selectOptions}
                        defaultValue='Сортировка по'
                        style={{
                            width: 255,
                            textAlign: 'center',
                        }}
                    />
                </div> */}
                <div className='product-list-page__staff'>
                    <Filter />
                    {status.loading ? (
                        <div className='product-list-page__spinner'>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='product-list-page__wrapper'>
                            <ProductList
                                products={filteredAndSearchedProducts}
                                category={currentCategory}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
export default ProductListPage
