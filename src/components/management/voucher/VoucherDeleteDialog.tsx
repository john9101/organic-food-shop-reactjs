import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {deleteVoucher, resetDeletedVoucher} from "@/redux/slice/voucher.slice.ts";
import {useEffect} from "react";
import {toast} from "sonner";

interface VoucherDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const VoucherDeleteDialog = ({open, onOpenChange, id}: VoucherDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {voucher} = useAppSelector(state => state.voucher)
    const deletedVoucher = voucher.deleted

    useEffect(() => {
        if (deletedVoucher){
            toast.success(`Đã xóa voucher mã ${deletedVoucher.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetDeletedVoucher())
            setTimeout(() => onOpenChange(false), 2000)
        }
    }, [deletedVoucher]);

    const handleDeleteVoucher = () => {
        const promise = dispatch(deleteVoucher(id!))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Xóa phiếu giảm giá</DialogTitle>
                </DialogHeader>
                <div>Nếu chắc chắn xóa voucher này hãy nhấn nút xác nhận tuy nhưng vẫn có thể khôi phục sau khi xóa</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteVoucher()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
