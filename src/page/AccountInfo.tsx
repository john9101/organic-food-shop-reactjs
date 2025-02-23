import {Separator} from "@/components/ui/separator.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {editAccountInfoSchema} from "@/schema/auth-account-user.schema.ts";
import {EditAccountInfoRequest} from "@/type/request/account.request.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {availableGenders} from "@/constant/available.constant.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "@heroicons/react/24/outline";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect} from "react";
import {toast} from "sonner";
import {editAccountInfo, resetEditedAccountInfo} from "@/redux/slice/account.slice.ts";

const AccountInfo = () => {
    const dispatch = useAppDispatch()
    const {account} = useAppSelector(state => state.account)
    const gotAccountInfo = account.info.got
    const editedAccountInfo = account.info.edited

    useEffect(() => {
        if (gotAccountInfo){
            form.reset({
                fullName: gotAccountInfo.full_name,
                email: gotAccountInfo.email,
                phone: gotAccountInfo.phone,
                dob: gotAccountInfo.dob,
                gender: gotAccountInfo.gender,
            })
        }
    }, [gotAccountInfo]);

    useEffect(() => {
        if (editedAccountInfo){
            toast.success(`Đã chỉnh sửa thông tin tài khoản thành công`, {
                position: "bottom-center",
                duration: 2000,
                className: "w-72"
            })
            dispatch(resetEditedAccountInfo())
        }
    }, [editedAccountInfo]);

    const form = useForm<EditAccountInfoRequest>({
        resolver: yupResolver(editAccountInfoSchema)
    })

    const onSubmit = (body: EditAccountInfoRequest) => {
        const promise = dispatch(editAccountInfo(body))
        return () => promise.abort()
    }

    return (
        <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-green-600">Thông tin tài khoản</h3>
                    <p className="text-sm text-muted-foreground">
                        Đây là cách người khác sẽ nhìn thấy bạn trên trang web
                    </p>
                </div>
                <Separator orientation="horizontal" className="w-full"/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem className="grid">
                                    <FormLabel className='text-black'>Họ và tên <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid">
                                    <FormLabel className='text-black'>Email <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="grid">
                                    <FormLabel className='text-black'> Số điện thoại <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="grid">
                                        <FormLabel>Giới tính</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    availableGenders.map((gender, index) => (
                                                        <SelectItem key={index} value={gender.name}>{gender.title}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="grid">
                                        <FormLabel>Ngày sinh</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "text-left w-full font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value && format(field.value, "P")}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="bg-green-600 hover:bg-green-500">Lưu thay đổi</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AccountInfo;