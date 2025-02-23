import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllVouchersResponse} from "@/type/response/voucher.response.ts";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";

export const columns: ColumnDef<GotAllVouchersResponse['items'][0]>[] = [
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
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.id}</span>
    },
    {
        id: "Code",
        accessorKey: "code",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.code}</span>
    },
    {
        id: "Số lượt dùng còn lại",
        accessorKey: "quantity",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.quantity}</span>
    },
    {
        id: "Phần trăm giảm giá",
        accessorKey: "discount_percent",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.discount_percent ? row.original.discount_percent + "%" : ''}</span>
    },
    {
        id: "Ngày hiệu lực",
        accessorKey: "effective_date",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.effective_date.toString()}</span>
    },
    {
        id: "Ngày hết hạn",
        accessorKey: "expiry_date",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.expiry_date.toString()}</span>
    },
    {
        id: "Hiển thị",
        accessorKey: "is_visible",
        header: ({column}) => column.id,
        cell: ({row}) => <>{row.original.is_visible ? <CheckIcon className="h-4 w-4" /> : <XMarkIcon className="h-4 w-4"/>}</>
    }
]
