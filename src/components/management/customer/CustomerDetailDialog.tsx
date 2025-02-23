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
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chi tiết khách hàng</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về khách hàng</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã</Label>
                        <Input disabled value={customerDetail?.id}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Họ và tên</Label>
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

                    {
                        customerDetail?.addresses.map((address, index) => (
                            <div className="col-span-2 grid grid-cols-3 gap-6">
                                <div key={index} className="flex flex-col space-y-1.5 col-span-3">
                                    <Label>Địa chỉ {customerDetail?.addresses.length > 1 && index + 1}</Label>
                                    <Input disabled value={address.specificPlace}/>
                                </div>
                                <div key={index} className="flex flex-col space-y-1.5">
                                    <Label>Tỉnh/Thành Phố</Label>
                                    <Input disabled value={address.province}/>
                                </div>
                                <div key={index} className="flex flex-col space-y-1.5">
                                    <Label>Quận/Huyện</Label>
                                    <Input disabled value={address.district}/>
                                </div>
                                <div key={index} className="flex flex-col space-y-1.5">
                                    <Label>Phường/Xã</Label>
                                    <Input disabled value={address.commune}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
