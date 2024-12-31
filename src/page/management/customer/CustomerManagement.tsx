import {columns} from "@/components/management/customer/columns.tsx";
import {DataTable} from "@/components/management/customer/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect, useState} from "react";
import {getAllCustomers} from "@/redux/slice/user.slice.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {CustomerDeleteDialog} from "@/components/management/customer/CustomerDeleteDialog.tsx";
import {CustomerDetailDialog} from "@/components/management/customer/CustomerDetailDialog.tsx";
import {Link} from "react-router-dom";

const CustomerManagement = () => {
    const dispatch = useAppDispatch();
    const [openCustomerDetailDialog, setOpenCustomerDetailDialog] = useState<boolean>(false);
    const [openCustomerDeleteDialog, setOpenCustomerDeleteDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const {user} = useAppSelector(state => state.user);
    const allCustomers = user.customer.all
    

    useEffect(() => {
        if (!allCustomers) {
            const promise = dispatch(getAllCustomers());
            return () => promise.abort()
        }
    },[allCustomers])

    const handleShowCustomerDetail = (id: number) => {
        setOpenCustomerDetailDialog(true);
        setSelectedId(id)
    };

    const handleShowCustomerDelete = (id: number) => {
        setOpenCustomerDeleteDialog(true);
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
                            const customer = row.original
                            return (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Danh sách thao tác</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleShowCustomerDetail(customer.id)}>Xem chi tiết</DropdownMenuItem>
                                        <DropdownMenuItem asChild className="text-neutral-700">
                                            <Link to={`edit/${customer.id}`}>Chỉnh sửa</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShowCustomerDelete(customer.id)}>Xóa</DropdownMenuItem>
                                        <DropdownMenuItem>Khóa</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        },
                    }
                ]}
                data={allCustomers?.items ? allCustomers.items : []}
            />
            <CustomerDetailDialog open={openCustomerDetailDialog} onOpenChange={setOpenCustomerDetailDialog} id={selectedId as number} />
            <CustomerDeleteDialog open={openCustomerDeleteDialog} onOpenChange={setOpenCustomerDeleteDialog} id={selectedId as number} />
        </div>
    )
}

export default CustomerManagement