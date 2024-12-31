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
import {getCustomerDetail} from "@/redux/slice/user.slice.ts";
import {availableGenders} from "@/constant/available.constant.ts";

interface CustomerDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CustomerDetailDialog = ({open, onOpenChange, id}: CustomerDetailDialogProps) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user)
    const customerDetail = user.customer.detail

    useEffect(() => {
        if (id) {
            const promise = dispatch(getCustomerDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Chi tiết khách hàng</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về khách hàng (Tên người dùng: {customerDetail?.username})</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã khách hàng</Label>
                        <Input disabled value={customerDetail?.id}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Tên khách hàng</Label>
                        <Input disabled value={customerDetail?.full_name}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Email</Label>
                        <Input disabled value={customerDetail?.email}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Số điện thoại</Label>
                        <Input disabled value={customerDetail?.phone}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Ngày sinh</Label>
                        <Input disabled value={customerDetail?.dob && customerDetail?.dob.toString()}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Giới tính</Label>
                        <Input disabled
                               value={availableGenders.find(gender => gender.name === customerDetail?.gender_name)?.title}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
