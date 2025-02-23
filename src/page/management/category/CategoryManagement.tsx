import {columns} from "@/components/management/category/columns";
import {DataTable} from "@/components/management/category/data-table.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {useEffect, useState} from "react";
import {getAllProducts} from "@/redux/slice/product.slice.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {CategoryDetailDialog} from "@/components/management/category/CategoryDetailDialog.tsx";
import {
    displayCategory,
    getAllCategories,
    recoverCategory,
    resetRecoveredCategory
} from "@/redux/slice/category.slice.ts";
import {CategoryEditDialog} from "@/components/management/category/CategoryEditDialog.tsx";
import {formatDisplayStatus} from "@/util/decoration.util.ts";
import {CategoryDeleteDialog} from "@/components/management/category/CategoryDeleteDialog.tsx";
import {toast} from "sonner";

const CategoryManagement = () => {
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product);
    const {category} = useAppSelector(state => state.category);
    const allProducts = product.all
    const allCategories = category.all
    const recoveredCategory = category.recovered
    const displayedCategory = category.displayed
    const [openCategoryDetailDialog, setOpenCategoryDetailDialog] = useState<boolean>(false);
    const [openCategoryEditDialog, setOpenCategoryEditDialog] = useState<boolean>(false);
    const [openCategoryDeleteDialog, setOpenCategoryDeleteDialog] = useState<boolean>(false);
    // const [openCategoryRecoverDialog, setOpenCategoryRecoverDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (!allProducts) {
            const promise = dispatch(getAllProducts());
            return () => promise.abort()
        }
    },[allProducts])

    useEffect(() => {
        if (!allCategories) {
            const promise = dispatch(getAllCategories())
            return () => promise.abort()
        }
    }, [allCategories])

    useEffect(() => {
        if (recoveredCategory){
            toast.success(`Đã khôi phục danh mục sản phẩm mã ${recoveredCategory.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetRecoveredCategory())
        }
    }, [recoveredCategory]);

    useEffect(() => {
        if (displayedCategory) {
            toast.success(`Đã ${displayedCategory.is_visible ? 'hiện' : 'ẩn'} danh mục sản phẩm mã ${displayedCategory.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetRecoveredCategory())
        }
    }, [displayedCategory]);

    const handleShowCategoryDetail = (id: number) => {
        setOpenCategoryDetailDialog(true);
        setSelectedId(id)
    };

    const handleShowCategoryEdit = (id: number) => {
        setOpenCategoryEditDialog(true);
        setSelectedId(id)
    };

    const handleShowCategoryDelete = (id: number) => {
        setOpenCategoryDeleteDialog(true);
        setSelectedId(id)
    };

    const handleRecoverCategory = (id: number) => {
        const promise = dispatch(recoverCategory(id!))
        return () => promise.abort()
    }

    const handleDisplayCategory = (id: number, isVisibile: boolean) => {
        const promise = dispatch(displayCategory({categoryId: id, isVisible: !isVisibile}))
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
                            const category = row.original
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
                                                !category.is_deleted ? <>
                                                    <DropdownMenuItem onClick={() => handleShowCategoryDetail(category.id)}>Xem chi tiết</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleShowCategoryEdit(category.id)}>Chỉnh sửa</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDisplayCategory(category.id, category.is_visible)}>{formatDisplayStatus(category.is_visible)}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleShowCategoryDelete(category.id)}>Xóa</DropdownMenuItem>
                                                </> : <DropdownMenuItem onClick={() => handleRecoverCategory(category.id)}>Khôi phục</DropdownMenuItem>
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )
                        },
                    },
                ]}
                data={allCategories?.items ? allCategories.items : []}
            />
            <CategoryDetailDialog open={openCategoryDetailDialog} onOpenChange={setOpenCategoryDetailDialog} id={selectedId as number} />
            <CategoryEditDialog open={openCategoryEditDialog} onOpenChange={setOpenCategoryEditDialog} id={selectedId as number} />
            <CategoryDeleteDialog open={openCategoryDeleteDialog} onOpenChange={setOpenCategoryDeleteDialog} id={selectedId as number} />
        </div>
    )
}

export default CategoryManagement