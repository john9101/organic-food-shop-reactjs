import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {deleteCategory, resetDeletedCategory} from "@/redux/slice/category.slice.ts";
import {useEffect} from "react";
import {toast} from "sonner";

interface CategoryDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CategoryDeleteDialog = ({open, onOpenChange, id}: CategoryDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {category} = useAppSelector(state => state.category)
    const deletedCategory = category.deleted

    useEffect(() => {
        if (deletedCategory){
            toast.success(`Đã xóa danh mục sản phẩm mã ${deletedCategory.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetDeletedCategory())
            setTimeout(() => onOpenChange(false), 2000)
        }
    }, [deletedCategory]);

    const handleDeleteCategory = () => {
        const promise = dispatch(deleteCategory(id!))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Xóa danh mục</DialogTitle>
                </DialogHeader>
                <div>Nếu chắc chắn xóa danh mục này hãy nhấn nút xác nhận tuy nhưng vẫn có thể khôi phục sau khi xóa</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteCategory()}>Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
