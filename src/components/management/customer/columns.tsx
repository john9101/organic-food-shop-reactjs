import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllCustomersResponse} from "@/type/response/user.response.ts";

export const columns: ColumnDef<GotAllCustomersResponse['items'][0]>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="w-4 h-4 mt-1"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="w-4 h-4 mt-1"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "Mã khách hàng",
        accessorKey: "id",
        header: ({column}) => column.id
    },
    {
        id: "Họ và tên",
        accessorKey: "full_name",
        header: ({column}) => column.id,
    },
    {
        id: "Email",
        accessorKey: "email",
        header: ({column}) => column.id,
    },
    {
        id: "Số điện thoại",
        accessorKey: "phone",
        header: ({column}) => column.id,
    },
    {
        id: "Ngày sinh",
        accessorKey: "dob",
        header: ({column}) => column.id,
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
            const customer = row.original
            console.log(customer.id)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Danh sách thao tác</DropdownMenuLabel>
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Xóa khách hàng</DropdownMenuItem>
                        <DropdownMenuItem>Khóa tài khoản</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
