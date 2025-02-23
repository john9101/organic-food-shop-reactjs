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
import {getEmployeeDetail} from "@/redux/slice/user.slice.ts";
import {availableGenders} from "@/constant/available.constant.ts";

interface employeeDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const EmployeeDetailDialog = ({open, onOpenChange, id}: employeeDetailDialogProps) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user)
    const employeeDetail = user.employee.detail

    useEffect(() => {
        if (id) {
            const promise = dispatch(getEmployeeDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chi tiết nhân viên</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về nhân viên</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1.5">
                        <Label>Mã</Label>
                        <Input disabled value={employeeDetail?.id}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Họ và tên</Label>
                        <Input disabled value={employeeDetail?.full_name}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Email</Label>
                        <Input disabled value={employeeDetail?.email}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label>Số điện thoại</Label>
                        <Input disabled value={employeeDetail?.phone}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Ngày sinh</Label>
                        <Input disabled value={employeeDetail?.dob && employeeDetail?.dob.toString()}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Giới tính</Label>
                        <Input disabled
                               value={availableGenders.find(gender => gender.name === employeeDetail?.gender_name)?.title}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Lương</Label>
                        <Input disabled value={employeeDetail?.salary}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Ngày nhận việc</Label>
                        <Input disabled value={employeeDetail?.hire_date && employeeDetail?.hire_date.toString()}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label>Trạng thái công việc</Label>
                        <Input disabled value={employeeDetail?.employment_status}/>
                    </div>

                    {
                        employeeDetail?.addresses.map((address, index) => (
                            <div className="col-span-2 grid grid-cols-5 gap-6">
                                <div key={index} className="flex flex-col space-y-1.5 col-span-2">
                                    <Label>Địa chỉ {employeeDetail?.addresses.length > 1 && index + 1}</Label>
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
