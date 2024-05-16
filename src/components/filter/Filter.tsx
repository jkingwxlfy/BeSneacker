import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { Color } from '@/models/IFilter'
import { Brand, Price } from '@/models/IFilter'
import {
    setSearchQuery,
    setSelectedFilters,
    filterAndSearchProducts,
} from '@/store/reducers/staffSlice'
import { useState, useEffect } from 'react'

import Search from '@assets/search.png'
import './filter.scss'

const BrandOptions = [
    Brand.ADIDAS,
    Brand.YEEZY,
    Brand.NIKE,
    Brand.AIR_JORDAN,
    Brand.NEW_BALANCE,
]

const TypeOfColorOptions = {
    title: 'Цвет',
    options: [Color.BLACK, Color.WHITE, Color.MULTI, Color.PINK],
}

const TypeOfPriceOptions = {
    title: 'Цена',
    options: [Price.K10, Price.K15, Price.K20, Price.K25, Price.K25more],
}

export interface IFilters {
    brand: Brand | null
    price: Price | null
    color: Color | null
}

const Filter: React.FC = () => {
    const dispatch = useAppDispatch()
    const { searchQuery, selectedFilters } = useAppSelector(
        state => state.staff,
    )
    const [input, setInput] = useState('')
    const [filters, setFilters] = useState<IFilters>({
        brand: null,
        price: null,
        color: null,
    })

    useEffect(() => {
        dispatch(setSearchQuery(input))
    }, [input])

    useEffect(() => {
        if (!searchQuery) {
            setInput('')
        }
        if (
            !selectedFilters.brand ||
            !selectedFilters.color ||
            !selectedFilters.price
        ) {
            setFilters(selectedFilters)
        }
    }, [searchQuery, selectedFilters])

    useEffect(() => {
        dispatch(setSelectedFilters(filters))
        dispatch(filterAndSearchProducts())
    }, [filters.brand, filters.color, filters.price])

    return (
        <div className='filter'>
            <div className='filter__input'>
                <input
                    type='text'
                    placeholder='Поиск'
                    onChange={event => setInput(event.target.value)}
                    value={input}
                />
                <img src={Search} alt='Картинка поиска' />
            </div>
            <div className='filter__wrapper'>
                <div className='filter__brand'>
                    {BrandOptions.map(item => (
                        <div
                            className={`filter__brand-item ${item === filters.brand ? 'selected' : ''}`}
                            key={item}
                            onClick={() => {
                                if (filters.brand === item) {
                                    setFilters({
                                        ...filters,
                                        brand: null,
                                    })
                                } else {
                                    setFilters({
                                        ...filters,
                                        brand: item,
                                    })
                                }
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className='filter__list'>
                    <div className='filter__list-title'>
                        {TypeOfColorOptions.title}
                    </div>
                    <div className='filter__list-items'>
                        {TypeOfColorOptions.options.map(item => (
                            <label key={item}>
                                <span
                                    className={`filter__list-items__title ${filters.color === item ? 'selected' : ''}`}
                                >
                                    {item}
                                </span>
                                <input
                                    type='checkbox'
                                    onChange={() => {
                                        if (filters.color === item) {
                                            setFilters({
                                                ...filters,
                                                color: null,
                                            })
                                        } else {
                                            setFilters({
                                                ...filters,
                                                color: item,
                                            })
                                        }
                                    }}
                                    checked={filters.color === item}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className='filter__list'>
                    <div className='filter__list-title'>
                        {TypeOfPriceOptions.title}
                    </div>
                    <div className='filter__list-items'>
                        {TypeOfPriceOptions.options.map(item => (
                            <label key={item}>
                                <span
                                    className={`filter__list-items__title ${filters.price === item ? 'selected' : ''}`}
                                >
                                    {item}
                                </span>
                                <input
                                    type='checkbox'
                                    onChange={() => {
                                        if (filters.price === item) {
                                            setFilters({
                                                ...filters,
                                                price: null,
                                            })
                                        } else {
                                            setFilters({
                                                ...filters,
                                                price: item,
                                            })
                                        }
                                    }}
                                    checked={filters.price === item}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter
