import * as yup from "yup";
import {availablePaymentMethods} from "@/constant/available.constant.ts";

export const placeOrderSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được bỏ trống"),
    phone: yup.string().required("Số điện thoại không được bỏ trống"),
    email: yup.string().email("Email không hợp lệ").required("Email không được bỏ trống"),
    address: yup.string().required("Địa chỉ không được bỏ trống"),
    province: yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
    district: yup.string().required("Quận/Huyện không được bỏ trống"),
    commune: yup.string().required("Phường/Xã không được bỏ trống"),
    note: yup.string(),
    paymentMethod: yup.string().oneOf(availablePaymentMethods.map(paymentMethod => paymentMethod.value)),
    shippingMethod: yup.string(),
})

