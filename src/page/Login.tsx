import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import Logo from "@/components/common/Logo.tsx";
import {useForm} from "react-hook-form";
import {LoginRequest} from "@/type/request/authentication.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/schema/auth-account-user.schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect} from "react";
import {login} from "@/redux/slice/authentication.slice.ts";
import {toast} from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {isAuthenticated, authentication} = useAppSelector(state => state.authentication)
    const loggedInAuth = authentication.loggedIn;

    useEffect(() => {
        if (isAuthenticated && loggedInAuth){
            toast.success("Đăng nhập thành công", {
                position: "bottom-center"
            })
            navigate("/")
        }
    },[isAuthenticated, loggedInAuth])

    const loginForm = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema)
    })

    const onSubmit = (body: LoginRequest) => {
        const promise = dispatch(login(body))
        return () => promise.abort()
        // try {
        //     const response = await authenticationApi.login(body);
        //     if (response.status === HttpStatusCode.Ok &&
        //         response.data.status === HttpStatusCode.Ok &&
        //         response.data.data) {
        //         dispatch(setUserInfo(response.data.data))
        //         localStorage.setItem('access_token', response.data.data.access_token!)
        //         toast({
        //             className: "bg-green-500 text-white text-base",
        //             variant: "default",
        //             title: "Đăng nhập tài khoản thành công",
        //             duration: 2000
        //         })
        //     }else {
        //         toast({
        //             className: "text-base",
        //             variant: "destructive",
        //             title: "Đăng nhập tài khoản không thành công",
        //             duration: 2000,
        //         })
        //     }
        // }catch (error) {
        //     if (isAxiosUnauthorizedError<FailureApiResponse<ErrorField[]>>(error) && error.response) {
        //         toast({
        //             className: "text-base",
        //             variant: "destructive",
        //             title: "Đăng nhập tài khoản không thành công",
        //             description: error.response.data.error[0].detail,
        //             duration: 2000
        //         })
        //     }
        // }
    }

    return (
        <div className="p-40 flex">
            <Card className="m-auto max-w-lg text-left">
                <CardHeader>
                    <Logo/>
                    <CardTitle className="text-2xl text-green-600 font-bold">Đăng nhập tài khoản</CardTitle>
                    <CardDescription>
                        Rất nhiều đặc quyền và quyền lợi mua sắm đang chờ bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Button variant="outline"
                                className="w-full font-semibold border-green-600 hover:bg-green-50 hover:border-green-500 flex">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0"
                            >
                                <path
                                    d="M15.0007 8.15571C15.0007 7.58016 14.953 7.16016 14.8499 6.72461H8.14357V9.32236H12.08C12.0007 9.96793 11.5721 10.9402 10.6197 11.5935L10.6064 11.6804L12.7268 13.2902L12.8737 13.3046C14.2229 12.0835 15.0007 10.2868 15.0007 8.15571Z"
                                    fill="#4285F4">
                                </path>
                                <path
                                    d="M8.14312 15.0004C10.0717 15.0004 11.6907 14.3781 12.8733 13.3048L10.6193 11.5936C10.0161 12.0059 9.20659 12.2936 8.14312 12.2936C6.25425 12.2936 4.6511 11.0726 4.07962 9.38477L3.99585 9.39174L1.79101 11.064L1.76218 11.1425C2.93676 13.4292 5.34946 15.0004 8.14312 15.0004Z"
                                    fill="#34A853">
                                </path>
                                <path
                                    d="M4.08003 9.38399C3.92924 8.94844 3.84197 8.48174 3.84197 7.99954C3.84197 7.51729 3.92924 7.05064 4.0721 6.61509L4.06811 6.52233L1.83563 4.82324L1.76259 4.85729C1.27848 5.80619 1.0007 6.87177 1.0007 7.99954C1.0007 9.12732 1.27848 10.1928 1.76259 11.1417L4.08003 9.38399Z"
                                    fill="#FBBC05">
                                </path>
                                <path
                                    d="M8.14316 3.70665C9.48441 3.70665 10.3892 4.27442 10.905 4.7489L12.9209 2.82C11.6829 1.69223 10.0717 1 8.14316 1C5.34948 1 2.93677 2.5711 1.76218 4.85775L4.0717 6.61555C4.65111 4.92777 6.25428 3.70665 8.14316 3.70665Z"
                                    fill="#EA4335">
                                </path>
                            </svg>
                            <span className="flex-grow">
                            Đăng nhập với Google
                        </span>
                        </Button>
                        <Button variant="outline"
                                className="w-full font-semibold border-green-600 hover:bg-green-50 hover:border-green-500 flex">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0"
                            >
                                <circle cx="8" cy="8" r="7" fill="#1877F2"></circle>
                                <path
                                    d="M10.6069 10.1408L10.9178 8.16505H8.97261V6.8835C8.97261 6.34285 9.24383 5.81553 10.1151 5.81553H11V4.1335C11 4.1335 10.1973 4 9.43013 4C7.82742 4 6.78083 4.94647 6.78083 6.65922V8.16505H5V10.1408H6.78083V14.9172C7.13835 14.972 7.50412 15 7.87672 15C8.24932 15 8.61509 14.972 8.97261 14.9172V10.1408H10.6069Z"
                                    fill="white">
                                </path>
                            </svg>
                            <span className="flex-grow">
                            Đăng nhập với Facebook
                        </span>
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                        <div className="relative flex justify-center my-4 font-medium text-sm text-muted-foreground">
                            <span className="bg-background px-2">Hoặc đăng nhập bằng</span>
                        </div>
                    </div>

                    <Form {...loginForm} >
                        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="grid gap-4">
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="grid">
                                        <FormLabel className='text-black'>Email <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="grid">
                                        <div className="flex items-center">
                                            <FormLabel className='text-black'>Mật khẩu <span className="text-red-600">*</span></FormLabel>
                                            <Link to="" className="ml-auto inline-block hover:underline font-semibold text-sm text-black hover:text-green-600">Quên mật khẩu?</Link>
                                        </div>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit"
                                    className="w-full font-bold bg-green-600 hover:bg-green-500 hover:border-green-500">
                                Đăng nhập
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Bạn chưa có tài khoản? <Link to="/register"
                                                     className="hover:underline text-black hover:text-green-600 font-bold">Đăng
                        ký</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login