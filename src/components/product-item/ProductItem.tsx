import { Link } from 'react-router-dom'
import type { Category } from '@/models/IFilter'
import type { IProduct } from '@/models/IProduct'

import './product-item.scss'

interface IProductItemProps {
    data: IProduct
    category: Category
}

const ProductItem: React.FC<IProductItemProps> = ({ data, category }) => {
    const { image, title, price, count, id } = data

    return (
        <Link className='product-item' to={`/${category}/${id}`}>
            <div
                className='product-item__image'
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className='product-item__title'>{title}</div>
            <div className='product-item__price'>
                Цена <br /> <span>{price}</span>
            </div>
            <div className='product-item__count'>{count} осталось</div>
        </Link>
    )
}
export default ProductItem
