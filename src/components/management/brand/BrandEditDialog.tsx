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
    editBrand,
    getBrandDetail,
    resetEditedBrand
} from "@/redux/slice/brand.slice.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {EditBrandRequest} from "@/type/request/brand.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {editBrandSchema} from "@/schema/brand.schema.ts";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea.tsx";

interface BrandEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number
}

export const BrandEditDialog = ({open, onOpenChange, id}: BrandEditDialogProps) => {
    const dispatch = useAppDispatch();
    const {brand} = useAppSelector(state => state.brand)
    const brandDetail = brand.detail
    const editedBrand= brand.edited

    useEffect(() => {
        if (id) {
            const promise = dispatch(getBrandDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    useEffect(() => {
        if (editedBrand){
            toast.success(`Đã chỉnh sửa thông tin thương hiệu mã ${editedBrand.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetEditedBrand())
            setTimeout(() => onOpenChange(false), 2000)
        }
    }, [editedBrand]);

    useEffect(() => {
        if (brandDetail) {
            editBrandForm.reset({
                name: brandDetail.name,
                description: brandDetail.description,
            })
        }
    }, [brandDetail]);

    const editBrandForm = useForm<EditBrandRequest>({
        resolver: yupResolver(editBrandSchema),

    })

    const onSubmitEditBrandForm = (body: EditBrandRequest) => {
        const promise = dispatch(editBrand({body: body, brandId: id!}))
        return () => promise.abort()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Chỉnh sửa thông tin thương hiệu</DialogTitle>
                    <DialogDescription>Nhập thông tin chirh sửa về thương hiệu</DialogDescription>
                </DialogHeader>
                <Form {...editBrandForm}>
                    <form onSubmit={editBrandForm.handleSubmit(onSubmitEditBrandForm)} className="space-y-6">
                        <div className="grid gap-6">
                            <FormField
                                control={editBrandForm.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Tên <span
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
                                control={editBrandForm.control}
                                name="description"
                                render={({field}: { field: FieldValues }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Mô tả</FormLabel>
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
