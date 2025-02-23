import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {EditOrderRequest} from "@/type/request/order.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {editOrderSchema} from "@/schema/order.schema.ts";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {editOrder, getOrderDetail, resetEditedOrder} from "@/redux/slice/order.slice.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";
import {Separator} from "@/components/ui/separator.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
    availableOrderStatuses,
    availablePaymentMethods,
    availableTransactionStatuses
} from "@/constant/available.constant.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {toast} from "sonner";

const EditOrder = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {id} = useParams()
    const {order} = useAppSelector(state => state.order);
    const editedOrder = order.edited
    const orderDetail = order.detail
    const [openSelectionPlaceContent, setOpenSelectionPlaceContent] = useState<boolean>();
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)

    useEffect(() => {
        if (id) {
            const promise = dispatch(getOrderDetail(id))
            return () => promise.abort()
        }
    }, [id])

    useEffect(() => {
        if (editedOrder) {
            toast.success(`Đã Chỉnh sửa đơn hàng mã ${editedOrder.id} thành công!`, {
                position: "top-right",
                duration: 2000,
                className: "w-72"
            })
            dispatch(resetEditedOrder())
            setTimeout(()=>{
                navigate(`/order-management`);
            }, 2000)
        }
    }, [editedOrder])

    useEffect(() => {
        if (orderDetail){
            editOrderForm.reset({
                recipientFullName: orderDetail.recipient_full_name,
                recipientEmail: orderDetail.recipient_email,
                recipientPhone: orderDetail.recipient_phone,
                recipientSpecificPlace: orderDetail.recipient_specific_place,
                orderStatus: orderDetail.order_status,
                transactionStatus: orderDetail.transaction_status,
                paymentMethod: orderDetail.payment_method,
                province: orderDetail.province,
                district: orderDetail.district,
                commune: orderDetail.commune,
                note: orderDetail.note
            })
        }
    }, [orderDetail]);

    const editOrderForm = useForm<EditOrderRequest>({
        resolver: yupResolver(editOrderSchema)
    })

    const onSubmitEditOrderForm = (body: EditOrderRequest) => {
        if (id){
            const promise = dispatch(editOrder({orderId: id, body: body}))
            return () => promise.abort()
        }
    }

    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>) => {
        const response = await goongApi.searchPlace(event.target.value)
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions)
        }
    }

    const handleChangeAddressField = async (e: ChangeEvent<HTMLInputElement>) => {
        editOrderForm.setValue("recipientSpecificPlace", e.target.value);
        await handleSearchPlace(e);
    };

    return (
        <div className="grid gap-4 px-4">
            <h2 className="text-2xl font-bold tracking-tighter">
                Chỉnh sửa thông tin đơn hàng
                <Separator orientation="horizontal" className="mt-2 w-1/12"/>
            </h2>
            <Form {...editOrderForm}>
                <form onSubmit={editOrderForm.handleSubmit(onSubmitEditOrderForm)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col items-start gap-2">
                            <Label>Khách hàng đã mua</Label>
                            <Input disabled value={`Mã khách hàng: ${orderDetail?.customer_id} - ${orderDetail?.customer_full_name}`}/>
                        </div>

                        <FormField
                            control={editOrderForm.control}
                            name="recipientFullName"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Họ và tên người nhận hàng <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="on" />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editOrderForm.control}
                            name="recipientPhone"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Số điện thoại người nhận hàng <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="on"/>
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editOrderForm.control}
                            name="recipientEmail"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Email người nhận hàng <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="on"/>
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <div className="col-span-2 flex gap-x-6">
                            <FormField
                                control={editOrderForm.control}
                                name="recipientSpecificPlace"
                                render={({field}) => {
                                    return (
                                        <FormItem className="flex flex-col items-start col-span-2 flex-1">
                                            <FormLabel className="text-black">Địa chỉ người nhận hàng <span
                                                className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        {...field}
                                                        // autoComplete="on"
                                                        // onFocus={() => setOpenSelectionPlaceContent(true)}
                                                        // onChange={handleSearchPlace}
                                                        // onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                        autoComplete="on"
                                                        onFocus={() => setOpenSelectionPlaceContent(true)}
                                                        onChange={(e) => handleChangeAddressField(e)}
                                                        onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                    />
                                                    {
                                                        openSelectionPlaceContent &&
                                                        <div
                                                            className="z-10 absolute shadow-sm top-full mt-2 rounded-md border border-input grid bg-white p-2 w-full">
                                                            {
                                                                listItemPlaces ? listItemPlaces.map((itemPlace, index) => (
                                                                    <div key={index}
                                                                         className="p-2 text-sm hover:bg-zinc-100 rounded-md cursor-pointer truncate"
                                                                         onClick={() => {
                                                                             field.onChange(itemPlace.description)
                                                                             editOrderForm.setValue("province", itemPlace.compound.province)
                                                                             editOrderForm.setValue("district", itemPlace.compound.district)
                                                                             editOrderForm.setValue("commune", itemPlace.compound.commune)
                                                                             setOpenSelectionPlaceContent(false);
                                                                             setListItemPlaces(null)
                                                                         }}
                                                                    >
                                                                        {itemPlace.description}
                                                                    </div>
                                                                )) : <div
                                                                    className="text-sm place-self-center my-8">Kết
                                                                    quả tìm kiếm địa chỉ hiển thị tại
                                                                    đây</div>
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

                            <div className="grid grid-cols-3 gap-6">
                                <FormField
                                    control={editOrderForm.control}
                                    name="province"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Tỉnh/Thành phố <span
                                                className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={editOrderForm.control}
                                    name="district"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Quận/Huyện <span
                                                className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={editOrderForm.control}
                                    name="commune"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Phường/Xã <span
                                                className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-6 space-y-1 mt-0">
                            <div className="!mt-0 flex flex-col gap-6">
                                <FormField
                                    control={editOrderForm.control}
                                    name="paymentMethod"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Phương thức thanh toán <span
                                                className="text-red-600">*</span></FormLabel>
                                            <Select onValueChange={field.onChange}
                                                    value={String(field.value)}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        availablePaymentMethods?.map((paymentMethod, index) => (
                                                            <SelectItem key={index}
                                                                        value={paymentMethod.name}>{paymentMethod.title}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editOrderForm.control}
                                    name="orderStatus"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Trạng thái đơn hàng <span
                                                className="text-red-600">*</span></FormLabel>
                                            <Select onValueChange={field.onChange}
                                                    value={String(field.value)}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        availableOrderStatuses?.map((orderStatus, index) => (
                                                            <SelectItem key={index} value={orderStatus.name}>{orderStatus.title}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={editOrderForm.control}
                                    name="transactionStatus"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Trạng thái giao dịch <span
                                                className="text-red-600">*</span></FormLabel>
                                            <Select onValueChange={field.onChange}
                                                    value={String(field.value)}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        availableTransactionStatuses?.map((transactionStatus, index) => (
                                                            <SelectItem key={index}
                                                                        value={transactionStatus.name}>{transactionStatus.title}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label className="leading-none">Sản phẩm đã mua</Label>
                                    <div
                                        className="rounded-md w-full flex-1 border border-input space-y-4 p-4 place-content mx-auto">
                                        {
                                            orderDetail?.items && orderDetail.items.map((orderItem) => (
                                                <div key={orderItem.id} className="grid grid-cols-5 gap-2 items-center">
                                                    <Label className="col-span-3 font-normal"><b>Mã sản
                                                        phẩm:</b> {orderItem.product_id} - {orderItem.product_title}
                                                    </Label>
                                                    <span className="text-sm">{formatCurrency(orderItem.price)}</span>
                                                    <Input
                                                        className="text-center"
                                                        type="number"
                                                        value={orderItem.quantity}
                                                        disabled
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-2">
                                    <Label>Tổng tiền</Label>
                                    <Input disabled value={formatCurrency(orderDetail?.total_price)}/>
                                </div>

                                <div className="flex flex-col items-start gap-2">
                                    <Label>Voucher đã sử dụng</Label>
                                    <Input disabled value={`Mã voucher: ${orderDetail?.voucher_id} - ${orderDetail?.voucher_title}`}/>
                                </div>

                                <FormField
                                    control={editOrderForm.control}
                                    name="note"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel>Ghi chú</FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="on"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <Separator className="w-1/12" orientation="horizontal"/>
                    <div className="space-x-2 justify-end">
                        <Button variant="secondary" asChild className="hover:text-black">
                            <Link to="/order-management">Hủy</Link>
                        </Button>
                        <Button type="submit">Lưu</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditOrder