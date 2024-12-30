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
import {getProductDetail} from "@/redux/slice/product.slice.ts";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {availableMeasurementUnits} from "@/constant/available.constant.ts";

interface ProductDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const ProductDetailDialog = ({open, onOpenChange, id}: ProductDetailDialogProps) => {
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product)
    const productDetail = product.detail

    useEffect(() => {
        if (id) {
            const promise = dispatch(getProductDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Chi tiết sản phẩm</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về sản phẩm</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã sản phẩm</Label>
                        <Input disabled value={productDetail?.id}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Tên sản phẩm</Label>
                        <Input disabled value={productDetail?.title}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Giá bán</Label>
                        <Input disabled value={productDetail?.regular_price}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Phần trăm khuyến mãi</Label>
                        <Input disabled value={productDetail?.discount_percent}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Danh mục</Label>
                        <Input disabled value={productDetail?.category_name}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Thương hiệu</Label>
                        <Input disabled value={productDetail?.brand_name}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Đơn vị đo lường</Label>
                        <Input disabled value={availableMeasurementUnits.find(measurementUnit=> measurementUnit.name === productDetail?.measurement_unit_mame)?.title}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Giá trị đo lường</Label>
                        <Input disabled value={productDetail?.measurement_value}/>
                    </div>

                    <div className="flex flex-col col-span-2 space-y-1.5">
                        <Label>Mô tả ngắn gọn</Label>
                        <Input disabled value={productDetail?.short_description}/>
                    </div>

                    <div className="flex flex-col col-span-2 space-y-1.5">
                        <Label>Mô tả chi tiết</Label>
                        <Input disabled value={productDetail?.long_description}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
