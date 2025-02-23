import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useFieldArray, useForm} from "react-hook-form";
import {AddOrderRequest} from "@/type/request/order.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {addOrderSchema} from "@/schema/order.schema.ts";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {addOrder, resetAddedOrder} from "@/redux/slice/order.slice.ts";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";
import {Separator} from "@/components/ui/separator.tsx";
import {getAllCustomers} from "@/redux/slice/user.slice.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {getAllProducts} from "@/redux/slice/product.slice.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import {Check} from "lucide-react";
import {availablePaymentMethods} from "@/constant/available.constant.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {getAllVouchers} from "@/redux/slice/voucher.slice.ts";

const AddOrder = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {order} = useAppSelector(state => state.order);
    const {user} = useAppSelector(state => state.user);
    const {product} = useAppSelector(state => state.product);
    const {voucher} = useAppSelector(state => state.voucher);
    const allCustomers = user.customer.all
    const allProducts = product.all
    const allVouchers = voucher.all
    const addedOrder = order.added
    const [openSelectionPlaceContent, setOpenSelectionPlaceContent] = useState<boolean>();
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)

    useEffect(() => {
        if (addedOrder) {
            dispatch(resetAddedOrder())
            navigate(`/order-management`);
        }
    }, [addedOrder])

    useEffect(() => {
        if (!allCustomers) {
            const promise = dispatch(getAllCustomers())
            return () => promise.abort()
        }

        if (!allProducts) {
            const promise = dispatch(getAllProducts())
            return () => promise.abort()
        }

        if (!allVouchers) {
            const promise = dispatch(getAllVouchers())
            return () => promise.abort()
        }
    }, [allCustomers, allProducts, allVouchers])

    const addOrderForm = useForm<AddOrderRequest>({
        resolver: yupResolver(addOrderSchema),
    })

    const {fields, append, remove} = useFieldArray({
        control: addOrderForm.control,
        name: "items",
    });

    const watchItems = addOrderForm.watch("items");

    const totalPrice = useMemo(() => {
        return watchItems?.reduce((total, item) => {
            const product = allProducts?.items.find((productItem) => productItem.id === item.productId);
            return total + (product!.regular_price || product!.discount_price) * item.quantity;
        }, 0);
    }, [watchItems]);

    const onSubmitAddOrderForm = (body: AddOrderRequest) => {
        console.log(body);
        const promise = dispatch(addOrder(body))
        return () => promise.abort()
    }

    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>) => {
        const response = await goongApi.searchPlace(event.target.value)
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions)
        }
    }

    const handleQuantityChange = (index: number, value: number) => {
        const currentItems = [...addOrderForm!.getValues("items")!];
        currentItems[index] = { ...currentItems[index], quantity: value };
        addOrderForm.setValue("items", currentItems, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const handleChangeAddressField = async (e: ChangeEvent<HTMLInputElement>) => {
        addOrderForm.setValue("recipientSpecificPlace", e.target.value);
        await handleSearchPlace(e);
    };

    return (
        <div className="grid gap-4 px-4">
            <h2 className="text-2xl font-bold tracking-tighter">
                Thêm mới đơn hàng
                <Separator orientation="horizontal" className="mt-2 w-1/12"/>
            </h2>
            <Form {...addOrderForm}>
                <form onSubmit={addOrderForm.handleSubmit(onSubmitAddOrderForm)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={addOrderForm.control}
                            name="customerId"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Khách hàng mua <span
                                        className="text-red-600">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                allCustomers?.items.map((customerItem, index) => (
                                                    <SelectItem key={index}
                                                                value={String(customerItem.id)}><b>Mã khách
                                                        hàng:</b> {customerItem.id} - {customerItem.full_name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={addOrderForm.control}
                            name="recipientFullName"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Họ và tên người nhận hàng <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="on"/>
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={addOrderForm.control}
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
                            control={addOrderForm.control}
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
                                control={addOrderForm.control}
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
                                                                             addOrderForm.setValue("province", itemPlace.compound.province)
                                                                             addOrderForm.setValue("district", itemPlace.compound.district)
                                                                             addOrderForm.setValue("commune", itemPlace.compound.commune)
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
                                    control={addOrderForm.control}
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
                                    control={addOrderForm.control}
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
                                    control={addOrderForm.control}
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
                            <div className="gap-2 flex flex-col">
                                <FormField
                                    control={addOrderForm.control}
                                    name="items"
                                    render={({fieldState}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black leading-none">Sản phẩm mua <span
                                                className="text-red-600">*</span></FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="w-full justify-between text-muted-foreground"
                                                        >
                                                            Chọn sản phẩm
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Nhập mã sản phẩm..."/>
                                                        <CommandList>
                                                            <CommandEmpty>Không tìm thấy sản phẩm.</CommandEmpty>
                                                            <CommandGroup>
                                                                {
                                                                    allProducts?.items.map((productItem, index) => {
                                                                        const isAlreadyAdded = fields.some((field) => field.productId === productItem.id);
                                                                        return (
                                                                            <CommandItem
                                                                                value={String(productItem.id)}
                                                                                key={index}
                                                                                onSelect={() => {
                                                                                    if (!isAlreadyAdded) {
                                                                                        append({
                                                                                            productId: productItem.id,
                                                                                            quantity: 1,
                                                                                        });
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <b>Mã sản
                                                                                    phẩm:</b> {productItem.id} - {productItem.title}
                                                                                <Check
                                                                                    className={cn("ml-auto", isAlreadyAdded ? "opacity-100" : "opacity-0")}
                                                                                />
                                                                            </CommandItem>
                                                                        )
                                                                    })}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            {
                                                fieldState.invalid && <span
                                                    className="text-xs text-red-600">{fieldState.error?.message}</span>
                                            }
                                        </FormItem>
                                    )}
                                />

                                <div className="flex-1 rounded-md w-full border border-input space-y-4 p-4 place-content-center mx-auto">
                                    {
                                        fields.length > 0 ? fields.map((field, index) => {
                                            const productItem = allProducts?.items.find((productItem) => productItem.id === field.productId)
                                            return (
                                                <div key={field.id} className="grid grid-cols-6 gap-2 items-center">
                                                    <Label className="col-span-3 font-normal"><b>Mã sản
                                                        phẩm:</b> {productItem?.id} - {productItem?.title}</Label>
                                                    <span
                                                        className="text-sm">{formatCurrency(productItem!.regular_price || productItem!.discount_price)}</span>
                                                    <Input
                                                        className="text-center"
                                                        type="number"
                                                        defaultValue={field.quantity}
                                                        onChange={(e) => {
                                                            handleQuantityChange(index, Number(e.target.value))
                                                        }}
                                                    />
                                                    <Button variant="outline"
                                                            onClick={() => remove(index)}>Xóa</Button>
                                                </div>
                                            )
                                        }) : <div className="text-sm flex justify-center">Sản phẩm được chọn sẽ hiển thị
                                            ở đây</div>
                                    }
                                </div>
                            </div>

                            <div className="!mt-0 flex flex-col gap-6">
                                <FormField
                                    control={addOrderForm.control}
                                    name="paymentMethod"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Phương thức thanh toán <span
                                                className="text-red-600">*</span></FormLabel>
                                            <Select onValueChange={field.onChange}
                                                    defaultValue={String(field.value)}>
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
                                    control={addOrderForm.control}
                                    name="voucherId"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-black">Voucher</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        allVouchers?.items.map((voucherItem, index) => (
                                                            <SelectItem key={index} value={String(voucherItem.id)}>
                                                                <b>Mã
                                                                    voucher:</b> {voucherItem.id} - {voucherItem.title}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-xs text-red-600"/>
                                        </FormItem>
                                    )}
                                />
                                <div className="p-4 border border-input rounded-md">
                                    <div className="flow-root">
                                        <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                            <dl className="flex items-center justify-between gap-4 py-3">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tổng
                                                    tiền tạm tính
                                                </dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(totalPrice)}</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4 py-3">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Giảm
                                                    giá
                                                </dt>
                                                <dd className="text-base font-medium text-green-600">0</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4 py-3">
                                                <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng
                                                    tiền
                                                    đơn hàng
                                                </dt>
                                                <dd className="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
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

export default AddOrder