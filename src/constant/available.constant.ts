export const defaultPriceRanges = [
    {
        min: 1000000,
        max: null
    },
    {
        min: 700000,
        max: 1000000
    },
    {
        min: 200000,
        max: 500000
    },
    {
        min: 50000,
        max: 200000
    },
    {
        min: 0,
        max: 50000
    }
]

export const availablePaymentMethods = [
    {
        title: "Thanh toán trực tiêp khi nhận hàng",
        description: "Nhận hàng tận tay, thanh toán liền ngay",
        iconText: "COD",
        iconImg: null,
        value: "COD"
    },
    {
        title: "Thanh toán qua ví điện tử VNPAY",
        description: "Quét mã VNPAY, thanh toán nhanh trong tích tắc",
        iconText: null,
        iconImg: "public/vnpay.png",
        value: "VNPAY"
    },
    {
        title: "Thanh toán qua PayPal",
        description: "Thanh toán dễ dàng, an tâm cùng PayPal",
        iconText: null,
        iconImg: "public/paypal.png",
        value: "PAYPAL"
    },
    {
        title: "Thanh toán qua Stripe",
        description: "Thanh toán dễ dàng, an tâm cùng Stripe",
        iconText: null,
        iconImg: "public/stripe.png",
        value: "STRIPE"
    },
]

export const availableMeasurementUnits = [
    {
        title: 'g',
        name: 'G'
    },
    {
        title: 'kg',
        name: 'KG'
    },
    {
        title: 'k',
        name: 'L'
    },
    {
        title: 'ml',
        name: 'ML'
    }
]

export const availableGenders = [
    {
        title: 'Nam',
        name: 'MALE'
    },
    {
        title: 'Nữ',
        name: 'FEMALE'
    }
]