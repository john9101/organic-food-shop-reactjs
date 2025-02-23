import {columns} from "@/components/management/brand/columns";
import {DataTable} from "@/components/management/brand/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect,
    useState
} from "react";
// import {getAllProducts} from "@/redux/slice/product.slice.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {
    displayBrand,
    getAllBrands, recoverBrand,
    resetRecoveredBrand
} from "@/redux/slice/brand.slice.ts";
import {BrandEditDialog} from "@/components/management/brand/BrandEditDialog.tsx";
import {formatDisplayStatus} from "@/util/decoration.util.ts";
import {BrandDeleteDialog} from "@/components/management/brand/BrandDeleteDialog.tsx";
import {toast} from "sonner";

const BrandManagement = () => {
    const dispatch = useAppDispatch();
    const {brand} = useAppSelector(state => state.brand);
    const allBrands = brand.all
    const recoveredBrand = brand.recovered
    const displayedBrand = brand.displayed
    const [openBrandEditDialog, setOpenBrandEditDialog] = useState<boolean>(false);
    const [openBrandDeleteDialog, setOpenBrandDeleteDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (!allBrands){
            const promise = dispatch(getAllBrands())
            return () => promise.abort()
        }
    }, [allBrands]);

    useEffect(() => {
        if (recoveredBrand){
            toast.success(`Đã khôi phục thương hiệu mã ${recoveredBrand.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetRecoveredBrand())
        }
    }, [recoveredBrand]);

    useEffect(() => {
        if (displayedBrand) {
            toast.success(`Đã ${displayedBrand.is_visible ? 'hiện' : 'ẩn'} thương hiệu mã ${displayedBrand.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetRecoveredBrand())
        }
    }, [displayedBrand]);

    const handleShowBrandEdit = (id: number) => {
        setOpenBrandEditDialog(true);
        setSelectedId(id)
    };

    const handleShowBrandDelete = (id: number) => {
        setOpenBrandDeleteDialog(true);
        setSelectedId(id)
    };

    const handleRecoverBrand = (id: number) => {
        const promise = dispatch(recoverBrand(id!))
        return () => promise.abort()
    }

    const handleDisplayBrand = (id: number, isVisible: boolean) => {
        const promise = dispatch(displayBrand({brandId: id, isVisible: !isVisible}))
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
                            const brand = row.original
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
                                                !brand.is_deleted ? <>
                                                    <DropdownMenuItem onClick={() => handleShowBrandEdit(brand.id)}>Chỉnh sửa</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDisplayBrand(brand.id, brand.is_visible)}>{formatDisplayStatus(brand.is_visible)}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleShowBrandDelete(brand.id)}>Xóa</DropdownMenuItem>
                                                </> : <DropdownMenuItem onClick={() => handleRecoverBrand(brand.id)}>Khôi phục</DropdownMenuItem>
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )
                        },
                    },
                ]}
                data={allBrands?.items ? allBrands.items : []}
            />
            <BrandEditDialog open={openBrandEditDialog} onOpenChange={setOpenBrandEditDialog} id={selectedId as number} />
            <BrandDeleteDialog open={openBrandDeleteDialog} onOpenChange={setOpenBrandDeleteDialog} id={selectedId as number} />
        </div>
    )
}

export default BrandManagement