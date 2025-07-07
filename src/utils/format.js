export const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '';
    }
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
}