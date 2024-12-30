import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "@heroicons/react/24/outline";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useForm} from "react-hook-form";
import {AddCustomerRequest} from "@/type/request/user.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {addCustomerSchema} from "@/schema/auth-user.schema.ts";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {addCustomer} from "@/redux/slice/user.slice.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";

const AddCustomer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.user);
    const addedCustomer = user.customer.added
    const [openSelectionPlaceContent, setOpenSelectionPlaceContent] = useState<boolean>(false);
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)
    const [showCompound, setShowCompound] = useState<boolean>(false);
    useEffect(() =>{
        if (addedCustomer){
            navigate(`/customer-management`);
        }
    }, [addedCustomer])


    const addCustomerForm = useForm<AddCustomerRequest>({
        resolver: yupResolver(addCustomerSchema),
    })

    const onSubmitAddCustomerForm = (body: AddCustomerRequest) => {
        const promise = dispatch(addCustomer(body))
        return () => promise.abort()
    }

    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>) => {
        setShowCompound(false)
        const response = await goongApi.searchPlace(event.target.value)
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions)
        }
    }

    return (
        <div className="grid gap-4 px-4">
            <h2 className="text-2xl font-bold tracking-tighter">Chi tiết khách hàng</h2>
            <div>
                <h3>Thông tin liên hệ</h3>
                <Form {...addCustomerForm}>
                    <form onSubmit={addCustomerForm.handleSubmit(onSubmitAddCustomerForm)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={addCustomerForm.control}
                                name="fullName"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Họ và tên <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Tên người dùng <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Email <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Số điện thoại <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Mật khẩu <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Nhập lại mật khẩu <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-2 grid grid-cols-3 gap-6">
                                <FormField
                                    control={addCustomerForm.control}
                                    name="gender"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Giới tính</FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addCustomerForm.control}
                                    name="age"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Tuổi</FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addCustomerForm.control}
                                    name="dob"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Ngày sinh</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "P")
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <CalendarIcon
                                                                className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={addCustomerForm.control}
                                name="specificAddress"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Địa chỉ</FormLabel>
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input
                                                    {...field}
                                                    autoComplete="on"
                                                    onFocus={() => setOpenSelectionPlaceContent(true)}
                                                    onChange={handleSearchPlace}
                                                    onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                />
                                                {
                                                    openSelectionPlaceContent &&
                                                    <div
                                                        className="absolute shadow-sm top-full mt-2 rounded-md border border-input grid bg-white p-2 w-full">
                                                        {
                                                            listItemPlaces ? listItemPlaces.map((itemPlace, index) => (
                                                                <div key={index}
                                                                     className="p-2 text-sm hover:bg-zinc-100 rounded-md cursor-pointer truncate"
                                                                     onClick={() => {
                                                                         field.onChange(itemPlace.description)
                                                                         addCustomerForm.setValue("province", itemPlace.compound.province)
                                                                         addCustomerForm.setValue("district", itemPlace.compound.district)
                                                                         addCustomerForm.setValue("commune", itemPlace.compound.commune)
                                                                         setShowCompound(true)
                                                                         setOpenSelectionPlaceContent(false);
                                                                     }}
                                                                >
                                                                    {itemPlace.description}
                                                                </div>
                                                            )) : <div className="text-sm place-self-center my-8">Kết
                                                                quả tìm kiếm địa chỉ hiển thị tại đây</div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {
                                showCompound &&
                                <div className="col-span-2 grid grid-cols-3 gap-6">
                                    <FormField
                                        control={addCustomerForm.control}
                                        name="province"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Tỉnh/Thành phố</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on" disabled/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addCustomerForm.control}
                                        name="district"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Quận/Huyện</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on" disabled/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addCustomerForm.control}
                                        name="commune"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Phường/Xã</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on" disabled/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            }
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" asChild className="hover:text-black">
                                <Link to="/customer-management">Hủy</Link>
                            </Button>
                            <Button type="submit">Lưu</Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div>
                <h3>Số địa chỉ</h3>
                <Form {...addCustomerForm}>
                    <form onSubmit={addCustomerForm.handleSubmit(onSubmitAddCustomerForm)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={addCustomerForm.control}
                                name="fullName"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Họ và tên <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Tên người dùng <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Email <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Số điện thoại <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Mật khẩu <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addCustomerForm.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Nhập lại mật khẩu <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-2 grid grid-cols-3 gap-6">
                                <FormField
                                    control={addCustomerForm.control}
                                    name="gender"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Giới tính</FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addCustomerForm.control}
                                    name="age"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Tuổi</FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addCustomerForm.control}
                                    name="dob"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Ngày sinh</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "P")
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <CalendarIcon
                                                                className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={addCustomerForm.control}
                                name="specificAddress"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Địa chỉ</FormLabel>
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input
                                                    {...field}
                                                    autoComplete="on"
                                                    onFocus={() => setOpenSelectionPlaceContent(true)}
                                                    onChange={handleSearchPlace}
                                                    onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                />
                                                {
                                                    openSelectionPlaceContent &&
                                                    <div
                                                        className="absolute shadow-sm top-full mt-2 rounded-md border border-input grid bg-white p-2 w-full">
                                                        {
                                                            listItemPlaces ? listItemPlaces.map((itemPlace, index) => (
                                                                <div key={index}
                                                                     className="p-2 text-sm hover:bg-zinc-100 rounded-md cursor-pointer truncate"
                                                                     onClick={() => {
                                                                         field.onChange(itemPlace.description)
                                                                         addCustomerForm.setValue("province", itemPlace.compound.province)
                                                                         addCustomerForm.setValue("district", itemPlace.compound.district)
                                                                         addCustomerForm.setValue("commune", itemPlace.compound.commune)
                                                                         setShowCompound(true)
                                                                         setOpenSelectionPlaceContent(false);
                                                                     }}
                                                                >
                                                                    {itemPlace.description}
                                                                </div>
                                                            )) : <div className="text-sm place-self-center my-8">Kết
                                                                quả tìm kiếm địa chỉ hiển thị tại đây</div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {
                                showCompound &&
                                <div className="col-span-2 grid grid-cols-3 gap-6">
                                    <FormField
                                        control={addCustomerForm.control}
                                        name="province"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Tỉnh/Thành phố</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on" disabled/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addCustomerForm.control}
                                        name="district"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Quận/Huyện</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on" disabled/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addCustomerForm.control}
                                        name="commune"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Phường/Xã</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on" disabled/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            }
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" asChild className="hover:text-black">
                                <Link to="/customer-management">Hủy</Link>
                            </Button>
                            <Button type="submit">Lưu</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddCustomer