import {columns} from "@/components/management/voucher/columns";
import {DataTable} from "@/components/management/voucher/data-table.tsx";
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
import {VoucherDetailDialog} from "@/components/management/voucher/VoucherDetailDialog.tsx";
import {VoucherEditDialog} from "@/components/management/voucher/VoucherEditDialog.tsx";
import {
    displayVoucher,
    getAllVouchers,
    recoverVoucher,
    resetDisplayedVoucher,
    resetRecoveredVoucher
} from "@/redux/slice/voucher.slice.ts";
import {formatDisplayStatus} from "@/util/decoration.util.ts";
import {VoucherDeleteDialog} from "@/components/management/voucher/VoucherDeleteDialog.tsx";
import {toast} from "sonner";

const VoucherManagement = () => {
    const dispatch = useAppDispatch();
    const {voucher} = useAppSelector(state => state.voucher);
    const allVouchers = voucher.all
    const recoveredVoucher = voucher.recovered
    const displayedVoucher = voucher.displayed
    const [openVoucherDetailDialog, setOpenVoucherDetailDialog] = useState<boolean>(false);
    const [openVoucherEditDialog, setOpenVoucherEditDialog] = useState<boolean>(false);
    const [openVoucherDeleteDialog, setOpenVoucherDeleteDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (!allVouchers) {
            const promise = dispatch(getAllVouchers());
            return () => promise.abort()
        }
    },[allVouchers])

    useEffect(() => {
        if (recoveredVoucher){
            toast.success(`Đã khôi phục voucher mã ${recoveredVoucher.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetRecoveredVoucher())
        }
    }, [recoveredVoucher]);

    useEffect(() => {
        if (displayedVoucher) {
            toast.success(`Đã ${displayedVoucher.is_visible ? 'hiện' : 'ẩn'} voucher mã ${displayedVoucher.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetDisplayedVoucher())
        }
    }, [displayedVoucher]);

    const handleShowVoucherDetail = (id: number) => {
        setOpenVoucherDetailDialog(true);
        setSelectedId(id)
    };

    const handleShowVoucherEdit = (id: number) => {
        setOpenVoucherEditDialog(true);
        setSelectedId(id)
    };

    const handleShowVoucherDelete = (id: number) => {
        setOpenVoucherDeleteDialog(true);
        setSelectedId(id)
    };

    const handleRecoverVoucher= (id: number) => {
        const promise = dispatch(recoverVoucher(id!))
        return () => promise.abort()
    }

    const handleDisplayVoucher = (id: number, isVisible: boolean) => {
        const promise = dispatch(displayVoucher({voucherId: id, isVisible: !isVisible}))
        return () => promise.abort()
    }

    return (
        <div className="grid px-4">
            <DataTable
                columns={[
                    ...columns,
                    {
                        id: "actions",
                        header: "Thao tác",
                        cell: ({ row }) => {
                            const voucher = row.original
                            return (
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Danh sách thao tác</DropdownMenuLabel>
                                            {
                                                !voucher.is_deleted ? <>
                                                    <DropdownMenuItem onClick={() => handleShowVoucherDetail(voucher.id)}>Xem chi tiết</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleShowVoucherEdit(voucher.id)}>Chỉnh sửa</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDisplayVoucher(voucher.id, voucher.is_visible)}>{formatDisplayStatus(voucher.is_visible)}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleShowVoucherDelete(voucher.id)}>Xóa</DropdownMenuItem>
                                                </> : <DropdownMenuItem onClick={() => handleRecoverVoucher(voucher.id)}>Khôi phục</DropdownMenuItem>
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )
                        },
                    },
                ]}
                data={allVouchers?.items ? allVouchers.items : []}
            />
            <VoucherDetailDialog open={openVoucherDetailDialog} onOpenChange={setOpenVoucherDetailDialog} id={selectedId as number} />
            <VoucherEditDialog open={openVoucherEditDialog} onOpenChange={setOpenVoucherEditDialog} id={selectedId as number} />
            <VoucherDeleteDialog open={openVoucherDeleteDialog} onOpenChange={setOpenVoucherDeleteDialog} id={selectedId as number} />
        </div>
    )
}

export default VoucherManagement