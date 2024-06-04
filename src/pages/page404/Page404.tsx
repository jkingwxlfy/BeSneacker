import { Link } from 'react-router-dom'
import { RouteNames } from '@/routes/index'

import './page404.scss'

const Page404: React.FC = () => {
    return (
        <section className='page404'>
            <div className='page404__container'>
                <h1>Страницы не существует</h1>
                <Link to={RouteNames.HOME}>Вернуться на главную</Link>
            </div>
        </section>
    )
}
export default Page404
