import {ColumnDef} from "@tanstack/react-table"
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {GotAllOrdersResponse} from "@/type/response/order.response.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {
    availableOrderStatuses,
    availablePaymentMethods,
    availableTransactionStatuses
} from "@/constant/available.constant.ts";

export const columns: ColumnDef<GotAllOrdersResponse['items'][0]>[] = [
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
        id: "Mã khách hàng",
        accessorKey: "customer_id",
        header: ({column}) => column.id,
    },
    {
        id: "Họ và tên người nhận hàng",
        accessorKey: "recipient_full_name",
        header: ({column}) => column.id,
    },
    {
        id: "Số điện thoại người nhận hàng",
        accessorKey: "recipient_phone",
        header: ({column}) => column.id,
    },
    {
        id: "Trạng thái đơn hàng",
        accessorKey: "order_status",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const order = row.original
            return (<>{availableOrderStatuses.find(orderStatus => orderStatus.name === order.order_status)?.title}</>)
        }
    },
    {
        id: "Phương thức thanh toán",
        accessorKey: "payment_method",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const order = row.original
            return (<>{availablePaymentMethods.find(paymentMethod => paymentMethod.name === order.payment_method)?.title}</>)
        }
    },
    {
        id: "Tổng tiền",
        accessorKey: "total_price",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const order = row.original
            return (<>{formatCurrency(order.total_price)}</>)
        },
    },
    {
        id: "Trạng thái giao dịch",
        accessorKey: "transaction_status",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const order = row.original
            return (<>{availableTransactionStatuses.find(transactionStatus => transactionStatus.name === order.transaction_status)?.title}</>)
        }
    },
    {
        id: "Thời gian tạo",
        accessorKey: "created_at",
        header: ({column}) => column.id,
        cell: ({row}) => {
            const order = row.original
            return (
                <>
                    {
                       new Date(order.created_at).toLocaleString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                        })
                    }
                </>
            )
        }
    },
]
