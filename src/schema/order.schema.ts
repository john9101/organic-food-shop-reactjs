import * as yup from "yup";

export const orderSchema = yup.object().shape({
    customerId: yup.number().required("Khách hàng mua không được để trống"),
    recipientFullName: yup.string().required("Họ và tên người nhận hàng không được bỏ trống"),
    recipientPhone: yup.string().required("Số điện thoại người nhận hàng không được bỏ trống"),
    recipientEmail: yup.string().email("Email người nhận hàng không hợp lệ").required("Email người nhận hàng không được bỏ trống"),
    recipientSpecificPlace: yup.string().required("Địa chỉ người nhận hàng không được bỏ trống"),
    province: yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
    district: yup.string().required("Quận/Huyện không được bỏ trống"),
    commune: yup.string().required("Phường/Xã không được bỏ trống"),
    paymentMethod: yup.string().required("Phương thức thanh toán không được bỏ trống"),
    items: yup.array().of(
        yup.object().shape({
            productId: yup.number().required(),
            quantity: yup.number().required(),
        })
    ).min(1, ({min}) => `Chọn ít nhất ${min} sản phẩm`),
    voucherId: yup.number(),
    orderStatus: yup.string(),
    transactionStatus: yup.string(),
    note: yup.string().notRequired(),
})

export const placeOrderSchema = orderSchema.omit(["customerId"])
export const addOrderSchema = orderSchema.omit(["orderStatus", "transactionStatus"]);
export const editOrderSchema = orderSchema.omit(["items", "voucherId", "customerId"]);

