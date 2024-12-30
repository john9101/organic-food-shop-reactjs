import {Popover, Transition} from "@headlessui/react";
import { ShoppingBagIcon} from "@heroicons/react/24/outline"
import {Fragment, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {getCartSummary} from "@/redux/slice/cart.slice.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {formatCurrency} from "@/util/decoration.util.ts";
import {Separator} from "@/components/ui/separator.tsx";
const CartDropDown = () => {
    const dispatch = useAppDispatch();
    const {cart} = useAppSelector(state => state.cart)
    const cartSummary = cart.summary

    useEffect(() => {
        if (!cartSummary){
            const promise = dispatch(getCartSummary())
            return () => promise.abort()
        }
    },[dispatch, cartSummary])

    return (
        <>
            <Popover className="relative flex">
                {({close}) => (
                    <>
                        <Popover.Button className="rounded-full right-0 p-0 flex items-center justify-center focus:outline-none relative">
                            <span className="px-2 h-5 place-content-center bg-green-600 text-white absolute -top-2 left-4 rounded-full text-xs">{cartSummary?.total_count}</span>
                            <ShoppingBagIcon className="w-8 h-8 text-black"/>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute max-w-80 pt-2.5 top-full right-0 z-10 w-screen">
                                <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="grid gap-4 p-6">
                                        {cartSummary?.items.map((item, index) => (
                                            <>
                                                <div key={index} className="grid grid-cols-4 gap-4">
                                                    <img src={item.product_thumbnail} className="h-16 w-16"/>
                                                    <div className="grid col-span-3 text-base">
                                                        <Link to="" className="font-semibold text-black hover:text-green-600 tracking-tighter">{item.product_title}</Link>
                                                        <div className="grid grid-cols-2 col-span-4">
                                                            <span>x{item.quantity}</span>
                                                            <span className="text-right place-content-center">{formatCurrency(item.price)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Separator orientation="horizontal"/>
                                            </>
                                        ))}
                                        <Button asChild className="text-lg py-6 hover:text-white hover:bg-green-600 font-medium tracking-tighter">
                                            <Link to="/cart" onClick={() => close()}>Xem giỏ hàng</Link>
                                        </Button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </>
    )
}

export default CartDropDown