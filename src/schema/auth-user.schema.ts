import * as yup from "yup";

const authUserSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được bỏ trống"),
    username: yup.string().required("Tên người dùng không được bỏ trống"),
    phone: yup.string().required("Số điện thoại không được bỏ trống"),
    email: yup.string().email("Email không hợp lệ").required("Email không được bỏ trống"),
    password: yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, "Mật khẩu phải tối thiểu 6 ký tự"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không trùng khớp")
        .required("Mật khẩu nhập lại không được bỏ trống"),
    gender: yup.string(),
    dob: yup.date(),
    addresses: yup.array().of(
        yup.object().shape({
            specificPlace: yup.string().required("Địa chỉ không được bỏ trống"),
            province: yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
            district: yup.string().required("Quận/Huyện không được bỏ trống"),
            commune: yup.string().required("Phường/Xã không được bỏ trống"),
        })
    )
})

export const registerSchema = authUserSchema.pick(["fullName", "username", "phone", "email", "password", "confirmPassword"]);

export const loginSchema = authUserSchema.pick(["email", "password"]);

export const addCustomerSchema = authUserSchema;

export const editCustomerSchema = authUserSchema.omit(["password", "confirmPassword", "username"])

//     yup.object().shape({
//     email: authUserSchema.fields.email as yup.StringSchema<string>,
//     password: authUserSchema.fields.password as yup.StringSchema<string>,
// })