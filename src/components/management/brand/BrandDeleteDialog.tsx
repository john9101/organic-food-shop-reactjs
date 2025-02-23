import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {deleteBrand, resetDeletedBrand} from "@/redux/slice/brand.slice.ts";
import {useEffect} from "react";
import {toast} from "sonner";

interface BrandDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const BrandDeleteDialog = ({open, onOpenChange, id}: BrandDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {brand} = useAppSelector(state => state.brand)
    const deletedBrand = brand.deleted

    useEffect(() => {
        if (deletedBrand){
            toast.success(`Đã xóa thương hiệu mã ${deletedBrand.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetDeletedBrand())
            setTimeout(() => onOpenChange(false), 2000)
        }
    }, [deletedBrand]);

    const handleDeleteBrand = () => {
        const promise = dispatch(deleteBrand(id!))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Xóa thương hiệu</DialogTitle>
                </DialogHeader>
                <div>Nếu chắc chắn xóa thương hiệu này hãy nhấn nút xác nhận tuy nhưng vẫn có thể khôi phục sau khi xóa</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteBrand()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
