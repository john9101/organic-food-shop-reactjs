import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {editProduct, getProductDetail, resetEditedProduct} from "@/redux/slice/product.slice.ts";
import {EditProductRequest} from "@/type/request/product.request.ts";
import {editProductSchema} from "@/schema/product.schema.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {availableMeasurementUnits} from "@/constant/available.constant.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {getAllCategories} from "@/redux/slice/category.slice.ts";
import {getAllBrands} from "@/redux/slice/brand.slice.ts";

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
        if (id && !productDetail) {
            const promise = dispatch(getProductDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id, productDetail])

    useEffect(() =>{
        if (editedProduct){
            dispatch(resetEditedProduct())
            navigate(`/product-management`);
        }
    }, [editedProduct])


    useEffect(() => {
        if (productDetail) {
            editCustomerForm.reset({
                name: productDetail.name,
                regularPrice: productDetail.regular_price,
                discountPercent: productDetail.discount_percent,
                categoryId: 1,
                brandId: 1,
                shortDescription: productDetail.short_description,
                longDescription: productDetail.long_description,
                measurementUnit: productDetail.measurement_unit_mame,
                measurementValue: productDetail.measurement_value,
            })
        }
    }, [productDetail]);

    useEffect(() => {
        if (!allCategories) {
            const promise = dispatch(getAllCategories())
            return () => promise.abort()
        }

        if (!allBrands) {
            const promise = dispatch(getAllBrands())
            return () => promise.abort()
        }
    }, [allCategories, allBrands])

    const editCustomerForm = useForm<EditProductRequest>({
        resolver: yupResolver(editProductSchema),
    })

    const onSubmitEditCustomerForm = (body: EditProductRequest) => {
        if (id){
            const promise = dispatch(editProduct({productId: Number(id), body: body}))
            return () => promise.abort()
        }
    }

    return (
        <div className="grid gap-4 px-4">
            <h2 className="text-2xl font-bold tracking-tighter">Chỉnh sửa thông tin sản phẩm</h2>
            <Form {...editCustomerForm}>
                <form onSubmit={editCustomerForm.handleSubmit(onSubmitEditCustomerForm)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={editCustomerForm.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start col-span-2">
                                    <FormLabel className="text-black">Tên sản phẩm <span
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
                            control={editCustomerForm.control}
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
                            control={editCustomerForm.control}
                            name="discountPercent"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Phần trăm khuyến mãi</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} autoComplete="on"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editCustomerForm.control}
                            name="categoryId"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Danh mục <span
                                        className="text-red-600">*</span></FormLabel>
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
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editCustomerForm.control}
                            name="brandId"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-black">Thương hiệu <span
                                        className="text-red-600">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} value={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                allBrands?.items.map((categoryItem, index) => (
                                                    <SelectItem key={index}
                                                                value={String(categoryItem.id)}>{categoryItem.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editCustomerForm.control}
                            name="shortDescription"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start col-span-2">
                                    <FormLabel>Mô tả ngắn</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="on"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editCustomerForm.control}
                            name="longDescription"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start col-span-2">
                                    <FormLabel>Mô tả chi tiết</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} autoComplete="on"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={editCustomerForm.control}
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
                            control={editCustomerForm.control}
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

                        <FormField
                            control={editCustomerForm.control}
                            name="images"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start col-span-2">
                                    <FormLabel className="text-black">Hình ảnh sản phẩm <span
                                        className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Input accept="image/*" type="file" multiple autoComplete="on"
                                               onChange={(e) => {
                                                   const files = Array.from(e.target.files || []);
                                                   field.onChange([...files]);
                                               }}/>
                                    </FormControl>
                                    {
                                        field.value &&
                                        <div
                                            className="mt-4 flex w-full flex-wrap gap-2 p-2 border border-input rounded">
                                            {field.value.map((file, index) => (
                                                <div key={index} className="relative w-32 h-32">
                                                    <img src={URL.createObjectURL(file)} alt={`image-${index}`}
                                                         className="w-full h-full object-cover rounded"/>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    <FormMessage className="text-xs text-red-600"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Separator className="ml-auto w-1/12" orientation="horizontal"/>
                    <div className="flex gap-2 justify-end">
                        <Button variant="secondary" asChild className="hover:text-black">
                            <Link to="/product-management">Hủy</Link>
                        </Button>
                        <Button type="submit">Lưu</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditProduct