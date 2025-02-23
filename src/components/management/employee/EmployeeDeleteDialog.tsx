import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {deleteEmployee, resetDeletedEmployee} from "@/redux/slice/user.slice.ts";
import {useEffect} from "react";

interface CustomerDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const EmployeeDeleteDialog = ({open, onOpenChange, id}: CustomerDeleteDialogProps) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user)
    const deletedEmployee = user.employee.deleted

    useEffect(() => {
        if (deletedEmployee) {
            dispatch(resetDeletedEmployee())
            onOpenChange(false)
        }
    }, [deletedEmployee])

    const handleDeleteEmployee = () => {
        const promise = dispatch(deleteEmployee(id))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Xóa nhân viên</DialogTitle>
                </DialogHeader>
                <div>Xóa nhân viên là thao tác không khôi phục được. Nếu chắc chắn xóa nhân viên này hãy nhấn nút xác
                    nhận
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleDeleteEmployee()}>Xác
                        nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
