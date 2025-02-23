import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/cHiểnheckbox.tsx";
import {GotAllCategoriesResponse} from "@/type/response/category.response.ts";
import { EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

export const columns: ColumnDef<GotAllCategoriesResponse['items'][0]>[] = [
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
        id: "Tên",
        accessorKey: "name",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.name}</span>
    },
    {
        id: "Mô tả",
        accessorKey: "description",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.description}</span>
    },
    {
        id: "Hiển thị",
        accessorKey: 'is_visible',
        header: ({column}) => column.id,
        cell: ({row}) => <>{row.original.is_visible ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4"/>}</>
    }
]
