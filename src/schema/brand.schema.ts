import * as yup from "yup";

export const brandSchema = yup.object().shape({
    name: yup.string().required("Tên thương hiệu không được bỏ trống"),
    description: yup.string().notRequired().nullable(),
})

export const addBrandSchema = brandSchema
export const editBrandSchema = brandSchema

