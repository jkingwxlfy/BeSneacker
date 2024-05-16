import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import ErrorMessage from '../UI/error/Error'

import './layout.scss'

const Layout: React.FC = () => {
    const { queryError } = useAppSelector(state => state.staff)

    return (
        <main className='layout'>
            <Header />
            <div className='layout__content'>
                {!queryError ? <Outlet /> : <ErrorMessage />}
            </div>
            <Footer />
        </main>
    )
}
export default Layout
