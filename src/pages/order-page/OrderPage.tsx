import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useEffect } from 'react'
import { setIsOrdered } from '@/store/reducers/staffSlice'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../routes/index'

import './orderpage.scss'

const OrderPage: React.FC = () => {
    const { id } = useParams()
    const { isOrdered } = useAppSelector(state => state.staff)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isOrdered) navigate('/')

        return () => {
            dispatch(setIsOrdered(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOrdered])

    return (
        <section className='order-page'>
            <div className='order-page__container'>
                <h1>Заказ {id} успешно оформлен</h1>
                <h2>В ближайшее время с вами свяжется менеджер</h2>
                <Link to={RouteNames.HOME}>Вернуться на главную</Link>
            </div>
        </section>
    )
}
export default OrderPage
