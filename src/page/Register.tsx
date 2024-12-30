import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// import {ErrorField, FailureApiResponse} from '@/type/response/api.type.ts'
import { useNavigate } from 'react-router-dom';
import Logo from "@/components/common/Logo.tsx";
import {RegisterRequest} from "@/type/request/authentication.request.ts";
import {registerSchema} from "@/schema/auth-user.schema.ts";
import {useToast} from "@/hooks/use-toast.ts";
import authenticationApi from "@/api/authentication.api.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {HttpStatusCode} from "axios";

const Register = () => {
    const navigate = useNavigate();
    const { toast } = useToast()

    const registerForm = useForm<RegisterRequest>({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = async (body: RegisterRequest) => {
        const response = await authenticationApi.register(body);
        if (response.status === HttpStatusCode.Created) {
            toast({
                className: "bg-green-500 text-white",
                variant: "default",
                title: "Đăng ký tài khoản thành công",
                description: `Chúng tôi đã gửi liên kết xác nhận tài khoản đến email ${response.data.data.email}`,
                duration: 4000
            })
            setTimeout(() => {
                navigate("/login");
            },2000)
        }else {
            toast({
                variant: "destructive",
                title: "Đăng ký tài khoản không thành công",
                description: "Một số vấn đề đã xảy ra với yêu cầu đăng ký của bạn",
                duration: 2000,
                action: <ToastAction altText="Thử lại">Thử lại</ToastAction>,
            })
        }

    }

    return (
        <div className="flex p-32">
            <Card className="m-auto max-w-lg text-left">
                <CardHeader>
                    <Logo/>
                    <CardTitle className="text-2xl font-bold text-green-600">Đăng ký tài khoản</CardTitle>
                    <CardDescription>Rất nhiều đặc quyền và quyền lợi mua sắm đang chờ bạn</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...registerForm} >
                        <form onSubmit={registerForm.handleSubmit(onSubmit)} className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4 items-start">
                                <FormField
                                    control={registerForm.control}
                                    name="fullName"
                                    render={({field}) => (
                                        <FormItem className="grid">
                                            <FormLabel className='text-black'>Họ và tên <span
                                                className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={registerForm.control}
                                    name="username"
                                    render={({field}) => (
                                        <FormItem className="grid">
                                            <FormLabel className='text-black'>Tên đăng nhập <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={registerForm.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem className="grid">
                                        <FormLabel className='text-black'>Số điện thoại <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className='text-xs text-red-600'/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={registerForm.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="grid">
                                        <FormLabel className='text-black'>Email <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={registerForm.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="grid">
                                        <FormLabel className='text-black'>Mật khẩu <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={registerForm.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem className="grid">
                                        <FormLabel className='text-black'>Nhập lại mật khẩu <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit"
                                    className="w-full font-bold bg-green-600 hover:bg-green-500 hover:border-green-500">
                                Đăng ký
                            </Button>
                            <div className="text-center text-sm">
                                Bạn đã có tài khoản? {" "}
                                <Link to="/login" className="hover:underline text-black hover:text-green-600 font-bold">Đăng
                                    nhập</Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register