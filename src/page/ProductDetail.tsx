import {StarIcon} from "@heroicons/react/24/solid";
import {formatCurrency} from "@/util/decoration.util.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {ChatBubbleLeftRightIcon, QueueListIcon} from "@heroicons/react/16/solid";
import {ShoppingBagIcon, HeartIcon, ChatBubbleLeftEllipsisIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Textarea} from "@/components/ui/textarea.tsx";
import Comment from "@/components/common/Comment.tsx";
import Review from "@/components/common/Review.tsx";
import {useParams} from "react-router-dom";
import {AddCommentRequest} from "@/type/request/comment.request.ts";
import {addCommentSchema} from "@/schema/comment.schema.ts";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {getProductDetail} from "@/redux/slice/product.slice.ts";
import QuantityChanger from "@/components/common/QuantityChanger.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {AddItemToCartRequest} from "@/type/request/cart.request.ts";
import {addItemToCart, resetAddedCartItem} from "@/redux/slice/cart.slice.ts";
import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem, SliderThumbItem
} from "@/components/extension/carousel.tsx";
import {toast} from "sonner";
import {
    addComment,
    getCommentsOfProduct,
    resetAddedComment,
    resetCommentsOfProduct
} from "@/redux/slice/comment.slice.ts";

const ProductDetail = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product)
    const {comment} = useAppSelector(state => state.comment)
    const {cart} = useAppSelector(state => state.cart)
    const productDetail = product.detail
    const addedComment = comment.added
    const commentsOfProduct = comment.ofProduct
    const addedCartItem = cart.item.added
    const [buyQuantity, setBuyQuantity] = useState<number>(1);

    useEffect(() => {
        if (addedCartItem) {
            toast.success(`Đã thêm sản phẩm ${addedCartItem.item_title} vào giỏ hàng!`, {
                position: "bottom-center",
                duration: 2000,
                className: "w-56"
            })
            dispatch(resetAddedCartItem())
        }
    }, [addedCartItem])

    useEffect(() => {
        if (id) {
            dispatch(resetCommentsOfProduct())
            const promise = dispatch(getProductDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    useEffect(() => {
        if (!commentsOfProduct){
            const promise = dispatch(getCommentsOfProduct(Number(id)))
            return () => promise.abort()
        }
    }, [commentsOfProduct]);

    useEffect(() => {
        if (addedComment){
            addCommentForm.reset({content: ""})
            dispatch(resetAddedComment())
        }
    }, [addedComment]);

    const handleMinusBuyQuantity = () => {
        if (buyQuantity > 1) setBuyQuantity(buyQuantity - 1);
    };

    const handlePlusBuyQuantity = () => {
        setBuyQuantity(buyQuantity + 1);
    };

    const handleChangeBuyQuantity = (newBuyQuantity: number) => {
        setBuyQuantity(newBuyQuantity);
    };

    const addCommentForm = useForm<AddCommentRequest>({
        resolver: yupResolver(addCommentSchema)
    })

    const onSubmitAddItemToCartForm = () => {
        if (productDetail!.id && buyQuantity > 0) {
            const body: AddItemToCartRequest = {productId: productDetail!.id, quantity: buyQuantity};
            const promise = dispatch(addItemToCart(body));
            return () => promise.abort();
        }
    }

    const onSubmitAddCommentForm = (body: AddCommentRequest) => {
        const promise = dispatch(addComment({productId: Number(id!), body: body}))
        return () => promise.abort()
    }

    return (
        <div className="container mx-auto py-8 space-y-12">
            <div className="grid gap-10 md:grid-cols-2">
                <Carousel orientation="horizontal" className="w-full flex flex-col items-center gap-2">
                    <div className="relative w-full basis-3/4">
                        <CarouselMainContainer className="h-full">
                            {productDetail?.images.map((image, index) => (
                                <SliderMainItem key={index} className="border border-muted flex items-center justify-center rounded-md">
                                    <img src={image.url} alt={String(image.id)} />
                                </SliderMainItem>
                            ))}
                        </CarouselMainContainer>
                        <Button variant="outline" className="absolute right-2 top-2"><HeartIcon/></Button>
                    </div>
                    <CarouselThumbsContainer className="w-full flex-1 basis-1/12">
                        {productDetail?.images.map((image, index) => (
                            <SliderThumbItem key={index} index={index} className="rounded-md bg-transparent flex-1">
                                <img src={image.url} alt={String(image.id)} className="border border-muted flex items-center justify-center h-full w-full rounded-md cursor-pointer bg-background" />
                            </SliderThumbItem>
                        ))}
                    </CarouselThumbsContainer>
                </Carousel>

                <div className="grid">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black tracking-tighter">{productDetail?.title}</h2>
                        <div className="flex h-6 items-center space-x-2 text-base">
                            <div className="space-x-1 font-semibold">
                                <span>Thương hiệu:</span><span
                                className="text-green-600">{productDetail?.brand_name}</span>
                            </div>
                            <Separator orientation="vertical"/>
                            <div className="flex gap-1 items-center">
                                <StarIcon className="h-4 w-4 text-amber-500"/><span className="font-semibold">4.5</span>
                            </div>
                            <Separator orientation="vertical"/>
                            <div className="space-x-1 font-semibold">
                                <span>Tình trạng:</span><span
                                className="text-green-600">Còn hàng</span>
                            </div>
                            <Separator orientation="vertical"/>
                            <div className="space-x-1 font-semibold">
                                <span>Danh mục:</span><span
                                className="text-green-600">{productDetail?.category_name}</span>
                            </div>
                        </div>
                        <div className="space-x-1.5 flex items-center">
                            {productDetail?.discount_percent && <Badge
                                className="bg-green-600 text-base rounded-md">{productDetail?.discount_percent}</Badge>}
                            <div className="space-x-1.5">
                                <span className="text-2xl text-green-600 font-bold tracking-[-0.15rem]">
                                    {productDetail?.discount_price ? formatCurrency(productDetail?.discount_price) : formatCurrency(productDetail?.regular_price)}
                                </span>
                                {productDetail?.discount_price && productDetail?.discount_percent && <span
                                    className="text-base font-medium text-neutral-400 tracking-[-0.1rem] line-through">{formatCurrency(productDetail?.regular_price)}</span>}
                            </div>
                        </div>
                        <div
                            className="w-full flex text-neutral-400 font-medium">{productDetail?.short_description}</div>
                        <div className='grid grid-cols-5 space-x-4'>
                            <QuantityChanger value={buyQuantity} onMinus={handleMinusBuyQuantity}
                                             onPlus={handlePlusBuyQuantity} onChange={handleChangeBuyQuantity}/>
                            <Button type="button" onClick={onSubmitAddItemToCartForm}
                                    className="order-4 py-6 col-span-4 bg-green-600 hover:bg-green-500 tracking-tighter font-semibold text-lg">
                                <ShoppingBagIcon/> Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <Separator orientation="horizontal"/>
                        <div className="grid grid-cols-8">
                            <span className="font-semibold">Nhãn thẻ:</span>
                            <div className="space-x-2 col-span-7">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-10 md:grid-cols-2 ">
                <div>
                    <Tabs defaultValue="detail-description">
                        <TabsList className="grid grid-cols-2 bg-transparent w-[400px]">
                            <TabsTrigger value="detail-description"
                                         className="bg-transparent flex gap-1 text-base select-none outline-none rounded-none shadow-none data-[state=active]:shadow-none border-b-2 border-x-0 border-t-0 focus:outline-none data-[state=active]:border-b-green-600 hover:border-b-transparent data-[state=active]:font-semibold">
                                <QueueListIcon className="w-5 h-5"/> Mô tả chi thiết
                            </TabsTrigger>
                            <TabsTrigger value="comment"
                                         className="bg-transparent flex gap-1 text-base select-none outline-none rounded-none shadow-none data-[state=active]:shadow-none border-b-2 border-x-0 border-t-0 focus:outline-none data-[state=active]:border-b-green-600 hover:border-b-transparent data-[state=active]:font-semibold">
                                <ChatBubbleLeftRightIcon className="w-5 h-5"/> Bình luận
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="detail-description" className="pt-4 space-y-10">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </TabsContent>
                        <TabsContent value="comment" className="pt-4 space-y-10">
                            <div className='grid space-y-4'>
                                <Form {...addCommentForm}>
                                    <form onSubmit={addCommentForm.handleSubmit(onSubmitAddCommentForm)}>
                                        <FormField
                                            control={addCommentForm.control}
                                            name="content"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel
                                                        className="text-lg font-medium text-black tracking-tighter">Để
                                                        lại bình luận về sản phẩm</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} rows={8}/>
                                                    </FormControl>
                                                    <FormMessage className="text-xs text-red-600"/>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="mt-4 bg-green-600 hover:bg-green-500 text-base font-semibold ">Gửi
                                            bình luận</Button>
                                    </form>
                                </Form>
                            </div>
                            <div className="w-full">
                                {
                                    commentsOfProduct?.items && <ul className="space-y-6">
                                        {
                                            commentsOfProduct.items.length > 0 ? commentsOfProduct.items.map((item, index) => (
                                                <li key={index}>
                                                    <Comment
                                                        isReplied={true}
                                                        id={item.id}
                                                        content={item.content}
                                                        commentatorName={item.commentator_name}
                                                        createdAt={item.created_at}
                                                        isDeleted={item.is_deleted}
                                                    />
                                                    {
                                                        item.child_items &&
                                                        <ul className="pl-4 mt-5 space-y-5 md:pl-10">
                                                            {
                                                                item.child_items.map((childItem, index) => (
                                                                    <li key={index}>
                                                                        <Comment
                                                                            id={childItem.id}
                                                                            isReplied={false}
                                                                            content={childItem.content}
                                                                            commentatorName={childItem.commentator_name}
                                                                            createdAt={childItem.created_at}
                                                                            isDeleted={childItem.is_deleted}
                                                                        />
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    }
                                                </li>
                                            )) : <div className="grid border border-input border-dashed rounded-md place-content-center p-6">
                                                <ChatBubbleLeftEllipsisIcon className="h-40 w-40 text-green-600 stroke-[0.5] mx-auto"/>
                                                Chưa có bình luận nào về sản phẩm này hãy trở thành người đầu tiên
                                            </div>
                                        }
                                    </ul>
                                }

                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-medium tracking-tighter">Đánh giá từ khách hàng đã mua</h2>
                    <div
                        className="divide-y divide-neutral-100 dark:divide-neutral-800 w-full flex flex-col rounded-xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 px-8 pb-8">
                        <Review/>
                        <Review/>
                        <Review/>
                        <Review/>
                        <div className="pt-8">
                            <Button variant="outline" className='text-base p-6 rounded-full hover:border-neutral-400'>Xem
                                thêm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail