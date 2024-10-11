const displayVNDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: "currency",
        currency: 'VND',
        minimumFractionDigits: 0 // Không cần chữ số thập phân cho đồng VND
    });

    return formatter.format(num);
}

export default displayVNDCurrency;