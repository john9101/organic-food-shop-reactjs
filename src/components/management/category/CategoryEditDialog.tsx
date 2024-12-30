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
import {getCategoryDetail, resetEditedCategory} from "@/redux/slice/category.slice.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {EditCategoryRequest} from "@/type/request/category.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {editCategorySchema} from "@/schema/category.schema.ts";
import {useNavigate} from "react-router-dom";

interface CategoryEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const CategoryEditDialog = ({open, onOpenChange, id}: CategoryEditDialogProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {category} = useAppSelector(state => state.category)
    const categoryDetail = category.detail
    const categoryEdited = category.edited

    useEffect(() => {
        if (categoryEdited){
            dispatch(resetEditedCategory())
            navigate("/category-management")
        }
    }, [categoryEdited]);

    useEffect(() => {
        if (id) {
            const promise = dispatch(getCategoryDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

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
        console.log(body)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thông tin danh mục sản phẩm</DialogTitle>
                    <DialogDescription>Nhập thông tin chirh sửa về danh mục sản phẩm</DialogDescription>
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
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Mô tả danh mục sản phẩm</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="on"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => onOpenChange(false)}>Đóng</Button>
                            <Button type="submit">Lưu</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
