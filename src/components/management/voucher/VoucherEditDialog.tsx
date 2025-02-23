import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {editVoucher, getVoucherDetail, resetEditedVoucher} from "@/redux/slice/voucher.slice.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {EditVoucherRequest} from "@/type/request/voucher.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {editVoucherSchema} from "@/schema/voucher.schema.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {CalendarIcon} from "@heroicons/react/24/outline";
import {Calendar} from "@/components/ui/calendar.tsx";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea.tsx";

interface voucherEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const VoucherEditDialog = ({open, onOpenChange, id}: voucherEditDialogProps) => {
    const dispatch = useAppDispatch();
    const {voucher} = useAppSelector(state => state.voucher)
    const voucherDetail = voucher.detail
    const editedVoucher = voucher.edited

    useEffect(() => {
        if (editedVoucher) {
            toast.success(`Đã chỉnh sửa thông tin phiếu khuyến mãi mã ${editedVoucher.id} thành công`, {
                position: "top-right",
                duration: 2000,
                className: "w-64"
            })
            dispatch(resetEditedVoucher())
            setTimeout(() => onOpenChange(false), 2000)
        }
    }, [editedVoucher]);

    useEffect(() => {
        if (id) {
            const promise = dispatch(getVoucherDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    useEffect(() => {
        if (voucherDetail) {
            editVoucherForm.reset({
                code: voucherDetail.code,
                quantity: voucherDetail.quantity,
                discountPercent: voucherDetail.discount_percent,
                effectiveDate: voucherDetail.effective_date,
                expiryDate: voucherDetail.expiry_date,
                minimumAmount: voucherDetail.minimum_amount,
                description: voucherDetail.description,
            })

            editVoucherForm.clearErrors("description")
        }
    }, [voucherDetail]);

    const editVoucherForm = useForm<EditVoucherRequest>({
        resolver: yupResolver(editVoucherSchema)

    })

    const onSubmitEditVoucherForm = (body: EditVoucherRequest) => {
        const promise = dispatch(editVoucher({voucherId: id!, body: body}))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chỉnh sửa thông tin phiếu giảm giá</DialogTitle>
                    <DialogDescription>Nhập thông tin chỉnh sửa về phiếu giảm giá</DialogDescription>
                </DialogHeader>
                <Form {...editVoucherForm}>
                    <form onSubmit={editVoucherForm.handleSubmit(onSubmitEditVoucherForm)} className="space-y-6">
                        <div className="grid gap-6 grid-cols-2">
                            <FormField
                                control={editVoucherForm.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Code <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                autoComplete="on"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editVoucherForm.control}
                                name="discountPercent"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Phần trăm giảm giá <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input  {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editVoucherForm.control}
                                name="description"
                                render={({field}: { field: FieldValues }) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editVoucherForm.control}
                                name="quantity"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Số luợt sử dụng <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editVoucherForm.control}
                                name="minimumAmount"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Giá tối thiểu áp dụng <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editVoucherForm.control}
                                name="effectiveDate"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Ngày hiệu lực <span
                                            className="text-red-600">*</span></FormLabel>
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
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    className="pointer-events-auto"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editVoucherForm.control}
                                name="expiryDate"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Ngày hết hạn <span
                                            className="text-red-600">*</span></FormLabel>
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
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    className="pointer-events-auto"
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
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-500">Lưu</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
