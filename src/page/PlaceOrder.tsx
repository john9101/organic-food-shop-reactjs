import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Link, useNavigate} from "react-router-dom";
import {
    BanknotesIcon,
    MapIcon,
    TicketIcon,
    RectangleGroupIcon,
    PercentBadgeIcon
} from "@heroicons/react/24/outline";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Textarea} from "@/components/ui/textarea.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {formatCurrency} from "@/util/decoration.util.ts";
import CouponTicket from "@/components/common/CouponTicket.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import PlaceOrderItem from "@/components/place-order/PlaceOrderItem.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import {availablePaymentMethods} from "@/constant/available.constant.ts";
import {PlaceOrderRequest} from "@/type/request/order.request.ts";
import {placeOrderSchema} from "@/schema/order.schema.ts";
import {placeOrder} from "@/redux/slice/order.slice.ts";

const PlaceOrder = () => {
    const {cart} = useAppSelector(state => state.cart)
    const cartSummary = cart.summary
    const navigate = useNavigate()
    const [openSelectionPlaceContent, setOpenSelectionPlaceContent] = useState<boolean>(false);
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)
    const dispatch = useAppDispatch()
    const {order} = useAppSelector(state => state.order)
    const placedOrder = order.placed

    useEffect(() => {
        if (placedOrder) {
            if (placedOrder.id){
                if(placedOrder.payment_url){
                    window.location.href = placedOrder.payment_url
                }else {
                    const params = new URLSearchParams({
                        id: placedOrder.id,
                        status: "success",
                        method: placedOrder.payment_method
                    })
                    navigate(`/order-result?${params}`)
                }
            }
        }
    },[placedOrder])

    const placeOrderForm = useForm<PlaceOrderRequest>({
        resolver: yupResolver(placeOrderSchema)
    })

    const onSubmitPlaceOrderForm = (body: PlaceOrderRequest) => {
        const promise = dispatch(placeOrder(body))
        return () => promise.abort()
    }

    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>) => {
        const response = await goongApi.searchPlace(event.target.value)
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions)
        }
    }

    return (
        <Form {...placeOrderForm} >
            <form onSubmit={placeOrderForm.handleSubmit(onSubmitPlaceOrderForm)}
                  className="container mx-auto px-4 2xl:px-0 md:py-8">
                <div className="space-y-3">
                    <Breadcrumb>
                        <BreadcrumbList className="text-base">
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to="/" className="text-neutral-900 flex hover:text-neutral-500 font-normal">Trang
                                        chủ</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to="/cart"
                                          className="text-neutral-900 flex hover:text-neutral-500 font-normal">Giỏ
                                        hàng</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-green-600 font-medium">Thanh toán</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="uppercase font-extrabold text-3xl text-green-600 tracking-tighter">Thanh toán</h2>
                </div>
                <div className="mt-4 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-6">
                        <div className="space-y-4">
                            <Badge className="text-base font-medium text-white bg-green-600 py-2 px-4"><MapIcon
                                className="w-4 h-4 mr-1"/>Thông tin giao hàng</Badge>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

                                <FormField
                                    control={placeOrderForm.control}
                                    name="recipientFullName"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Họ và tên người nhận hàng <span className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on" />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={placeOrderForm.control}
                                    name="recipientPhone"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Số điện thoại người nhận hàng <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={placeOrderForm.control}
                                    name="recipientEmail"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Email người nhận hàng <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={placeOrderForm.control}
                                    name="recipientSpecificPlace"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start col-span-3">
                                            <FormLabel className="text-black">Địa chỉ người nhận hàng <span className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input {...field} autoComplete="on"
                                                           onFocus={() => setOpenSelectionPlaceContent(true)}
                                                           onChange={handleSearchPlace}
                                                           onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                    />
                                                    {
                                                        openSelectionPlaceContent &&
                                                        <div
                                                            className="absolute top-full mt-2 rounded-md border border-input grid bg-white p-2 w-full">
                                                            {
                                                                listItemPlaces ? listItemPlaces.map((itemPlace, index) => (
                                                                    <div key={index}
                                                                         className="p-2 text-sm hover:bg-zinc-100 rounded-md cursor-pointer truncate"
                                                                         onClick={() => {
                                                                             field.onChange(itemPlace.description)
                                                                             placeOrderForm.setValue("province", itemPlace.compound.province)
                                                                             placeOrderForm.setValue("district", itemPlace.compound.district)
                                                                             placeOrderForm.setValue("commune", itemPlace.compound.commune)
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
                                            <FormMessage className='text-xs text-red-600'/>
                                        </FormItem>
                                    )}>
                                </FormField>

                                <FormField
                                    control={placeOrderForm.control}
                                    name="province"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Tỉnh/Thành phố <span
                                                className="text-red-600">*</span></FormLabel>
                                            {/*<Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                                            {/*    <FormControl>*/}
                                            {/*        <SelectTrigger>*/}
                                            {/*            <SelectValue placeholder="Chọn Tỉnh/Thành phố"/>*/}
                                            {/*        </SelectTrigger>*/}
                                            {/*    </FormControl>*/}
                                            {/*    <SelectContent>*/}
                                            {/*        <SelectItem value="m@example.com">abc</SelectItem>*/}
                                            {/*        <SelectItem value="m@google.com">xyz</SelectItem>*/}
                                            {/*        <SelectItem value="m@support.com">123</SelectItem>*/}
                                            {/*    </SelectContent>*/}
                                            {/*</Select>*/}
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={placeOrderForm.control}
                                    name="district"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Quận/Huyện <span className="text-red-600">*</span>
                                            </FormLabel>
                                            {/*<Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                                            {/*    <FormControl>*/}
                                            {/*        <SelectTrigger>*/}
                                            {/*            <SelectValue placeholder="Chọn Quận/Huyện"/>*/}
                                            {/*        </SelectTrigger>*/}
                                            {/*    </FormControl>*/}
                                            {/*    <SelectContent>*/}
                                            {/*        <SelectItem value="m@example.com">abc</SelectItem>*/}
                                            {/*        <SelectItem value="m@google.com">xyz</SelectItem>*/}
                                            {/*        <SelectItem value="m@support.com">123</SelectItem>*/}
                                            {/*    </SelectContent>*/}
                                            {/*</Select>*/}
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={placeOrderForm.control}
                                    name="commune"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Phường/Xã <span className="text-red-600">*</span>
                                            </FormLabel>
                                            {/*<Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                                            {/*    <FormControl>*/}
                                            {/*        <SelectTrigger>*/}
                                            {/*            <SelectValue placeholder="Chọn Phường/Xã"/>*/}
                                            {/*        </SelectTrigger>*/}
                                            {/*    </FormControl>*/}
                                            {/*    <SelectContent>*/}
                                            {/*        <SelectItem value="m@example.com">abc</SelectItem>*/}
                                            {/*        <SelectItem value="m@google.com">xyz</SelectItem>*/}
                                            {/*        <SelectItem value="m@support.com">123</SelectItem>*/}
                                            {/*    </SelectContent>*/}
                                            {/*</Select>*/}
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={placeOrderForm.control}
                                    name="note"
                                    render={({field}: { field: FieldValues }) => (
                                        <FormItem className="flex flex-col items-start col-span-3">
                                            <FormLabel>Ghi chú</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} autoComplete="on" rows={8}/>
                                            </FormControl>
                                            <FormMessage className='text-xs text-red-600'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Separator orientation="horizontal"/>
                        <div className="space-y-4">
                            <Badge className="text-base font-medium text-white bg-green-600 py-2 px-4"><BanknotesIcon className="w-4 h-4 mr-1"/>Phương thúc thanh toán</Badge>
                            <FormField
                                control={placeOrderForm.control}
                                name="paymentMethod"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-1 gap-4 md:grid-cols-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                                            >
                                                {
                                                    availablePaymentMethods.map((paymentMethod, index) => (
                                                        <FormItem className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                                            <div className="flex items-start">
                                                                <div className="flex h-5 items-center mt-0.5">
                                                                    <FormControl>
                                                                        <RadioGroupItem id={`payment-method-${index + 1}`} value={paymentMethod.name}/>
                                                                    </FormControl>
                                                                </div>

                                                                <div className="ms-4 text-sm flex-1">
                                                                    <FormLabel htmlFor={`payment-method-${index + 1}`} className="font-medium text-gray-900 dark:text-white relative grid grid-cols-5">
                                                                        <p className="col-span-4 leading-6">{paymentMethod.title}</p>
                                                                        {
                                                                            paymentMethod.iconImg ?
                                                                                <img src={paymentMethod.iconImg}
                                                                                     className="h-6 absolute right-0 top-1/2 translate-x-0 -translate-y-1/2"/> :
                                                                                <Badge
                                                                                    className="absolute right-0 top-1/2 translate-x-0 -translate-y-1/2 bg-amber-500 font-bold">{paymentMethod.iconText}</Badge>
                                                                        }
                                                                    </FormLabel>
                                                                    <FormDescription className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{paymentMethod.description}</FormDescription>
                                                                </div>
                                                            </div>
                                                        </FormItem>
                                                    ))
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className=" w-full space-y-6 lg:max-w-xs xl:max-w-md">
                        <div className="space-y-4">
                            <Badge
                                className="text-base font-medium text-white bg-green-600 py-2 px-4"><RectangleGroupIcon
                                className="w-4 h-4 mr-1"/>Sản phẩm</Badge>
                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-4">
                                {
                                    cartSummary?.items.map((item, index) => (
                                        <>
                                            <PlaceOrderItem key={index} item={item}/>
                                            {index != cartSummary?.items.length - 1 &&
                                                <Separator orientation="horizontal"/>}
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        <Separator orientation="horizontal"/>
                        <div className="space-y-4 text-xl">
                            <div className="flex justify-between">
                                <Badge
                                    className="text-base font-medium text-white bg-green-600 py-2 px-4"><PercentBadgeIcon
                                    className="w-4 h-4 mr-1"/>Mã khuyến mãi</Badge>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button type="button"
                                                className="rounded-full hover:bg-green-600 text-base h-auto"><TicketIcon/>Nhập
                                            hoặc chọn mã khuyến mãi</Button>
                                    </SheetTrigger>
                                    <SheetContent className="flex flex-col !w-[1000px]">
                                        <SheetHeader>
                                            <SheetTitle>Mã khuyến mãi</SheetTitle>
                                            <SheetDescription>Đừng quên tận dụng các ưu đãi từ mã khuyến mãi của chúng
                                                tôi để có được trải nghiệm mua hàng tốt hơn</SheetDescription>
                                        </SheetHeader>
                                        <div className="flex gap-2">
                                            <Input type="text" placeholder="Nhập mã giảm giá"/>
                                            <Button className="hover:bg-green-600">Áp dụng</Button>
                                        </div>
                                        <div
                                            className="flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            <div className="grid gap-4">
                                                <CouponTicket/>
                                                <CouponTicket/>
                                                <CouponTicket/>
                                                <CouponTicket/>
                                                <CouponTicket/>
                                                <CouponTicket/>
                                            </div>
                                        </div>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button type="button" className="w-full">Đóng</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-4">
                                <div className="grid gap-4">
                                    {/*<CouponTicket/>*/}
                                    {/*<CouponTicket/>*/}
                                </div>
                            </div>
                        </div>

                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tổng tiền tạm tính</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(cartSummary?.total_price)}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Giảm giá</dt>
                                    <dd className="text-base font-medium text-green-600">0</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng tiền đơn hàng</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Button type="submit"
                                    className=' bg-green-600 hover:bg-green-500  text-lg py-6 tracking-tighter font-semibold'>Đặt
                                hàng</Button>
                            <div className="flex text-base items-center justify-center gap-1">
                                <span className="font-normal text-gray-500 dark:text-gray-400">Hoặc</span>
                                <Link to="/cart" title=""
                                      className="inline-flex items-center font-semibold text-black underline hover:underline hover:text-green-600">
                                    Quay lại giỏ hàng
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
export default PlaceOrder