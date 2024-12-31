import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllCustomersResponse} from "@/type/response/user.response.ts";

export const columns: ColumnDef<GotAllCustomersResponse['items'][0]>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             className="w-4 h-4 mt-1"
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             className="w-4 h-4 mt-1"
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
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
    }
]
