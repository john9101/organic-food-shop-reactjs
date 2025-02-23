import {columns} from "@/components/management/employee/columns.tsx";
import {DataTable} from "@/components/management/employee/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect, useState} from "react";
import {getAllEmployees} from "@/redux/slice/user.slice.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {EmployeeDeleteDialog} from "@/components/management/employee/EmployeeDeleteDialog.tsx";
import {EmployeeDetailDialog} from "@/components/management/employee/EmployeeDetailDialog.tsx";
import {Link} from "react-router-dom";

const EmployeeManagement = () => {
    const dispatch = useAppDispatch();
    const [openEmployeeDetailDialog, setOpenEmployeeDetailDialog] = useState<boolean>(false);
    const [openEmployeeDeleteDialog, setOpenEmployeeDeleteDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const {user} = useAppSelector(state => state.user);
    const allEmployees = user.employee.all
    

    useEffect(() => {
        if (!allEmployees) {
            const promise = dispatch(getAllEmployees());
            return () => promise.abort()
        }
    },[allEmployees])

    const handleShowEmployeeDetail = (id: number) => {
        setOpenEmployeeDetailDialog(true);
        setSelectedId(id)
    };

    const handleShowEmployeeDelete = (id: number) => {
        setOpenEmployeeDeleteDialog(true);
        setSelectedId(id)
    };

    return (
        <div className="grid px-4">
            <DataTable
                columns={[
                    ...columns,
                    {
                        id: "actions",
                        header: "Thao tác",
                        cell: ({ row }) => {
                            const employee = row.original
                            return (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Danh sách thao tác</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleShowEmployeeDetail(employee.id)}>Xem chi tiết</DropdownMenuItem>
                                        <DropdownMenuItem asChild className="text-neutral-700">
                                            <Link to={`edit/${employee.id}`}>Chỉnh sửa</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Khóa</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShowEmployeeDelete(employee.id)}>Xóa</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        },
                    }
                ]}
                data={allEmployees?.items ? allEmployees.items : []}
            />
            <EmployeeDetailDialog open={openEmployeeDetailDialog} onOpenChange={setOpenEmployeeDetailDialog} id={selectedId as number} />
            <EmployeeDeleteDialog open={openEmployeeDeleteDialog} onOpenChange={setOpenEmployeeDeleteDialog} id={selectedId as number} />
        </div>
    )
}

export default EmployeeManagement