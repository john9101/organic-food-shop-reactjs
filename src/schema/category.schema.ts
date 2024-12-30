import * as yup from "yup";

export const categorySchema = yup.object().shape({
    name: yup.string().required("Tên danh mục sản phẩm không được bỏ trống"),
    description: yup.string(),
})

export const addCategorySchema = categorySchema
export const editCategorySchema = categorySchema