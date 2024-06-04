import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { Link } from 'react-router-dom'
import { setFavorite } from '@/store/reducers/staffSlice'

import Cross from '@assets/cart-delete.png'
import './favoritepage.scss'

const FavoritePage: React.FC = () => {
    const { favorite } = useAppSelector(state => state.staff)
    const dispatch = useAppDispatch()

    return (
        <section className='favorite-page'>
            <div className='favorite-page__container'>
                <h1 className='favorite-page__title'>Избранные товары</h1>
                <div className='favorite-page__list'>
                    {favorite.length ? (
                        favorite.map(item => (
                            <div className='favorite-page__item' key={item.id}>
                                <Link
                                    to={`/category/${item.category}/${item.id}`}
                                >
                                    <img
                                        className='favorite-page__item-main'
                                        src={item.image}
                                        alt='Картинка товара'
                                    />
                                    <div className='favorite-page__item-title'>
                                        {item.title}
                                    </div>
                                </Link>
                                <img
                                    src={Cross}
                                    alt='Картинка удаления товара'
                                    className='favorite-page__item-delete'
                                    onClick={() => dispatch(setFavorite(item))}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='favorite-page__empty'>Список пуст</div>
                    )}
                </div>
            </div>
        </section>
    )
}
export default FavoritePage
