import {Separator} from "@/components/ui/separator.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {changePasswordAccountSchema} from "@/schema/auth-account-user.schema.ts";
import {ChangePasswordAccountRequest} from "@/type/request/account.request.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect} from "react";
import {toast} from "sonner";
import {
    changePasswordAccount, resetChangedAccountPassword,
} from "@/redux/slice/account.slice.ts";

const AccountChangePassword = () => {
    const dispatch = useAppDispatch()
    const {account} = useAppSelector(state => state.account)
    const changedPasswordAccount = account.password.changed

    useEffect(() => {
        if (changedPasswordAccount) {
            toast.success(`Đã thay đổi mật khẩu thành công`, {
                position: "bottom-center",
                duration: 2000,
                className: "w-72"
            })
            dispatch(resetChangedAccountPassword())
        }
    }, [changedPasswordAccount]);

    const form = useForm<ChangePasswordAccountRequest>({
        resolver: yupResolver(changePasswordAccountSchema)
    })

    const onSubmit = (body: ChangePasswordAccountRequest) => {
        const promise = dispatch(changePasswordAccount(body))
        return () => promise.abort()
    }

    return (
        <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-green-600">Đổi mật khẩu</h3>
                    <p className="text-sm text-muted-foreground">
                        Thay đổi mật khẩu định kỳ để bảo vệ tài khoản tốt hơn
                    </p>
                </div>
                <Separator orientation="horizontal" className="w-full"/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({field}) => (
                                <FormItem className="grid">
                                    <FormLabel className='text-black'>Mật khẩu cũ <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({field}) => (
                                <FormItem className="grid">
                                    <FormLabel className='text-black'>Mật khẩu mới <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({field}) => (
                                <FormItem className="grid">
                                    <FormLabel className='text-black'>Nhập lại mật khẩu mới <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-green-600 hover:bg-green-500">Lưu thay đổi</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AccountChangePassword;