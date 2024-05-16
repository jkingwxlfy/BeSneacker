import { Price } from '@/models/IFilter'

export const priceRangeCheck = (
    productPrice: string,
    selectedPrice: string,
) => {
    const [min, max] = selectedPrice
        .split('-')
        .map(str => parseInt(str.trim().replace(/\D/g, ''), 10))
    const productPriceNumeric = parseInt(productPrice.replace(/\D/g, ''), 10)

    if (selectedPrice === Price.K25more) {
        return productPriceNumeric >= 25000
    }

    if (selectedPrice === Price.K10) {
        return productPriceNumeric <= 10000
    }

    return productPriceNumeric >= min && productPriceNumeric <= max
}
