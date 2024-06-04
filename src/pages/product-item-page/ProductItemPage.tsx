/* eslint-disable react/no-unescaped-entities */
import { Link, useParams } from 'react-router-dom'
import { RouteNames } from '@/routes'
import type { IProduct } from '@/models/IProduct'
import { Category } from '@/models/IFilter'
import { useState, useEffect } from 'react'
import { useHttp } from '@/hooks/useHttp'
import type { IStatus } from '@/models/IStatus'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
    setQueryError,
    setFavorite,
    setCart,
} from '@/store/reducers/staffSlice'

import Spinner from '@/components/UI/spinner/Spinner'

import './productitempage.scss'

const ProductItemPage: React.FC = () => {
    const { category, id } = useParams()
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [isCart, setIsCart] = useState(false)
    const { request } = useHttp()
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const [staff, setStaff] = useState({} as IProduct)
    const [status, setStatus] = useState<IStatus>({
        error: false,
        loading: true,
    })
    const dispatch = useAppDispatch()
    const { favorite, cart } = useAppSelector(state => state.staff)

    useEffect(() => {
        if (favorite.find(item => item.id === staff.id)) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
        if (cart.find(item => item.id === staff.id)) {
            setIsCart(true)
        } else {
            setIsCart(false)
        }
    }, [favorite, staff.id, cart])

    useEffect(() => {
        request(`http://localhost:3000/${category}/${id}`)
            .then((data: IProduct) => {
                setStaff(data)
                setStatus({ error: false, loading: false })
            })
            .catch(e => {
                console.log(e)
                setStatus({ error: true, loading: false })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, id])

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

    const { title, brand, price, image, description, color, sex, count } =
        staff!

    return (
        <section className='product-item-page'>
            <div className='product-item-page__container'>
                <div className='product-links'>
                    <Link to={RouteNames.HOME}>На главную</Link>
                    <p>/</p>
                    <Link to={`/category/${category!}`}>
                        {category === Category.SNEACKERS
                            ? 'Кроссовки'
                            : 'Одежда'}
                    </Link>
                    <p>/</p>
                    <div>{title}</div>
                </div>
                {status.loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className='product-item-page__promo'>
                            <div className='product-item-page__image'>
                                <img
                                    src={image}
                                    className={
                                        category === Category.WEAR
                                            ? 'product-item-page__image wear'
                                            : 'product-item-page__image'
                                    }
                                />
                            </div>
                            <div className='product-item-page__info'>
                                <div className='product-item-page__title'>
                                    {title}
                                </div>
                                <div className='product-item-page__price'>
                                    Цена : <span>{price}</span> <br /> <br />
                                    Количество : <span>{count}</span>
                                </div>

                                <div className='product-item-page__buttons'>
                                    <button
                                        className='product-item-page__greenbt'
                                        onClick={() => {
                                            if (!isCart) {
                                                dispatch(setCart(staff))
                                            }
                                        }}
                                    >
                                        {isCart
                                            ? 'В корзине'
                                            : 'Добавить в корзину'}
                                    </button>
                                    <label
                                        className={`product-item-page__wishbt ${isFavorite ? 'favorite' : ''}`}
                                    >
                                        {isFavorite
                                            ? 'Добавлено'
                                            : 'В избранное'}
                                        <input
                                            type='checkbox'
                                            checked={isFavorite}
                                            onChange={() =>
                                                dispatch(setFavorite(staff))
                                            }
                                        />
                                        <span />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='product-item-page__split' />
                        <div className='product-item-page__details'>
                            <div className='product-item-page__details-title'>
                                Детали товара
                            </div>
                            <div className='product-item-page__details-wrapper'>
                                <div className='product-item-page__details-main'>
                                    <div className='product-item-page__details-main__title'>
                                        {title}
                                    </div>
                                    <div className='product-item-page__details-main__description'>
                                        {description}
                                    </div>
                                </div>
                                <div className='product-item-page__details-composition'>
                                    <div className='product-item-page__details-composition__item'>
                                        Цвет: {color}
                                    </div>
                                    <div className='product-item-page__details-composition__item'>
                                        Пол: {sex}
                                    </div>
                                    <div className='product-item-page__details-composition__item'>
                                        Бренд: {brand}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
export default ProductItemPage
