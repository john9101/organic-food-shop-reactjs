import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect} from "react";
import {deleteOrder, resetDeletedOrder} from "@/redux/slice/order.slice.ts";

interface CustomerDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string
}

export const OrderDeleteDialog = ({open, onOpenChange, id}: CustomerDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {order} = useAppSelector(state => state.order)
    const deletedOrder = order.deleted

    useEffect(() => {
        if (deletedOrder){
            dispatch(resetDeletedOrder())
            onOpenChange(false)
        }
    },[deletedOrder])

    const handleDeleteEmployee = () => {
        const promise = dispatch(deleteOrder(id))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Xóa đơn hàng</DialogTitle>
                </DialogHeader>
                <div>Xóa đơn hàng là thao tác không khôi phục được. Nếu chắc chắn xóa đơn hàng này hãy nhấn nút xác nhận</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteEmployee()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
