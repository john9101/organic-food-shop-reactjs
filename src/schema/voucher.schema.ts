import * as yup from "yup";
import {formatCurrency} from "@/util/decoration.util.ts";

export const voucherSchema = yup.object().shape({
    code: yup.string().required("Code không được bỏ trống"),
    discountPercent: yup
        .number()
        .required("Phần trăm giảm giá không được bỏ trống")
        .typeError("Phần trăm giảm giá phải là số")
        .min(3, ({min}) => `Phần trăm giảm giá ít nhất là ${min}%`)
    ,
    quantity: yup
        .number()
        .required("Số lượt áp dụng không được bỏ trống")
        .typeError("Số lượng áp dụng phải là số")
        .min(1, ({min}) => `Số lượng áp dụng ít nhất là ${min}`)
    ,
    minimumAmount: yup
        .number()
        .required("Giá tối thiểu áp dụng không được bỏ trống")
        .typeError("Giá tối thiểu áp dụng phải là số")
        .min(0, ({min}) => `Giá tối thiểu ấp dụng ít nhất là ${formatCurrency(min)}`)
    ,
    effectiveDate: yup.date().required("Ngày hiệu lực không được bỏ trống"),
    expiryDate: yup.date().required("Ngày hết hạng không được bỏ trống"),
    description: yup.string().notRequired().nullable()
})

export const editVoucherSchema = voucherSchema
export const addVoucherSchema = voucherSchema