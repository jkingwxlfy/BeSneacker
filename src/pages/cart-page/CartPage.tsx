import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { Link, useNavigate } from 'react-router-dom'
import {
    setCart,
    decreaseProductCount,
    increaseProductCount,
    setIsOrdered,
} from '@/store/reducers/staffSlice'
import { useState, useEffect } from 'react'
import { useHttp } from '@/hooks/useHttp'

import MyModal from '@/components/UI/modal/MyModal'

import CartDelete2 from '@assets/cart-delete2.png'
import PlusButton from '@assets/plusbutton.png'
import MinusButton from '@assets/minusbutton.png'
import './cartpage.scss'

const CartPage: React.FC = () => {
    const { cart } = useAppSelector(state => state.staff)
    const dispatch = useAppDispatch()
    const { cartPrice } = useAppSelector(state => state.staff)
    const [isModal, setIsModal] = useState(false)
    const [input, setInput] = useState({ mail: '', address: '', phone: '' })
    const [isValidate, setIsValidate] = useState(true)
    const navigate = useNavigate()
    const { request } = useHttp()

    const onOrder = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (
            input.mail.length < 10 ||
            input.address.length < 5 ||
            input.phone.length < 10
        ) {
            setIsValidate(false)
            return
        }
        setIsValidate(true)
        const id = Math.floor(Math.random() * (0 - 99999) + 99999)

        request(
            'http://localhost:3000/orders',
            JSON.stringify({ id, ...input }),
            'POST',
        )
            .then(data => {
                console.log(data)
                dispatch(setIsOrdered(true))
                navigate(`/order/${id}`)
            })
            .then(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (isModal) {
            setInput({ mail: '', address: '', phone: '' })
            setIsValidate(true)
        }
    }, [isModal])

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
                            <button onClick={() => setIsModal(true)}>
                                Купить
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='cart-page__empty'>Список пуст</div>
                )}
            </div>

            <MyModal isModal={isModal} setModal={setIsModal}>
                <form>
                    <div className='cart-page__modal-title'>
                        Оформление товара
                    </div>
                    <div className='cart-page__modal'>
                        <div className='cart-page__modal-field'>
                            <div className='cart-page__modal-field__title'>
                                Электронная почта
                            </div>
                            <input
                                placeholder='Введите вашу почту'
                                type='text'
                                className={`cart-page__modal-field__input ${!isValidate ? 'invalid' : ''}`}
                                value={input.mail}
                                onChange={event =>
                                    setInput({
                                        ...input,
                                        mail: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='cart-page__modal-field'>
                            <div className='cart-page__modal-field__title'>
                                Адрес
                            </div>
                            <input
                                placeholder='Введите ваш адрес'
                                type='text'
                                className={`cart-page__modal-field__input ${!isValidate ? 'invalid' : ''}`}
                                value={input.address}
                                onChange={event =>
                                    setInput({
                                        ...input,
                                        address: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='cart-page__modal-field'>
                            <div className='cart-page__modal-field__title'>
                                Номер телефона
                            </div>
                            <input
                                placeholder='Введите ваш номер телефона'
                                type='text'
                                className={`cart-page__modal-field__input ${!isValidate ? 'invalid' : ''}`}
                                value={input.phone}
                                onChange={event =>
                                    setInput({
                                        ...input,
                                        phone: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <button
                        className='cart-page__modal-button'
                        type='button'
                        onClick={e => onOrder(e)}
                    >
                        Заказать
                    </button>
                </form>
            </MyModal>
        </section>
    )
}
export default CartPage
