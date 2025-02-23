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