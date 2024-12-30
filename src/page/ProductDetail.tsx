import {StarIcon} from "@heroicons/react/24/solid";
import {formatCurrency} from "@/util/decoration.util.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {ChatBubbleLeftRightIcon, QueueListIcon} from "@heroicons/react/16/solid";
import {ShoppingBagIcon, HeartIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Textarea} from "@/components/ui/textarea.tsx";
import Comment from "@/components/common/Comment.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import Review from "@/components/common/Review.tsx";
import {useParams} from "react-router-dom";
import {SendCommentRequest} from "@/type/request/send.request.ts";
import {sendCommentSchema} from "@/schema/send.schema.ts";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {getProductDetail} from "@/redux/slice/product.slice.ts";
import QuantityChanger from "@/components/common/QuantityChanger.tsx";
import {Separator} from "@/components/ui/separator.tsx";
// import ImageShowCase from "@/components/common/ImageShowCase.tsx";
import {AddItemToCartRequest} from "@/type/request/cart.request.ts";
import {addItemToCart} from "@/redux/slice/cart.slice.ts";

const ProductDetail = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product)
    const productDetail = product.detail
    const [buyQuantity, setBuyQuantity] = useState<number>(1);

    useEffect(() => {
        if (id) {
            const promise = dispatch(getProductDetail(Number(id)))
            return () => promise.abort()
        }
    }, [id])

    const handleMinusBuyQuantity = () => {
        if (buyQuantity > 1) setBuyQuantity(buyQuantity - 1);
    };

    const handlePlusBuyQuantity = () => {
        setBuyQuantity(buyQuantity + 1);
    };

    const handleChangeBuyQuantity = (newBuyQuantity: number) => {
        setBuyQuantity(newBuyQuantity);
    };

    const sendCommentForm = useForm<SendCommentRequest>({
        resolver: yupResolver(sendCommentSchema)
    })

    const onSubmitAddItemToCartForm = () => {
        if (productDetail!.id && buyQuantity > 0) {
            const body: AddItemToCartRequest = {productId: productDetail!.id, quantity: buyQuantity};
            const promise = dispatch(addItemToCart(body));
            return () => promise.abort();
        }
    }

    const onSubmitSendCommentForm = (body: SendCommentRequest) => {
        console.log(body)
    }

    return (
        <div className="container mx-auto py-8 space-y-12">
            <div className="grid gap-10 md:grid-cols-2">
                {/*<div className="grid gap-4">*/}
                {/*    <ImageShowCase imageUrls={productDetail?.image_urls}/>*/}
                {/*</div>*/}
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
                            {productDetail?.discount_percent_event && <Badge
                                className="bg-green-600 text-base rounded-md">{productDetail?.discount_percent_event}</Badge>}
                            <div className="space-x-1.5">
                                <span className="text-2xl text-green-600 font-bold tracking-[-0.15rem]">
                                    {productDetail?.discount_price ? formatCurrency(productDetail?.discount_price) : formatCurrency(productDetail?.regular_price)}
                                </span>
                                {productDetail?.discount_price && productDetail?.discount_percent_event && <span
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
                        <div className='grid grid-cols-10 space-x-4'>
                            <Button
                                className="py-6 col-span-9 bg-amber-500 hover:bg-amber-400 tracking-tighter font-semibold text-lg">
                                <ShoppingBagIcon/> Mua ngay
                            </Button>
                            <Button variant="outline" className="py-6"><HeartIcon/></Button>
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
            <div className="grid gap-10 md:grid-cols-2">
                <div>
                    <Tabs defaultValue="detail-description">
                        <TabsList className="grid grid-cols-2 bg-transparent w-[400px]">
                            <TabsTrigger value="detail-description"
                                         className="bg-transparent flex gap-1 text-base select-none outline-none rounded-none shadow-none data-[state=active]:shadow-none border-b-2 border-x-0 border-t-0 focus:outline-none data-[state=active]:border-b-green-600 hover:border-b-transparent data-[state=active]:font-semibold">
                                <QueueListIcon className="w-5 h-5"/> Mô tả chi thiết
                            </TabsTrigger>
                            <TabsTrigger value="comment"
                                         className="bg-transparent flex gap-1 text-base select-none outline-none rounded-none shadow-none data-[state=active]:shadow-none border-b-2 border-x-0 border-t-0 focus:outline-none data-[state=active]:border-b-green-600 hover:border-b-transparent data-[state=active]:font-semibold">
                                <ChatBubbleLeftRightIcon className="w-5 h-5"/> Bình luận (100)
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
                                <Form {...sendCommentForm}>
                                    <form onSubmit={sendCommentForm.handleSubmit(onSubmitSendCommentForm)}>
                                        <FormField
                                            control={sendCommentForm.control}
                                            name="message"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel
                                                        className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Để
                                                        lại bình luận của bạn</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} className="rounded-xl !mt-4 resize-none"
                                                                  rows={8}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="mt-4 space-x-3">
                                            <Button
                                                className="rounded-full bg-green-600 hover:bg-green-500 text-base font-medium p-6 border-none">Gửi
                                                hình luận</Button>
                                            <Button variant="outline" type="reset"
                                                    className="rounded-full text-base font-medium p-6 hover:border-neutral-400">Hoàn
                                                tác</Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                            <div className="w-full">
                                <ul className="space-y-6">
                                    <li>
                                        <Comment/>
                                        <ul className="pl-4 mt-5 space-y-5 md:pl-11">
                                            <li>
                                                <Comment isNested/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Comment/>
                                        <ul className="pl-4 mt-5 space-y-5 md:pl-11">
                                            <li>
                                                <Comment isNested/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Comment/>
                                        <ul className="pl-4 mt-5 space-y-5 md:pl-11">
                                            <li>
                                                <Comment isNested/>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Khách hàng đánh giá (250)</h2>
                    <div className="flex items-center gap-5">
                        <div className="text-9xl font-extrabold tracking-[-1.2rem]">
                            4.5<span className="text-3xl ml-3 font-light tracking-tighter">/ 5</span>
                        </div>
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 font-medium text-amber-500">
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                </div>
                                <Progress value={50} className='h-3' indicatorClassName="bg-green-600"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 font-medium text-amber-500">
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                </div>
                                <Progress value={60} className='h-3' indicatorClassName="bg-green-600"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 font-medium text-amber-500">
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                </div>
                                <Progress value={40} className='h-3' indicatorClassName="bg-green-600"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 font-medium text-amber-500">
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                </div>
                                <Progress value={20} className='h-3' indicatorClassName="bg-green-600"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 font-medium text-amber-500">
                                    <StarIcon className="w-4 h-4"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                    <StarIcon className="w-4 h-4 text-zinc-200"/>
                                </div>
                                <Progress value={30} className='h-3' indicatorClassName="bg-green-600"/>
                            </div>
                        </div>
                    </div>
                    <div
                        className="divide-y divide-neutral-100 !mt-10 dark:divide-neutral-800 w-full flex flex-col rounded-xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 px-8 pb-8">
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