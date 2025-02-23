import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {deleteCustomer, resetDeletedCustomer} from "@/redux/slice/user.slice.ts";
import {useEffect} from "react";

interface CustomerDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CustomerDeleteDialog = ({open, onOpenChange, id}: CustomerDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user)
    const deletedCustomer = user.customer.deleted

    useEffect(() => {
        if (deletedCustomer){
            dispatch(resetDeletedCustomer())
            onOpenChange(false)
        }
    },[deletedCustomer])

    const handleDeleteCustomer = () => {
        const promise = dispatch(deleteCustomer(id))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Xóa khách hàng</DialogTitle>
                </DialogHeader>
                <div>Xóa khách hàng là thao tác không khôi phục được. Nếu chắc chắn xóa khách hàng này hãy nhấn nút xác nhận</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteCustomer()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
