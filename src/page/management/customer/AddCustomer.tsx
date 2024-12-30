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
import {addCustomer, resetAddedCustomer} from "@/redux/slice/user.slice.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";
import {Separator} from "@/components/ui/separator.tsx";

const AddCustomer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.user);
    const addedCustomer = user.customer.added
    const [addressFieldsCount, setAddressFieldsCount] = useState<number>(1);
    const [openSelectionPlaceContents, setOpenSelectionPlaceContents] = useState<boolean[]>(new Array(addressFieldsCount).fill(false));
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)
    const [showCompound, setShowCompound] = useState<boolean>(false);
    useEffect(() => {
        if (addedCustomer) {
            dispatch(resetAddedCustomer())
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

    const handleFocusAddressField = (index: number) => {
        setOpenSelectionPlaceContents(prevState =>
            prevState.map((open, idx) => idx === index ? true : open)
        );
    };
    const handleBlurAddressField = (index: number) => {
        setTimeout(() => {
            setOpenSelectionPlaceContents(prevState =>
                prevState.map((open, idx) => idx === index ? false : open)
            );
        }, 200);
    };

    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>) => {
        setShowCompound(false)
        const response = await goongApi.searchPlace(event.target.value)
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions)
        }
    }

    const handleChangeAddressField = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
        addCustomerForm.setValue(`addresses.${index}.specificPlace`, e.target.value);
        await handleSearchPlace(e);
    };

    return (
        <div className="grid gap-4 px-4">
            <h2 className="text-2xl font-bold tracking-tighter">Thêm mới khách hàng <Separator orientation="horizontal" className="mt-2 w-1/12"/></h2>
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
                                        <FormLabel className="text-black">Tuổi</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
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

                        <div className="grid gap-y-6 col-span-2">
                            {
                                Array.from({ length: addressFieldsCount }, (_, i) => i).map((_, i) => (
                                    <div className="flex gap-x-6">
                                        <FormField
                                            key={i}
                                            control={addCustomerForm.control}
                                            name={`addresses.${i}.specificPlace`}
                                            render={({field}) => {
                                                return (
                                                    <FormItem className="flex flex-col items-start col-span-2 flex-1">
                                                        <FormLabel className="text-black">Địa chỉ {addressFieldsCount > 1 && i + 1} <span
                                                            className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            <div key={i} className="relative w-full">
                                                                <Input
                                                                    {...field}
                                                                    // autoComplete="on"
                                                                    // onFocus={() => setOpenSelectionPlaceContent(true)}
                                                                    // onChange={handleSearchPlace}
                                                                    // onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                                    autoComplete="on"
                                                                    onFocus={() =>  handleFocusAddressField(i)}
                                                                    onChange={(e) => handleChangeAddressField(e, i)}
                                                                    onBlur={() => handleBlurAddressField(i)}
                                                                />
                                                                {
                                                                    openSelectionPlaceContents[i]  &&
                                                                    <div className="z-10 absolute shadow-sm top-full mt-2 rounded-md border border-input grid bg-white p-2 w-full">
                                                                        {
                                                                            listItemPlaces ? listItemPlaces.map((itemPlace, index) => (
                                                                                <div key={index}
                                                                                     className="p-2 text-sm hover:bg-zinc-100 rounded-md cursor-pointer truncate"
                                                                                     onClick={() => {
                                                                                         field.onChange(itemPlace.description)
                                                                                         addCustomerForm.setValue(`addresses.${i}.province`, itemPlace.compound.province)
                                                                                         addCustomerForm.setValue(`addresses.${i}.district`, itemPlace.compound.district)
                                                                                         addCustomerForm.setValue(`addresses.${i}.commune`, itemPlace.compound.commune)
                                                                                         setShowCompound(true)
                                                                                         setOpenSelectionPlaceContents(prevState =>
                                                                                             prevState.map((open, idx) => idx === index ? false : open)
                                                                                         );
                                                                                         setListItemPlaces(null)
                                                                                     }}
                                                                                >
                                                                                    {itemPlace.description}
                                                                                </div>
                                                                            )) : <div
                                                                                className="text-sm place-self-center my-8">Kết
                                                                                quả tìm kiếm địa chỉ hiển thị tại đây</div>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-xs text-red-600"/>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                        {
                                            showCompound &&
                                            <div className="grid grid-cols-3 gap-6">
                                                <FormField
                                                    control={addCustomerForm.control}
                                                    name={`addresses.${i}.province`}
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
                                                    name={`addresses.${i}.district`}
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
                                                    name={`addresses.${i}.commune`}
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
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Separator className="w-1/12" orientation="horizontal"/>
                        <Separator className="w-1/12" orientation="horizontal"/>
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" className="border-dashed" onClick={() => setAddressFieldsCount(addressFieldsCount + 1)}>Thêm địa chỉ</Button>
                        <div className="space-x-2">
                            <Button variant="secondary" asChild className="hover:text-black">
                                <Link to="/customer-management">Hủy</Link>
                            </Button>
                            <Button type="submit">Lưu</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddCustomer