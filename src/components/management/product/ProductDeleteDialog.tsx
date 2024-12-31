import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {deleteProduct, resetDeletedProduct} from "@/redux/slice/product.slice.ts";
import {useEffect} from "react";

interface ProductDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const ProductDeleteDialog = ({open, onOpenChange, id}: ProductDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product)
    const deletedProduct = product.deleted

    useEffect(() => {
        if (deletedProduct){
            onOpenChange(false)
            dispatch(resetDeletedProduct())
        }
    }, [deletedProduct]);

    const handleDeleteProduct = () => {
        if (id){
            const promise = dispatch(deleteProduct(id))
            return () => promise.abort()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Xóa sản phẩm</DialogTitle>
                </DialogHeader>
                <div>Xóa sản phẩm là thao tác không khôi phục được. Nếu chắc chắn xóa sản phẩm này hãy nhấn nút xác nhận</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button onClick={() => handleDeleteProduct()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
