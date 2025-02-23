import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {
    addAccountAddress,
    getAccountAddresses,
    resetAddedAccountAddress,
} from "@/redux/slice/account.slice.ts";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useForm} from "react-hook-form";
import {AddAccountAddressRequest} from "@/type/request/account.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {addAccountAddressSchema} from "@/schema/auth-account-user.schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import {toast} from "sonner";
import AccountAddressCard from "@/components/card/AccountAddressCard.tsx";

const AccountAddress = () => {
    const dispatch = useAppDispatch()
    const [openSelectionPlaceContent, setOpenSelectionPlaceContent] = useState<boolean>(false);
    const [openAddAddressDialog, setOpenAddAddressDialog] = useState<boolean>(false);
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)
    const {account} = useAppSelector(state => state.account)
    const gotAccountAddresses = account.address.got
    const addedAccountAddress = account.address.added

    useEffect(() => {
        if (!gotAccountAddresses) {
            const promise = dispatch(getAccountAddresses())
            return () => promise.abort()
        }
    }, [gotAccountAddresses]);

    useEffect(() => {
        if (addedAccountAddress) {
            toast.success(`Đã thêm địa chỉ thành công`, {
                position: "bottom-center",
                duration: 2000,
                className: "w-72"
            })
            setOpenAddAddressDialog(false)
            dispatch(resetAddedAccountAddress())
        }
    }, [addedAccountAddress]);

    const addAccountAddressForm = useForm<AddAccountAddressRequest>({
        resolver: yupResolver(addAccountAddressSchema)
    })

    const onSubmitAddAccountAddressForm = (body: AddAccountAddressRequest) => {
        const promise = dispatch(addAccountAddress(body))
        return () => promise.abort()
    }


    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>) => {
        const response = await goongApi.searchPlace(event.target.value)
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions)
        }
    }

    return (
        <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
                <div className="flex items-end justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-green-600">Số địa chỉ</h3>
                        <p className="text-sm text-muted-foreground">
                            Thiết lập số địa chỉ để thuận thiện khi đặt hàng
                        </p>
                    </div>
                    <Dialog open={openAddAddressDialog} onOpenChange={setOpenAddAddressDialog}>
                        <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-500">Thêm địa chỉ mới</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Thêm địa chỉ mới</DialogTitle>
                                <DialogDescription>Nhập thông tin về địa chỉ</DialogDescription>
                            </DialogHeader>

                            <Form {...addAccountAddressForm} >
                                <form onSubmit={addAccountAddressForm.handleSubmit(onSubmitAddAccountAddressForm)}
                                      className="space-y-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <FormField
                                            control={addAccountAddressForm.control}
                                            name="specificPlace"
                                            render={({field}) => (
                                                <FormItem className="flex flex-col items-start col-span-3">
                                                    <FormLabel className="text-black">Địa chỉ <span
                                                        className="text-red-600">*</span></FormLabel>
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
                                                                                     addAccountAddressForm.setValue("province", itemPlace.compound.province)
                                                                                     addAccountAddressForm.setValue("district", itemPlace.compound.district)
                                                                                     addAccountAddressForm.setValue("commune", itemPlace.compound.commune)
                                                                                     setOpenSelectionPlaceContent(false);
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
                                                    <FormMessage className='text-xs text-red-600'/>
                                                </FormItem>
                                            )}>
                                        </FormField>

                                        <FormField
                                            control={addAccountAddressForm.control}
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
                                            control={addAccountAddressForm.control}
                                            name="district"
                                            render={({field}) => (
                                                <FormItem className="flex flex-col items-start">
                                                    <FormLabel className="text-black">Quận/Huyện <span
                                                        className="text-red-600">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} autoComplete="on"/>
                                                    </FormControl>
                                                    <FormMessage className="text-xs text-red-600"/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={addAccountAddressForm.control}
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
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Hủy</Button>
                                        </DialogClose>
                                        <Button type="submit">Lưu</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Separator orientation="horizontal" className="w-full"/>
                <div className="space-y-6">
                    {
                        gotAccountAddresses?.items.map((detail) => (
                            <AccountAddressCard detail={detail}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default AccountAddress