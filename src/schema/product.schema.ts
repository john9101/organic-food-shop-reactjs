import * as yup from "yup";
import {formatCurrency} from "@/util/decoration.util.ts";

export const productSchema = yup.object().shape({
    name: yup.string().required("Tên sản phẩm không được bỏ trống"),
    shortDescription: yup.string(),
    longDescription: yup.string(),
    measurementValue: yup.number().required("Giá trị đo lường không được bỏ trống").min(1, ({min}) => `Giá trị đo lường ít nhất là ${min}`),
    measurementUnit: yup.string().required("Đơn vị đo lường không được bỏ trống"),
    regularPrice: yup.number().required("Giá bán không được bỏ trống").min(10000, ({min}) => `Giá bán ít nhất là ${formatCurrency(min)}`),
    discountPercent: yup.number()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
    ,
    // images: yup.mixed<File[]>()
    //     .test("isRequired", "Sản phẩm phải có ít nhất 1 hình ảnh", (value) => value && value.length > 0)
    //     .test("isImage", "Định dạng hình ảnh chưa hợp lệ (định dạng hỗ trợ: jpeg, png, gif)", (value) => {
    //         if (!value) return false;
    //         const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    //         return Array.from(value).every((file: File) => supportedFormats.includes(file.type));
    //     })
    //     .test("fileSize", "Kích thước mỗi hình ảnh không được vượt quá 5MB", (value) => {
    //         if (!value) return false;
    //         const maxSize = 5 * 1024 * 1024;
    //         return Array.from(value).every((file: File) => file.size <= maxSize);
    //     }),

    images: yup.array()
        .of(
            yup.mixed<File>()
                .required()
                .test('fileSize', 'File size is too large (max 5MB)', (file) => {
                    return file && file.size <= 2 * 1024 * 1024;
                })
                .test('fileType', 'Định dạng không hỗ trợ', (file) => {
                    return (
                        file && ['image/jpeg', 'image/png'].includes(file.type)
                    );
                })
        )
        .required()
        .min(1, ({min}) => `Sản phẩm phải có ít nhất ${min} hình ảnh`),
    categoryId: yup.number()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
    ,
    brandId: yup.number()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
    ,
})

export const addProductSchema = productSchema

export const editProductSchema = productSchema