import {Link} from "react-router-dom";
import {formatCurrency} from "@/util/decoration.util.ts";
import {GotCartSummaryResponse} from "@/type/response/cart.response.ts";

interface CartItemProps {
    item: GotCartSummaryResponse['items'][number]
}

const PlaceOrderItem = ({item}: CartItemProps) => {
    return (
        <div>
            <div className="flex items-center justify-between gap-6">
                <Link to={`/products/${item.product_slug}`} className="shrink-0">
                    <img className="h-14 w-14" src={item.product_thumbnail}/>
                </Link>
                <div className="flex-1 grid grid-cols-3 gap-1">
                    <Link className="text-black text-base font-bold hover:text-green-600 col-span-2" to={`/products/${item.product_slug}`}>{item.product_title}</Link>
                    <div className="text-end">
                        <p className="text-base font-bold text-green-600 dark:text-white">{formatCurrency(item.subtotal)}</p>
                    </div>
                    <div className="col-span-3 grid grid-cols-4">
                        <span className="text-gray-900 dark:text-white">{formatCurrency(item.price)}</span>
                        <span className="col-span-3 font-medium">x{item.quantity}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderItem;