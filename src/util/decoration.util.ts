export const formatCurrency = (value: number | undefined, locale = 'vi-VN', currency = 'VND'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value!);
}

export const rangePaging = (total: number | undefined) => {
    return Array.from({ length: total!}, (_, i) => 1 + i);
}

export const formatPriceRangeTitle = (minPrice: number, maxPrice: number | null) => {
    if (maxPrice != null) {
        if (minPrice == 0){
            return `Duới ${formatCurrency(maxPrice)}`;
        }else {
            return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
        }
    }else if (minPrice != 0) {
        return `Trên ${formatCurrency(minPrice)}`;
    }
}