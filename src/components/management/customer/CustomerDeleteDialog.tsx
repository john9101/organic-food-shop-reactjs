import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
// import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";

interface CustomerDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CustomerDeleteDialog = ({open, onOpenChange, id}: CustomerDeleteDialogProps) => {
    // const dispatch = useAppDispatch();
    // const {product} = useAppSelector(state => state.product)

    const handleDeleteProduct = () => {
        console.log(id)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Xóa khách hàng</DialogTitle>
                </DialogHeader>
                <div>Xóa khách hàng là thao tác không khôi phục được. Nếu chắc chắn xóa khách hàng này hãy nhấn nút xác nhận</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button onClick={() => handleDeleteProduct()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
