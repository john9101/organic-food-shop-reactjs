import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllCategoriesResponse} from "@/type/response/category.response.ts";

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
        id: "Mã danh mục sản phẩm",
        accessorKey: "id",
        header: ({column}) => column.id
    },
    {
        id: "Tên danh mục sản phẩm",
        accessorKey: "name",
        header: ({column}) => column.id,
    },
    {
        id: "Mô tả danh mục sản phẩm",
        accessorKey: "description",
        header: ({column}) => column.id,
    }
]
