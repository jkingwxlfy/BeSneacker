import { Link } from 'react-router-dom'
import { RouteNames } from '@/routes'

import Search from '../search/Search'

import Cart from '@assets/cart.png'
import Heart from '@assets/heart.png'
import './header.scss'

const Header: React.FC = () => {
    return (
        <section className='header'>
            <Link to={RouteNames.HOME} className='header__title'>
                BeSneacker.
            </Link>

            <Search />

            <div className='header__links'>
                <Link className='header__cart' to={RouteNames.CART}>
                    <img src={Cart} alt='Картинка корзины' />
                </Link>
                <Link className='header__favorite' to={RouteNames.FAVORITE}>
                    <img src={Heart} alt='Картинка корзины' />
                </Link>
            </div>
        </section>
    )
}
export default Header
