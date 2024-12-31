import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllProductsResponse} from "@/type/response/product.response.ts";
import {formatCurrency} from "@/util/decoration.util.ts";

export const columns: ColumnDef<GotAllProductsResponse['items'][0]>[] = [
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
        id: "Mã sản phẩm",
        accessorKey: "id",
        header: ({column}) => column.id
    },
    {
        id: "Tiêu đề sản phẩm",
        accessorKey: "title",
        header: ({column}) => column.id,
    },
    {
        id: "Giá bán",
        accessorKey: "regular_price",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const product = row.original
            return (<>{formatCurrency(product.regular_price)}</>)
        },
    },
    {
        id: "Giá khuyến mãi",
        accessorKey: "discount_price",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const product = row.original
            return (<>{product.discount_price ? formatCurrency(product.regular_price) : ''}</>)
        }
    },
]
