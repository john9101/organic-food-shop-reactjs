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
        name: "COD"
    },
    {
        title: "Thanh toán qua ví điện tử VNPAY",
        description: "Quét mã VNPAY, thanh toán nhanh trong tích tắc",
        iconText: null,
        iconImg: "public/vnpay.png",
        name: "VNPAY"
    },
    {
        title: "Thanh toán qua PayPal",
        description: "Thanh toán dễ dàng, an tâm cùng PayPal",
        iconText: null,
        iconImg: "public/paypal.png",
        name: "PAYPAL"
    },
    {
        title: "Thanh toán qua Stripe",
        description: "Thanh toán dễ dàng, an tâm cùng Stripe",
        iconText: null,
        iconImg: "public/stripe.png",
        name: "STRIPE"
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

export const availableTransactionStatuses = [
    {
        title: "Thành công",
        name: "SUCCESSFUL"
    },
    {
        title: "Chưa hoàn tất",
        name: "INCOMPLETE"
    },
    {
        title: "Thất bại",
        name: "FAILED"
    },
]

export const availableOrderStatuses = [
    {
        title: "Chờ duyệt",
        name: "PENDING"
    },
    {
        title: "Đã duyệt",
        name: "APPROVED"
    },
    {
        title: "Đang chuẩn bị",
        name: "PREPARING"
    },
    {
        title: "Đang giao",
        name: "DELIVERING"
    },
    {
        title: "Đã giao",
        name: "DELIVERED"
    },
    {
        title: "Bị hủy",
        name: "CANCELED"
    }
]