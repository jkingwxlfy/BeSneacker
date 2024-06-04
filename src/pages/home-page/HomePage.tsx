/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '@/models/IFilter'
import type { IProduct } from '@/models/IProduct'
import type { IStatus } from '@/models/IStatus'
import { useHttp } from '@/hooks/useHttp'
import { useAppDispatch } from '@/hooks/redux'
import { setQueryError } from '@/store/reducers/staffSlice'

import ProductItem from '@/components/product-item/ProductItem'
import Spinner from '@/components/UI/spinner/Spinner'

import BannerFirst from '@assets/home_banner1.png'
import BannerSecond from '@assets/home_banner2.png'
import BannerThird from '@assets/home_banner3.png'
import Homelogo1 from '@assets/homelogo1.png'
import Homelogo2 from '@assets/homelogo2.png'
import GreenArrow from '@assets/green-arrow.png'
import './homepage.scss'

interface IStaffList {
    data: IProduct[]
    category: Category
}

const StaffList: React.FC<IStaffList> = ({ data, category }) => {
    return (
        <div className='staff__list'>
            {data.map((item, key) =>
                key < 5 ? (
                    <ProductItem
                        data={item}
                        key={item.id}
                        category={
                            category === Category.SNEACKERS
                                ? Category.SNEACKERS
                                : Category.WEAR
                        }
                    />
                ) : null,
            )}
        </div>
    )
}

const HomePage: React.FC = () => {
    const [currentBg, setCurrentBg] = useState(BannerFirst)
    const [index, setIndex] = useState(1)
    const dots = [1, 2, 3]
    const { request } = useHttp()
    const [sneackers, setSneackers] = useState<IProduct[]>([])
    const [wear, setWear] = useState<IProduct[]>([])
    const [status, setStatus] = useState<IStatus>({
        loading: true,
        error: false,
    })
    const dispatch = useAppDispatch()

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
        request('http://localhost:3000/sneacker')
            .then((data: IProduct[]) => {
                setStatus({ error: false, loading: false })
                setSneackers(data)
            })
            .catch(e => {
                console.log(e)
                setStatus({ error: true, loading: false })
            })
        request('http://localhost:3000/wear')
            .then((data: IProduct[]) => {
                setStatus({ error: false, loading: false })
                setWear(data)
            })
            .catch(e => {
                console.log(e)
                setStatus({ error: true, loading: false })
            })
    }, [])

    useEffect(() => {
        setCurrentBg(_ => {
            switch (index) {
                case 1:
                    return BannerFirst
                case 2:
                    return BannerSecond
                case 3:
                    return BannerThird
                default:
                    setIndex(1)
                    return BannerFirst
            }
        })
    }, [index])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevState => {
                if (prevState < 3) {
                    return prevState + 1
                } else {
                    return 1
                }
            })
        }, 5000)

        return () => clearInterval(intervalId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className='home-page'>
            <div
                className='slider'
                style={{ backgroundImage: `url(${currentBg})` }}
            >
                <div className='slider__dots'>
                    {dots.map(item => (
                        <div
                            className={
                                index === item
                                    ? 'slider__dots-item active'
                                    : 'slider__dots-item'
                            }
                            key={item}
                            onClick={() => setIndex(item)}
                        />
                    ))}
                </div>
            </div>
            <div className='staff'>
                <div className='staff__title'>
                    <div>Популярные кросовки :</div>
                    <Link to='/category/sneacker'>
                        Показать еще{' '}
                        <img src={GreenArrow} alt='Картинка стрелки' />
                    </Link>
                </div>
                <div className='staff__list'>
                    {status.loading ? (
                        <Spinner />
                    ) : (
                        <StaffList
                            data={sneackers}
                            category={Category.SNEACKERS}
                        />
                    )}
                </div>
            </div>
            <div className='staff'>
                <div className='staff__title'>
                    <div>Популярная одежда :</div>
                    <Link to='/category/wear'>
                        Показать еще{' '}
                        <img src={GreenArrow} alt='Картинка стрелки' />
                    </Link>
                </div>
                <div className='staff__list'>
                    {status.loading ? (
                        <Spinner />
                    ) : (
                        <StaffList data={wear} category={Category.WEAR} />
                    )}
                </div>
            </div>
            <div className='home-page__logo'>
                <img src={Homelogo1} alt='Картинка лого' />
                <img src={Homelogo2} alt='Картинка лого' />
            </div>
        </section>
    )
}
export default HomePage
