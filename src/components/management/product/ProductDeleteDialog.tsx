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
import {toast} from "sonner";

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
            toast.success(`Đã xóa sản phẩm mã ${deletedProduct.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetDeletedProduct())
            setTimeout(() => onOpenChange(false), 2000)
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
                    <DialogTitle className="text-green-600">Xóa sản phẩm</DialogTitle>
                </DialogHeader>
                <div>Nếu chắc chắn xóa sản phẩm này hãy nhấn nút xác nhận tuy nhưng vẫn có thể khôi phục sau khi xóa</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteProduct()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
