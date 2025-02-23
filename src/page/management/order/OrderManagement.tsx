import {columns} from "@/components/management/order/columns.tsx";
import {DataTable} from "@/components/management/order/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {OrderDeleteDialog} from "@/components/management/order/OrderDeleteDialog.tsx";
import {OrderDetailDialog} from "@/components/management/order/OrderDetailDialog.tsx";
import {Link} from "react-router-dom";
import {getAllOrders} from "@/redux/slice/order.slice.ts";

const OrderManagement = () => {
    const dispatch = useAppDispatch();
    const [openOrderDetailDialog, setOpenOrderDetailDialog] = useState<boolean>(false);
    const [openOrderDeleteDialog, setOpenOrderDeleteDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const {order} = useAppSelector(state => state.order);
    const allOrders = order.all
    

    useEffect(() => {
        if (!allOrders) {
            const promise = dispatch(getAllOrders());
            return () => promise.abort()
        }
    },[allOrders])

    const handleShowOrderDetail = (id: string) => {
        setOpenOrderDetailDialog(true);
        setSelectedId(id)
    };

    const handleShowOrderDelete = (id: string) => {
        setOpenOrderDeleteDialog(true);
        setSelectedId(id)
    };

    return (
        <div className="grid px-4">
            <DataTable
                columns={[
                    ...columns,
                    {
                        id: "Thao tác",
                        header: ({column}) => column.id,
                        cell: ({ row }) => {
                            const Order = row.original
                            return (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Danh sách thao tác</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleShowOrderDetail(Order.id)}>Xem chi tiết</DropdownMenuItem>
                                        <DropdownMenuItem asChild className="text-neutral-700">
                                            <Link to={`edit/${Order.id}`}>Chỉnh sửa</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShowOrderDelete(Order.id)}>Xóa</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        },
                    }
                ]}
                data={allOrders?.items ? allOrders.items : []}
            />
            <OrderDetailDialog open={openOrderDetailDialog} onOpenChange={setOpenOrderDetailDialog} id={selectedId as string} />
            <OrderDeleteDialog open={openOrderDeleteDialog} onOpenChange={setOpenOrderDeleteDialog} id={selectedId as string} />
        </div>
    )
}

export default OrderManagement