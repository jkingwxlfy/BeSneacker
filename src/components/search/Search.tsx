import { useState, useMemo, useEffect } from 'react'
import type { IProduct } from '@/models/IProduct'
import type { IStatus } from '@/models/IStatus'
import { useHttp } from '@/hooks/useHttp'
import { useAppDispatch } from '@/hooks/redux'
import { setQueryError } from '@/store/reducers/staffSlice'
import { Link } from 'react-router-dom'

import SearchLoop from '@assets/search.png'
import './search.scss'

const Search: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [staff, setStaff] = useState<IProduct[]>([])
    const [sneackers, setSneackers] = useState<IProduct[]>([])
    const [wear, setWear] = useState<IProduct[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [status, setStatus] = useState<IStatus>({
        loading: false,
        error: false,
    })
    const { request } = useHttp()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status.error) {
            dispatch(setQueryError(true))
        } else {
            dispatch(setQueryError(false))
        }
    }, [status.error])

    useEffect(() => {
        if (sneackers.length && wear.length) {
            setStaff([...sneackers, ...wear])
        }
    }, [sneackers, wear])

    useEffect(() => {
        request('http://localhost:3000/sneacker')
            .then((data: IProduct[]) => {
                setStatus({ ...status, loading: false })
                setSneackers(data)
            })
            .catch(e => {
                console.log(e)
                setStatus({ error: true, loading: false })
            })
        request('http://localhost:3000/wear')
            .then((data: IProduct[]) => {
                setStatus({ ...status, loading: false })
                setWear(data)
            })
            .catch(e => {
                console.log(e)
                setStatus({ error: true, loading: false })
            })
    }, [])

    const filteredStaff = useMemo(() => {
        if (searchQuery) {
            return staff.filter(item => {
                const queryWords = searchQuery.toLowerCase().trim().split(' ')
                const titleWords = item.title.toLowerCase().split(' ')

                return queryWords.every(word =>
                    // eslint-disable-next-line max-nested-callbacks
                    titleWords.some(titleWord => titleWord.includes(word)),
                )
            })
        } else {
            return []
        }
    }, [searchQuery])

    return (
        <div className='search'>
            <div className='search__input'>
                <input
                    type='text'
                    placeholder='Поиск по бренду, коллекции и т.д'
                    onClick={() => setIsActive(true)}
                    onChange={event => setSearchQuery(event.target.value)}
                    value={searchQuery}
                />
                <img src={SearchLoop} alt='Картинка поиска' />
                <div
                    className={`search__input-empty ${isActive ? 'active' : ''}`}
                >
                    Поиск
                </div>
            </div>
            {filteredStaff.length ? (
                <div className={`search__results ${isActive ? 'active' : ''}`}>
                    {filteredStaff.map(item => (
                        <Link
                            className='search__results-item'
                            key={Math.random()}
                            to={`/${item.category}/${item.id}`}
                            onClick={() => {
                                setIsActive(false)
                                setSearchQuery('')
                            }}
                        >
                            <img src={item.image} alt='Картинка товара' />
                            <div className='search__results-item__title'>
                                {item.title}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
            <div
                className={`search__shade ${isActive ? 'active' : ''}`}
                onClick={() => {
                    setIsActive(false)
                    setSearchQuery('')
                }}
            />
        </div>
    )
}
export default Search
