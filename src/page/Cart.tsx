// import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
// import {formatCurrency} from "@/util/decoration.util.ts";
// import {TrashIcon} from "@heroicons/react/24/outline"
// import {Button} from "@/components/ui/button.tsx";
// import QuantityChanger from "@/components/common/QuantityChanger.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
// import {Input} from "@/components/ui/input.tsx";
// import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
// import CouponTicket from "@/components/common/CouponTicket.tsx";
import CartItem from "@/components/cart/CartItem.tsx";
import {Link} from "react-router-dom";
import {useAppSelector} from "@/redux/hook.ts";
import {Button} from "@/components/ui/button.tsx";
import {formatCurrency} from "@/util/decoration.util.ts";
import {Separator} from "@/components/ui/separator.tsx";
// import QuantityChanger from "@/components/common/QuantityChanger.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import {HeartIcon, TrashIcon} from "@heroicons/react/24/outline";

const Cart = () => {
    const {cart} = useAppSelector(state => state.cart);
    const cartSummary = cart!.summary!
    return (
        // <div className="container mx-auto mt-6 space-y-6">
        //     <div className="space-y-3">
        //         <Breadcrumb>
        //             <BreadcrumbList className="text-base">
        //                 <BreadcrumbItem>
        //                     <BreadcrumbLink>
        //                         <Link to="/" className="text-neutral-900 flex hover:text-neutral-500 font-normal">Trang
        //                             chủ</Link>
        //                     </BreadcrumbLink>
        //                 </BreadcrumbItem>
        //                 <BreadcrumbSeparator>/</BreadcrumbSeparator>
        //                 <BreadcrumbItem>
        //                     <BreadcrumbPage className="text-green-600 font-medium">Giỏ hàng</BreadcrumbPage>
        //                 </BreadcrumbItem>
        //             </BreadcrumbList>
        //         </Breadcrumb>
        //         <h2 className="uppercase font-extrabold text-3xl tracking-tighter text-green-600">Giỏ hàng</h2>
        //     </div>
        //     <div className="grid grid-cols-3 gap-6">
        //         <div className="col-span-2 space-y-6">
        //             <div className="rounded-lg border border-neutral-400">
        //                 <Table>
        //                     <TableHeader className="font-semibold">
        //                         <TableRow>
        //                             <TableHead className='w-[55%]'>Sản phẩm</TableHead>
        //                             <TableHead>Đơn giá</TableHead>
        //                             <TableHead>Số lượng</TableHead>
        //                             <TableHead>Thành tiền</TableHead>
        //                             <TableHead>Thao tác</TableHead>
        //                         </TableRow>
        //                     </TableHeader>
        //                     <TableBody>
        //                         <TableRow>
        //                             <TableCell>
        //                                 <div className="grid grid-cols-4 gap-3">
        //                                     <div className="col-span-1">
        //                                         <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden">
        //                                             <img
        //                                                 src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940"
        //                                                 className="object-cover w-full h-full"/>
        //                                         </div>
        //                                     </div>
        //                                     <div className="col-span-3 space-y-2">
        //                                         <div><span
        //                                             className="text-base font-medium mt-1 block">Name Of Product</span>
        //                                         </div>
        //                                         <div
        //                                             className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
        //                                         <div className="block text-sm text-neutral-500 dark:text-neutral-400">
        //                                             2 beds · 2 baths
        //                                         </div>
        //                                         <div className="flex items-center text-sm">
        //
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <span className="text-base font-medium">{formatCurrency(100000)}</span>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <QuantityChanger/>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <span className="text-base font-medium">{formatCurrency(100000)}</span>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <Button variant="ghost"
        //                                         className="bg-transparent hover:bg-transparent gap-0.5 hover:border-transparent p-0">
        //                                     <TrashIcon/> Xóa
        //                                 </Button>
        //                             </TableCell>
        //                         </TableRow>
        //                         <TableRow>
        //                             <TableCell>
        //                                 <div className="grid grid-cols-4 gap-3">
        //                                     <div className="col-span-1">
        //                                         <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden">
        //                                             <img
        //                                                 src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940"
        //                                                 className="object-cover w-full h-full"/>
        //                                         </div>
        //                                     </div>
        //                                     <div className="col-span-3 space-y-2">
        //                                         <div><span
        //                                             className="text-base font-medium mt-1 block">Name Of Product</span>
        //                                         </div>
        //                                         <div
        //                                             className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
        //                                         <div className="block text-sm text-neutral-500 dark:text-neutral-400">
        //                                             2 beds · 2 baths
        //                                         </div>
        //                                         <div className="flex items-center text-sm">
        //
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <span className="text-base font-medium">{formatCurrency(100000)}</span>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <QuantityChanger/>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <span className="text-base font-medium">{formatCurrency(100000)}</span>
        //                             </TableCell>
        //                             <TableCell>
        //                                 <Button variant="ghost"
        //                                         className="bg-transparent hover:bg-transparent gap-0.5 hover:border-transparent p-0">
        //                                     <TrashIcon/> Xóa
        //                                 </Button>
        //                             </TableCell>
        //                         </TableRow>
        //                     </TableBody>
        //                 </Table>
        //             </div>
        //         </div>
        //         <div className="col-span-1 space-y-6">
        //             <div className="rounded-lg border border-neutral-400 p-4 space-y-4">
        //                 <div className="grid space-y-4">
        //                     <h3 className="font-semibold">Mã giảm giá</h3>
        //                     <ScrollArea className="whitespace-nowrap rounded-md">
        //                         <div className="space-x-4 flex">
        //                             <CouponTicket/>
        //                             <CouponTicket/>
        //                         </div>
        //                         <ScrollBar orientation="horizontal" />
        //                     </ScrollArea>
        //                 </div>
        //                 <div className="flex gap-2">
        //                     <Input placeholder="Nhập mã giả giảm"/>
        //                     <Button className="bg-green-600 hover:bg-green-500">Áp dụng</Button>
        //                 </div>
        //             </div>
        //             <div className="rounded-lg border border-neutral-400 p-4 space-y-4">
        //                 <div className="flex justify-between items-baseline">
        //                     <span>Tạm tính</span>
        //                     <span>{formatCurrency(0)}</span>
        //                 </div>
        //                 <div className="flex justify-between items-baseline">
        //                     <span>Giảm giá</span>
        //                     <span>{formatCurrency(0)}</span>
        //                 </div>
        //                 <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        //                 <div className="flex justify-between items-baseline">
        //                     <span>Tổng tiền</span>
        //                     <span>{formatCurrency(0)}</span>
        //                 </div>
        //             </div>
        //             <div className="flex gap-2">
        //                 <Button className="flex-1">Tiếp tục mua sắm</Button>
        //                 <Button className='flex-1'>Tiến hành thanh toán</Button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="container mx-auto px-4 py-8">
            <div className="space-y-3">
                <Breadcrumb>
                    <BreadcrumbList className="text-base">
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to="/" className="text-neutral-900 flex hover:text-neutral-500 font-normal">Trang
                                    chủ</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-green-600 font-medium">Giỏ hàng</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h2 className="uppercase font-extrabold text-3xl tracking-tighter text-green-600">Giỏ hàng</h2>
                <p className="font-normal text-lg">Hiện đang có <span className="text-green-600 font-bold">{cartSummary?.total_count}</span> sản phẩm trong giỏ hàng</p>
            </div>
            <div className="mt-6 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-5xl">
                    <div className="space-y-6">
                        {
                            cartSummary?.items.map((item, index) => (
                                <CartItem key={index} item={item}/>
                            ))
                        }
                    </div>
                    <div className="hidden xl:mt-8 xl:block">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                        <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                            <div
                                className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                         alt="imac image"/>
                                    <img className="mx-auto hidden h-44 w-44 dark:block"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                         alt="imac image"/>
                                </a>
                                <div>
                                    <a href="#"
                                       className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac
                                        27”</a>
                                    <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This
                                        generation has some improvements, including a longer continuous battery
                                        life.</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        <span className="line-through"> $399,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                </div>
                                <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-1" type="button"
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <svg className="h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                        </svg>
                                    </button>
                                    <div id="favourites-tooltip-1" role="tooltip"
                                         className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        Add to favourites
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                    <button type="button"
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            <div
                                className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                                         alt="imac image"/>
                                    <img className="mx-auto hidden h-44 w-44 dark:block"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                                         alt="imac image"/>
                                </a>
                                <div>
                                    <a href="#"
                                       className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Playstation
                                        5</a>
                                    <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This
                                        generation has some improvements, including a longer continuous battery
                                        life.</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        <span className="line-through"> $799,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$499</p>
                                </div>
                                <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-2" type="button"
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <svg className="h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                        </svg>
                                    </button>
                                    <div id="favourites-tooltip-2" role="tooltip"
                                         className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        Add to favourites
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                    <button type="button"
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            <div
                                className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                                         alt="imac image"/>
                                    <img className="mx-auto hidden h-44 w-44 dark:block"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                                         alt="imac image"/>
                                </a>
                                <div>
                                    <a href="#"
                                       className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple
                                        Watch Series 8</a>
                                    <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This
                                        generation has some improvements, including a longer continuous battery
                                        life.</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        <span className="line-through"> $1799,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$1199</p>
                                </div>
                                <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-3" type="button"
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <svg className="h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                        </svg>
                                    </button>
                                    <div id="favourites-tooltip-3" role="tooltip"
                                         className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        Add to favourites
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>

                                    <button type="button"
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Thông tin đơn hàng</p>
                        <Separator orientation="horizontal"/>
                        <dl className="flex justify-between">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng tiền</dt>
                            <dd className="text-base font-bold text-green-600 dark:text-white">{formatCurrency(cartSummary?.total_price)}</dd>
                        </dl>
                        <Separator orientation="horizontal"/>
                        <p>Phí vận chuyển sẽ được tính ở trang đặt hàng. Khách hàng cũng có thể áp dụng mã khuyến mãi ở trang đặt hàng.</p>
                        <div className="grid gap-3">
                            <Button asChild className='bg-green-600 hover:bg-green-500 hover:text-white text-lg py-6 tracking-tighter font-semibold'>
                                <Link to="/place-order">Tiến hành đặt hàng</Link>
                            </Button>
                            <div className="flex text-base items-center justify-center gap-1">
                                <span className="font-normal text-gray-500 dark:text-gray-400">Hoặc</span>
                                <Link to="#" title="" className="inline-flex items-center font-semibold text-black underline hover:underline hover:text-green-600">
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart