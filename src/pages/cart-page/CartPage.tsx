import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { Link } from 'react-router-dom'
import {
    setCart,
    decreaseProductCount,
    increaseProductCount,
} from '@/store/reducers/staffSlice'

import CartDelete2 from '@assets/cart-delete2.png'
import PlusButton from '@assets/plusbutton.png'
import MinusButton from '@assets/minusbutton.png'
import './cartpage.scss'

const CartPage: React.FC = () => {
    const { cart } = useAppSelector(state => state.staff)
    const dispatch = useAppDispatch()
    const { cartPrice } = useAppSelector(state => state.staff)

    return (
        <section className='cart-page'>
            <div className='cart-page__container'>
                <h1 className='cart-page__title'>Корзина</h1>
                {cart.length ? (
                    <>
                        <div className='cart-page__list'>
                            {cart.map(item => (
                                <div
                                    className='cart-page__list-item'
                                    key={item.id}
                                >
                                    <div className='cart-page__list-item__main'>
                                        <img
                                            src={item.image}
                                            alt='Картинка товара'
                                            className='cart-page__list-item__image'
                                        />
                                        <div className='cart-page__list-item__counter'>
                                            <div
                                                className='cart-page__list-item__counter-button'
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseProductCount(
                                                            item,
                                                        ),
                                                    )
                                                }
                                            >
                                                <img
                                                    src={MinusButton}
                                                    alt='Картинка минуса'
                                                />
                                            </div>
                                            <div className='cart-page__list-item__quantity'>
                                                {item.totalCount}
                                            </div>
                                            <div
                                                className='cart-page__list-item__counter-button'
                                                onClick={() =>
                                                    dispatch(
                                                        increaseProductCount(
                                                            item,
                                                        ),
                                                    )
                                                }
                                            >
                                                <img
                                                    src={PlusButton}
                                                    alt='Картинка плюса'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='cart-page__list-item__wrapper'>
                                        <Link
                                            to={`/${item.category}/${item.id}`}
                                            className='cart-page__list-item__title'
                                        >
                                            {item.title}
                                        </Link>
                                        <div className='cart-page-_list-item__left'>
                                            Осталось : {item.count}
                                        </div>
                                    </div>
                                    <div className='cart-page__list-item__price'>
                                        <div>Цена</div>
                                        <div className='cart-page__list-item__count'>
                                            {item.price}
                                        </div>
                                    </div>
                                    <img
                                        src={CartDelete2}
                                        alt='Картинка кнопки удаления товара'
                                        className='cart-page__list-item__delete'
                                        onClick={() => dispatch(setCart(item))}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='cart-page__price'>
                            Итого:{' '}
                            {cartPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                            ₽
                        </div>
                        <div className='cart-page__button'>
                            <button>Купить</button>
                        </div>
                    </>
                ) : (
                    <div className='cart-page__empty'>Список пуст</div>
                )}
            </div>
        </section>
    )
}
export default CartPage
