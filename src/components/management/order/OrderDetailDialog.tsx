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
import {getOrderDetail} from "@/redux/slice/order.slice.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {availableOrderStatuses, availableTransactionStatuses} from "@/constant/available.constant.ts";

interface employeeDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string
}

export const OrderDetailDialog = ({open, onOpenChange, id}: employeeDetailDialogProps) => {
    const dispatch = useAppDispatch();
    const {order} = useAppSelector(state => state.order)
    const orderDetail = order.detail

    useEffect(() => {
        if (id) {
            const promise = dispatch(getOrderDetail(id))
            return () => promise.abort()
        }
    }, [id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chi tiết đơn hàng</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã đơn hàng</Label>
                        <Input disabled value={orderDetail?.id}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Tổng tiền</Label>
                        <Input disabled value={formatCurrency(orderDetail?.total_price)!}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã khách hàng</Label>
                        <Input disabled value={orderDetail?.customer_id}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Họ tên người nhận hàng</Label>
                        <Input disabled value={orderDetail?.recipient_full_name}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Email người nhận hàng</Label>
                        <Input disabled value={orderDetail?.recipient_email}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Số điện thoại người nhận hàng</Label>
                        <Input disabled value={orderDetail?.recipient_phone}/>
                    </div>

                    <div className="col-span-2 grid grid-cols-5 gap-6">
                        <div className="flex flex-col space-y-1.5 col-span-2">
                            <Label>Địa chỉ người nhận hàng</Label>
                            <Input disabled value={orderDetail?.recipient_specific_place}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Tỉnh/Thành Phố</Label>
                            <Input disabled value={orderDetail?.province}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Quận/Huyện</Label>
                            <Input disabled value={orderDetail?.district}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Phường/Xã</Label>
                            <Input disabled value={orderDetail?.commune}/>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Trạng thái đơn hàng</Label>
                        <Input disabled
                               value={availableOrderStatuses.find(orderStatus => orderStatus.name === orderDetail?.order_status)?.title}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Trạng thái giao dịch</Label>
                        <Input disabled
                               value={availableTransactionStatuses.find(transactionStatus => transactionStatus.name === orderDetail?.transaction_status)?.title}/>
                    </div>

                    <div className="flex flex-col space-y-1.5 col-span-2">
                        <Label>Ghi chú</Label>
                        <Input disabled value={orderDetail?.note}/>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
