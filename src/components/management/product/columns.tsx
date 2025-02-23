import { ColumnDef } from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllProductsResponse} from "@/type/response/product.response.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

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
        id: "Mã",
        accessorKey: "id",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.id}</span>
    },
    {
        id: "Tiêu đề",
        accessorKey: "title",
        header: ({column}) => column.id,
        cell: ({row}) => <span className={`${row.original.is_deleted && 'text-red-600 line-through'}`}>{row.original.title}</span>
    },
    {
        id: "Giá bán",
        accessorKey: "regular_price",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const product = row.original
            return (<span className={`${product.is_deleted && 'text-red-600 line-through'}`}>{formatCurrency(product.regular_price)}</span>)
        },
    },
    {
        id: "Phần trăm khuyến mãi",
        accessorKey: "discount_percent",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const product = row.original
            const discountPercent = product.discount_percent
            return (<span className={`${product.is_deleted && 'text-red-600 line-through'}`}>{discountPercent && discountPercent + "%"}</span>)
        },
    },
    {
        id: "Giá khuyến mãi",
        accessorKey: "discount_price",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const product = row.original
            return (<span className={`${product.is_deleted && 'text-red-600 line-through'}`}>{product.discount_price ? formatCurrency(product.regular_price) : ''}</span>)
        }
    },
    {
        id: "Hiển thị",
        accessorKey: "is_visible",
        header: ({column}) => column.id,
        cell: ({row}) => <>{row.original.is_visible ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4"/>}</>
    }
]
