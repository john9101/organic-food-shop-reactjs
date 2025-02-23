import {columns} from "@/components/management/product/columns.tsx";
import {DataTable} from "@/components/management/product/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect, useState} from "react";
import {
    displayProduct,
    getAllProducts,
    recoverProduct,
    resetDisplayedProduct,
    resetRecoveredProduct
} from "@/redux/slice/product.slice.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {ProductDetailDialog} from "@/components/management/product/ProductDetailDialog.tsx";
import {Link} from "react-router-dom";
import {ProductDeleteDialog} from "@/components/management/product/ProductDeleteDialog.tsx";
import {formatDisplayStatus} from "@/util/decoration.util.ts";
import {toast} from "sonner";

const ProductManagement = () => {
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product);
    const allProducts = product.all
    const recoveredProduct = product.recovered
    const displayedProduct = product.displayed
    const [openProductDetailDialog, setOpenProductDetailDialog] = useState<boolean>(false);
    const [openProductDeleteDialog, setOpenProductDeleteDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (!allProducts) {
            const promise = dispatch(getAllProducts());
            return () => promise.abort()
        }
    },[allProducts])

    useEffect(() => {
        if (recoveredProduct){
            toast.success(`Đã khôi phục sản phẩm mã ${recoveredProduct.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetRecoveredProduct())
        }
    }, [recoveredProduct]);

    useEffect(() => {
        if (displayedProduct) {
            toast.success(`Đã ${displayedProduct.is_visible ? 'hiện' : 'ẩn'} sản phẩm mã ${displayedProduct.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetDisplayedProduct())
        }
    }, [displayedProduct]);

    const handleShowProductDetail = (id: number) => {
        setOpenProductDetailDialog(true);
        setSelectedId(id)
    };

    const handleShowProductDelete = (id: number) => {
        setOpenProductDeleteDialog(true);
        setSelectedId(id)
    };

    const handleRecoverProduct= (id: number) => {
        const promise = dispatch(recoverProduct(id!))
        return () => promise.abort()
    }

    const handleDisplayProduct = (id: number, isVisible: boolean) => {
        const promise = dispatch(displayProduct({productId: id, isVisible: !isVisible}))
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
                            const product = row.original
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
                                                !product.is_deleted ? <>
                                                    <DropdownMenuItem onClick={() => handleShowProductDetail(product.id)}>Xem chi tiết</DropdownMenuItem>
                                                    <DropdownMenuItem asChild className="text-neutral-700">
                                                        <Link to={`edit/${product.id}`}>Chỉnh sửa</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDisplayProduct(product.id, product.is_visible)}>{formatDisplayStatus(product.is_visible)}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleShowProductDelete(product.id)}>Xóa</DropdownMenuItem>
                                                </> : <DropdownMenuItem onClick={() => handleRecoverProduct(product.id)}>Khôi phục</DropdownMenuItem>
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )
                        },
                    },
                ]}
                data={allProducts?.items ? allProducts.items : []}
            />
            <ProductDetailDialog open={openProductDetailDialog} onOpenChange={setOpenProductDetailDialog} id={selectedId as number} />
            <ProductDeleteDialog open={openProductDeleteDialog} onOpenChange={setOpenProductDeleteDialog} id={selectedId as number} />
        </div>
    )
}

export default ProductManagement