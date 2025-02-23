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
            specificPlace: yup.string(),
            province: yup.string(),
            district: yup.string(),
            commune: yup.string(),
        })
    ),
    salary: yup.number().required("Lương không được bỏ trống"),
    hireDate: yup.date().required("Ngày nhận việc không được bỏ trống"),
    employmentStatus: yup.string(),
})

const accountSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được bỏ trống"),
    username: yup.string().required("Tên người dùng không được bỏ trống"),
    phone: yup.string().required("Số điện thoại không được bỏ trống"),
    email: yup.string().email("Email không hợp lệ").required("Email không được bỏ trống"),
    gender: yup.string(),
    dob: yup.date(),
    oldPassword: yup.string()
        .required("Mật khẩu cũ không được bỏ trống")
        .min(6, "Mật khẩu cũ phải tối thiểu 6 ký tự")
    ,
    newPassword: yup.string()
        .required("Mật khẩu cũ không được bỏ trống")
        .min(6, "Mật khẩu cũ phải tối thiểu 6 ký tự")
    ,
    confirmNewPassword: yup.string()
        .oneOf([yup.ref("password")], "Mật khẩu mới nhập lại không trùng khớp")
        .required("Mật khẩu mới nhập lại không được bỏ trống")
    ,
    specificPlace: yup.string().required("Địa chỉ không được bỏ trống"),
    province: yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
    district: yup.string().required("Quận/Huyện không được bỏ trống"),
    commune: yup.string().required("Phường/Xã không được bỏ trống"),
})

export const registerSchema = authUserSchema.pick(["fullName", "username", "phone", "email", "password", "confirmPassword"]);

export const loginSchema = authUserSchema.pick(["email", "password"]);

export const addCustomerSchema = authUserSchema.omit(["salary", "hireDate", "employmentStatus"]);

export const editCustomerSchema = authUserSchema.omit(["password", "confirmPassword", "username", "salary", "hireDate", "employmentStatus"]);

export const addEmployeeSchema = authUserSchema.omit(["employmentStatus"]);

export const editEmployeeSchema = authUserSchema;

export const editAccountInfoSchema = accountSchema.pick(["fullName", "phone", "email", "gender", "dob"]);

export const changePasswordAccountSchema = accountSchema.pick(["oldPassword", "newPassword", 'confirmNewPassword']);

export const addAccountAddressSchema = accountSchema.pick(['specificPlace', 'province', 'district', 'commune'])

export const editAccountAddressSchema = accountSchema.pick(['specificPlace', 'province', 'district', 'commune'])

//     yup.object().shape({
//     email: authAccountUserSchema.fields.email as yup.StringSchema<string>,
//     password: authAccountUserSchema.fields.password as yup.StringSchema<string>,
// })