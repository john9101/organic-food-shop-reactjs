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
import {getCategoryDetail} from "@/redux/slice/category.slice.ts";

interface CategoryDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CategoryDetailDialog = ({open, onOpenChange, id}: CategoryDetailDialogProps) => {
    const dispatch = useAppDispatch();
    const {category} = useAppSelector(state => state.category)
    const categoryDetail = category.detail

    useEffect(() => {
        if (id) {
            const promise = dispatch(getCategoryDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Chi tiết danh mục sản phẩm</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về danh mục sản phẩm</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã danh mục sản phẩm</Label>
                        <Input disabled value={categoryDetail?.id}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Tên danh mục sản phẩm</Label>
                        <Input disabled value={categoryDetail?.name}/>
                    </div>

                    <div className="flex flex-col space-y-1.5 col-span-2">
                        <Label>Mô tả danh mục sản phẩm</Label>
                        <Input disabled value={categoryDetail?.description}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
