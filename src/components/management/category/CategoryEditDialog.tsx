import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {
    editCategory,
    getCategoryDetail,
    resetEditedCategory
} from "@/redux/slice/category.slice.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {EditCategoryRequest} from "@/type/request/category.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {editCategorySchema} from "@/schema/category.schema.ts";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea.tsx";

interface CategoryEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CategoryEditDialog = ({open, onOpenChange, id}: CategoryEditDialogProps) => {
    const dispatch = useAppDispatch();
    const {category} = useAppSelector(state => state.category)
    const categoryDetail = category.detail
    const editedCategory= category.edited

    useEffect(() => {
        if (id) {
            const promise = dispatch(getCategoryDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    useEffect(() => {
        if (editedCategory){
            toast.success(`Đã chỉnh sửa thông tin danh mục sản phẩm mã ${editedCategory.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetEditedCategory())
            setTimeout(() => onOpenChange(false), 2000)
        }
    }, [editedCategory]);

    useEffect(() => {
        if (categoryDetail) {
            editCategoryForm.reset({
                name: categoryDetail.name,
                description: categoryDetail.description,
            })
        }
    }, [categoryDetail]);

    const editCategoryForm = useForm<EditCategoryRequest>({
        resolver: yupResolver(editCategorySchema),

    })

    const onSubmitEditCategoryForm = (body: EditCategoryRequest) => {
        const promise = dispatch(editCategory({body: body, categoryId: id!}))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chỉnh sửa thông tin danh mục</DialogTitle>
                    <DialogDescription>Nhập thông tin chirh sửa về danh mục</DialogDescription>
                </DialogHeader>
                <Form {...editCategoryForm}>
                    <form onSubmit={editCategoryForm.handleSubmit(onSubmitEditCategoryForm)} className="space-y-6">
                        <div className="grid gap-6">
                            <FormField
                                control={editCategoryForm.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Tên danh mục sản phẩm <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                autoComplete="on"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editCategoryForm.control}
                                name="description"
                                render={({field}: { field: FieldValues }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Mô tả danh mục sản phẩm</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} autoComplete="on"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-500">Lưu</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
