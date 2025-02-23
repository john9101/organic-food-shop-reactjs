import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllEmployeesResponse} from "@/type/response/user.response.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";

export const columns: ColumnDef<GotAllEmployeesResponse['items'][0]>[] = [
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
        id: "Mã",
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
        id: "Lương",
        accessorKey: "salary",
        header: ({column}) => column.id,
        cell: ({row}) => formatCurrency(row.original.salary)
    },
    {
        id: "Ngày nhận việc",
        accessorKey: "hire_date",
        header: ({column}) => column.id,
    },
    {
        id: "Tình trạng khóa",
        accessorKey: "is_blocked",
        header: ({column}) => column.id,
        cell: ({row}) => <>{row.original.is_blocked ? <CheckIcon className="h-4 w-4" /> : <XMarkIcon className="h-4 w-4"/>}</>
    },
    {
        id: "Tình trạng kích hoạt",
        accessorKey: "is_activated",
        header: ({column}) => column.id,
        cell: ({row}) => <>{row.original.is_blocked ? <CheckIcon className="h-4 w-4" /> : <XMarkIcon className="h-4 w-4"/>}</>
    }
]
