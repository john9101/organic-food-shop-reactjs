import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {editProduct, getProductDetail, resetEditedProduct} from "@/redux/slice/product.slice.ts";
import {EditProductRequest} from "@/type/request/product.request.ts";
import {editProductSchema} from "@/schema/product.schema.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {availableMeasurementUnits} from "@/constant/available.constant.ts";
import {getAllCategories} from "@/redux/slice/category.slice.ts";
import {getAllBrands} from "@/redux/slice/brand.slice.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FileInput, FileUploader, FileUploaderContent, FileUploaderItem} from "@/components/extension/file-uploader.tsx";
import {CloudArrowUpIcon} from "@heroicons/react/24/outline";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {DropzoneOptions} from "react-dropzone";
import {Textarea} from "@/components/ui/textarea.tsx";
import {toast} from "sonner";

const EditProduct = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {id} = useParams();
    const {product} = useAppSelector(state => state.product)
    const {category} = useAppSelector(state => state.category);
    const {brand} = useAppSelector(state => state.brand);
    const productDetail = product.detail
    const editedProduct = product.edited
    const allCategories = category.all
    const allBrands = brand.all

    useEffect(() => {
        if (id) {
            const promise = dispatch(getProductDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    useEffect(() => {
        if (editedProduct) {
            toast.success(`Đã chỉnh sửa sản phẩm mã ${editedProduct.id} thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetEditedProduct())
            setTimeout(() => {
                navigate(`/product-management`);
            }, 2000)
        }
    }, [editedProduct])

    async function fileFromUrl(url: string, fileName: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch the file from URL: ${response.statusText}`);
        }
        const blob = await response.blob();
        return  new File([blob], fileName, {type: blob.type})
    }


    // useEffect(() => {
    //     if (productDetail) {
    //         editProductForm.reset({
    //             name: productDetail.name,
    //             regularPrice: productDetail.regular_price,
    //             discountPercent: productDetail.discount_percent,
    //             categoryId: 1,
    //             brandId: 1,
    //             shortDescription: productDetail.short_description,
    //             longDescription: productDetail.long_description,
    //             measurementUnit: productDetail.measurement_unit_mame,
    //             measurementValue: productDetail.measurement_value
    //         })
    //
    //     }
    // }, [productDetail]);


    useEffect(() => {
        if (!allCategories) {
            const promise = dispatch(getAllCategories())
            return () => promise.abort()
        }

        if (!allBrands) {
            const promise = dispatch(getAllBrands())
            return () => promise.abort()
        }

        if (productDetail) {
            editProductForm.reset({
                name: productDetail.name,
                regularPrice: productDetail.regular_price,
                discountPercent: productDetail.discount_percent,
                categoryId: productDetail.category_id,
                brandId: productDetail.brand_id,
                shortDescription: productDetail.short_description,
                longDescription: productDetail.long_description,
                measurementUnit: productDetail.measurement_unit_mame,
                measurementValue: productDetail.measurement_value,
            });

            (async () => {
                const images = await Promise.all(
                    productDetail.images.map((image) =>
                        fileFromUrl(image.url, productDetail.title + image.id)
                    )
                );
                editProductForm.setValue("images", images)
            })();
        }

    }, [productDetail,allCategories, allBrands])

    const dropzone = {
        accept: {
            "image/*": [".jpeg", ".png"],
        },
        multiple: true,
        maxFiles: 4,
        maxSize: 2 * 1024 * 1024,
    } satisfies DropzoneOptions;

    const editProductForm = useForm<EditProductRequest>({
        resolver: yupResolver(editProductSchema),
    })

    const onSubmitEditProductForm = (body: EditProductRequest) => {
        if (id) {
            const promise = dispatch(editProduct({productId: Number(id), body: body}))
            return () => promise.abort()
        }
    }

    return (
        <Card className="grid gap-4 rounded-none border-none shadow-none">
            <CardHeader className="px-5">
                <CardTitle className="tracking-tighter text-green-600">Chỉnh sửa thông tin sản phẩm</CardTitle>
                <CardDescription>Nhập thông tin chỉnh sửa về sản phẩm</CardDescription>
            </CardHeader>
            <Form {...editProductForm}>
                <form onSubmit={editProductForm.handleSubmit(onSubmitEditProductForm)} className="space-y-6">
                    <CardContent className="px-5">

                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={editProductForm.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
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
                                control={editProductForm.control}
                                name="regularPrice"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Giá bán <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="discountPercent"
                                render={({field}: {field: FieldValues}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Phần trăm khuyến mãi</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} autoComplete="on"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="categoryId"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Danh mục</FormLabel>
                                        <Select onValueChange={field.onChange} value={String(field.value)}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    allCategories?.items.map((categoryItem, index) => (
                                                        <SelectItem key={index}
                                                                    value={String(categoryItem.id)}>{categoryItem.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="brandId"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Thương hiệu</FormLabel>
                                        <Select onValueChange={field.onChange} value={String(field.value)}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    allBrands?.items.map((brandItem, index) => (
                                                        <SelectItem key={index}
                                                                    value={String(brandItem.id)}>{brandItem.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="shortDescription"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel>Mô tả ngắn gọn</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} autoComplete="on"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="longDescription"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel>Mô tả chi tiết</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} autoComplete="on"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="measurementUnit"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Đơn vị đo lường <span
                                            className="text-red-600">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    availableMeasurementUnits.map((measurementUnit, index) => (
                                                        <SelectItem key={index}
                                                                    value={measurementUnit.name}>{measurementUnit.title}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={editProductForm.control}
                                name="measurementValue"
                                render={({field}) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel className="text-black">Giá trị đo lường <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} autoComplete="on"/>
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600"/>
                                    </FormItem>
                                )}
                            />

                            {/*<FormField*/}
                            {/*    control={editProductForm.control}*/}
                            {/*    name="images"*/}
                            {/*    render={({field}) => (*/}
                            {/*        <FormItem className="flex flex-col items-start col-span-2">*/}
                            {/*            <FormLabel className="text-black">Hình ảnh sản phẩm <span*/}
                            {/*                className="text-red-600">*</span></FormLabel>*/}
                            {/*            <FormControl>*/}
                            {/*                <Input accept="image/*" type="file" multiple autoComplete="on"*/}
                            {/*                       onChange={(e) => {*/}
                            {/*                           const files = Array.from(e.target.files || []);*/}
                            {/*                           field.onChange([...files]);*/}
                            {/*                       }}/>*/}
                            {/*            </FormControl>*/}
                            {/*            {*/}
                            {/*                field.value &&*/}
                            {/*                <div*/}
                            {/*                    className="mt-4 flex w-full flex-wrap gap-2 p-2 border border-input rounded">*/}
                            {/*                    {field.value.map((file, index) => (*/}
                            {/*                        <div key={index} className="relative w-32 h-32">*/}
                            {/*                            <img src={URL.createObjectURL(file)}*/}
                            {/*                                 alt={`image-${index}`}*/}
                            {/*                                 className="w-full h-full object-cover rounded"/>*/}
                            {/*                        </div>*/}
                            {/*                    ))}*/}
                            {/*                </div>*/}
                            {/*            }*/}
                            {/*            <FormMessage className="text-xs text-red-600"/>*/}
                            {/*        </FormItem>*/}
                            {/*    )}*/}
                            {/*/>*/}

                            <FormField
                                control={editProductForm.control}
                                name="images"
                                render={({field, fieldState}) => (
                                    <FormItem className="flex flex-col items-start col-span-2">
                                        <FormLabel className="text-black">Hình ảnh <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FileUploader
                                            value={field.value!}
                                            onValueChange={field.onChange}
                                            dropzoneOptions={dropzone}
                                        >
                                            <FileInput>
                                                <div
                                                    className="flex flex-col items-center justify-center p-4 border border-dashed bg-background rounded-md">
                                                    <CloudArrowUpIcon className="h-16 w-16 text-gray-500"/>
                                                    <p className="text-sm mb-1 text-gray-500"><span
                                                        className="font-semibold">Nhấn để tải lên</span> hoặc kéo
                                                        thả
                                                    </p>
                                                    <p className="text-xs text-gray-500">JPEG hoặc PNG (Tối đa 2MB)</p>
                                                </div>
                                            </FileInput>
                                            {
                                                !fieldState.invalid ?
                                                    <FileUploaderContent
                                                        className="top-full w-full rounded-md flex-row gap-2">
                                                        {
                                                            field.value && field.value.length > 0 && (
                                                                field.value.map((image, i) => (
                                                                    <FileUploaderItem
                                                                        key={i}
                                                                        index={i}
                                                                        className="p-0 size-40 border border-input border-dashed"
                                                                    >
                                                                        <AspectRatio ratio={16 / 9}>
                                                                            <img
                                                                                src={URL.createObjectURL(image)}
                                                                                alt={image.name}
                                                                                className="object-cover h-full w-full"
                                                                            />
                                                                        </AspectRatio>
                                                                    </FileUploaderItem>
                                                                ))
                                                            )
                                                        }
                                                    </FileUploaderContent>
                                                    : <span
                                                        className="text-xs mt-2 text-red-600 font-medium">{fieldState.error?.message}</span>
                                            }
                                        </FileUploader>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 justify-end">
                        <Button variant="secondary" asChild className="hover:text-black">
                            <Link to="/product-management">Hủy</Link>
                        </Button>
                        <Button type="submit" className="hover:bg-green-500 bg-green-600">Lưu</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}

export default EditProduct