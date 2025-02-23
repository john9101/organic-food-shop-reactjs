import {Card, CardContent} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {EditAccountAddressRequest} from "@/type/request/account.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {editAccountAddressSchema} from "@/schema/auth-account-user.schema.ts";
import {
    deleteAccountAddress,
    editAccountAddress,
    getAccountAddressDetail, resetDeletedAccountAddress,
    resetEditedAccountAddress
} from "@/redux/slice/account.slice.ts";
import {GotAccountAddressDetailResponse} from "@/type/response/account.response.ts";
import {ChangeEvent, useEffect, useState} from "react";
import goongApi from "@/api/goong.api.ts";
import {HttpStatusCode} from "axios";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";
import {toast} from "sonner";

interface AccountAddressProps {
    detail: GotAccountAddressDetailResponse
}

const AccountAddressCard = ({detail}: AccountAddressProps) => {
    const [openEditAddressDialog, setOpenEditAddressDialog] = useState<boolean>(false);
    const [openDeleteAddressDialog, setOpenDeleteAddressDialog] = useState<boolean>(false);
    const [openSelectionPlaceContent, setOpenSelectionPlaceContent] = useState<boolean>(false);
    const [listItemPlaces, setListItemPlaces] = useState<SearchedPlaceResponse['predictions'] | null>(null)
    const dispatch = useAppDispatch()
    const {account} = useAppSelector(state => state.account)
    const gotDetailAccountAddress = account.address.gotDetail
    const editedAccountAddress = account.address.edited
    const deletedAccountAddress = account.address.deleted

    useEffect(() => {
        if (gotDetailAccountAddress) {
            editAccountAddressForm.reset({
                specificPlace: gotDetailAccountAddress.specific_place,
                province: gotDetailAccountAddress.province,
                district: gotDetailAccountAddress.district,
                commune: gotDetailAccountAddress.commune,
            })
        }
    }, [gotDetailAccountAddress])

    useEffect(() => {
        if (editedAccountAddress) {
            toast.success(`Đã chỉnh sửa địa chỉ thành công`, {
                position: "bottom-center",
                duration: 2000,
                className: "w-72"
            })
            setOpenEditAddressDialog(false)
            dispatch(resetEditedAccountAddress())
        }
    }, [editedAccountAddress]);

    useEffect(() => {
        if (deletedAccountAddress) {
            toast.success(`Đã xóa địa chỉ thành công`, {
                position: "bottom-center",
                duration: 2000,
                className: "w-72"
            })
            setOpenEditAddressDialog(false)
            dispatch(resetDeletedAccountAddress())
        }
    }, [deletedAccountAddress]);

    const editAccountAddressForm = useForm<EditAccountAddressRequest>({
        resolver: yupResolver(editAccountAddressSchema),
    })

    const onSubmitEditAccountAddressForm = (body: EditAccountAddressRequest) => {
        const promise = dispatch(editAccountAddress({id: detail.id, body: body}))
        return () => promise.abort()
    }

    const handleSearchPlace = async (event: ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        const value = event.target.value;
        onChange(value);
        const response = await goongApi.searchPlace(value);
        if (response.status === HttpStatusCode.Ok && response.data) {
            setListItemPlaces(response.data.predictions);
        }
    }

    const handleGetAccountAddressDetail = () => {
        const promise = dispatch(getAccountAddressDetail(detail.id))
        return () => promise.abort()
    }

    const handleDeleteAccountAddress = () => {
        const promise = dispatch(deleteAccountAddress(detail.id))
        return () => promise.abort()
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">{detail.specific_place}</h4>
                    <p className="text-sm text-muted-foreground">
                        {detail.province} {detail.district} {detail.commune}
                    </p>
                </div>
                <Separator className="my-4"/>
                <div className="flex h-5 details-center space-x-4 text-sm">
                    <Dialog open={openEditAddressDialog} onOpenChange={setOpenEditAddressDialog}>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer hover:text-green-600" onClick={handleGetAccountAddressDetail}>Chỉnh sửa</div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle className="text-green-600">Chỉnh sửa địa chỉ</DialogTitle>
                                <DialogDescription>Nhập thông tin chỉnh sửa về địa chỉ</DialogDescription>
                            </DialogHeader>

                            <Form {...editAccountAddressForm} >
                                <form onSubmit={editAccountAddressForm.handleSubmit(onSubmitEditAccountAddressForm)}
                                      className="space-y-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <FormField
                                            control={editAccountAddressForm.control}
                                            name="specificPlace"
                                            render={({field}) => (
                                                <FormItem className="flex flex-col details-start col-span-3" defaultValue={field.value}>
                                                    <FormLabel className="text-black">Địa chỉ <span
                                                        className="text-red-600">*</span></FormLabel>
                                                    <FormControl>
                                                        <div className="relative w-full">
                                                            <Input {...field} autoComplete="on"
                                                                   onFocus={() => setOpenSelectionPlaceContent(true)}
                                                                   onChange={(event) => handleSearchPlace(event, field.onChange)}
                                                                   onBlur={() => setTimeout(() => setOpenSelectionPlaceContent(false), 200)}
                                                            />
                                                            {
                                                                openSelectionPlaceContent &&
                                                                <div
                                                                    className="absolute top-full mt-2 rounded-md border border-input grid bg-white p-2 w-full">
                                                                    {
                                                                        listItemPlaces ? listItemPlaces.map((detailPlace, index) => (
                                                                            <div key={index}
                                                                                 className="p-2 text-sm hover:bg-zinc-100 rounded-md cursor-pointer truncate"
                                                                                 onClick={() => {
                                                                                     field.onChange(detailPlace.description)
                                                                                     editAccountAddressForm.setValue("province", detailPlace.compound.province)
                                                                                     editAccountAddressForm.setValue("district", detailPlace.compound.district)
                                                                                     editAccountAddressForm.setValue("commune", detailPlace.compound.commune)
                                                                                     setOpenSelectionPlaceContent(false);
                                                                                 }}
                                                                            >
                                                                                {detailPlace.description}
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
                                            control={editAccountAddressForm.control}
                                            name="province"
                                            render={({field}) => (
                                                <FormItem className="flex flex-col details-start">
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
                                            control={editAccountAddressForm.control}
                                            name="district"
                                            render={({field}) => (
                                                <FormItem className="flex flex-col details-start">
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
                                            control={editAccountAddressForm.control}
                                            name="commune"
                                            render={({field}) => (
                                                <FormItem className="flex flex-col details-start">
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
                                        <Button type="submit" className="bg-green-600 hover:bg-green-500">Lưu</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                    <Separator orientation="vertical"/>
                    <Dialog open={openDeleteAddressDialog} onOpenChange={setOpenDeleteAddressDialog}>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer hover:text-red-600">Xóa</div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-green-600">Xóa địa chỉ</DialogTitle>
                            </DialogHeader>
                            <div>Xóa địa chỉ là hành động không thể khôi phục được. Nếu chắc chắn xóa địa chỉ này hãy nhấn nút xác nhận</div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Hủy</Button>
                                </DialogClose>
                                <Button onClick={handleDeleteAccountAddress} className="bg-green-600 hover:bg-green-500">Xác nhận</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    )
}

export default AccountAddressCard;