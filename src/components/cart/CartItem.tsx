import {Button} from "@/components/ui/button.tsx";
import {TrashIcon, HeartIcon} from "@heroicons/react/24/outline"
import QuantityChanger from "@/components/common/QuantityChanger.tsx";
import {GotCartSummaryResponse} from "@/type/response/cart.response.ts";
import {formatCurrency} from "@/util/decoration.util.ts";
import {Link} from "react-router-dom";
import {useAppDispatch} from "@/redux/hook.ts";
import {changeQuantityOfItemInCart, removeItemFromCart} from "@/redux/slice/cart.slice.ts";

interface CartItemProps {
    item: GotCartSummaryResponse['items'][number]
}

const CartItem = ({item}: CartItemProps) => {
    const dispatch = useAppDispatch();

    const handleMinusBuyQuantity = () => {
        if (item.id && item.quantity > 0){
            const newBuyQuantity = item.quantity - 1;
            const promise = dispatch(changeQuantityOfItemInCart({body: {quantity: newBuyQuantity}, itemId: item.id}))
            return () => promise.abort();
        }
    };

    const handlePlusBuyQuantity = () => {
        if (item.id){
            const newBuyQuantity = item.quantity + 1;
            const promise = dispatch(changeQuantityOfItemInCart({body: {quantity: newBuyQuantity}, itemId: item.id}))
            return () => promise.abort();
        }
    };


    const handleChangeBuyQuantity = (newBuyQuantity: number) => {
        if (item.id && newBuyQuantity > 0){
            const promise = dispatch(changeQuantityOfItemInCart({body: {quantity: newBuyQuantity}, itemId: item.id}))
            return () => promise.abort();
        }
    };

    const handleRemove = () => {
        if (item.id){
            const promise = dispatch(removeItemFromCart(item.id))
            return () => promise.abort()
        }
    }

    return (
        <div
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <Link to={`/products/${item.product_slug}`} className="shrink-0 md:order-1">
                    <img className="h-20 w-20" src={item.product_thumbnail}/>
                </Link>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="text-start md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(item.price)}</p>
                    </div>
                    <QuantityChanger onPlus={handlePlusBuyQuantity} onMinus={handleMinusBuyQuantity} value={item.quantity} onChange={handleChangeBuyQuantity} />
                    <div className="text-end md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(item.subtotal)}</p>
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-2 md:order-2">
                    <Link to={`/products/${item.product_slug}`} className="text-base font-medium text-gray-900 hover:text-green-600">{item.product_title}</Link>
                    <div className="flex items-center gap-4">
                        <Button type="button"
                                className="inline-flex items-center text-sm font-medium bg-transparent p-0 text-gray-500 hover:text-gray-900 hover:bg-transparent hover:underline dark:text-gray-400 dark:hover:text-white">
                            <HeartIcon/> Yêu thích
                        </Button>
                        <Button type="button"
                                onClick={() => handleRemove()}
                                className="inline-flex items-center p-0 text-sm font-medium bg-transparent text-red-600 hover:underline hover:bg-transparent dark:text-red-500">
                            <TrashIcon/> Xóa
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;