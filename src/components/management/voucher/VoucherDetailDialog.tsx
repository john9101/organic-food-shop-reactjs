import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {getVoucherDetail} from "@/redux/slice/voucher.slice.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {Textarea} from "@/components/ui/textarea.tsx";

interface CategoryDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const VoucherDetailDialog = ({open, onOpenChange, id}: CategoryDetailDialogProps) => {
    const dispatch = useAppDispatch();
    const {voucher} = useAppSelector(state => state.voucher)
    const voucherDetail = voucher.detail

    useEffect(() => {
        if (id) {
            const promise = dispatch(getVoucherDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chi tiết phiếu giảm giá</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về phiếu giảm giá</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã</Label>
                        <Input disabled value={voucherDetail?.id}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Code</Label>
                        <Input disabled value={voucherDetail?.code}/>
                    </div>

                    <div className="flex flex-col space-y-1.5 col-span-2">
                        <Label>Mô tả</Label>
                        <Textarea disabled value={voucherDetail?.description}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Phần trăm giảm giá</Label>
                        <Input disabled value={voucherDetail?.discount_percent && voucherDetail?.discount_percent + "%"}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Số lượt dùng còn lại</Label>
                        <Input disabled value={voucherDetail?.quantity}/>
                    </div>

                    <div className="flex flex-col space-y-1.5 col-span-2">
                        <Label>Giá tối thiểu áp dụng</Label>
                        <Input disabled value={formatCurrency(voucherDetail?.minimum_amount)!}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Ngày hiệu lực</Label>
                        <Input disabled value={voucherDetail?.effective_date?.toString()}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Ngày hết hạn</Label>
                        <Input disabled value={voucherDetail?.expiry_date?.toString()}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
