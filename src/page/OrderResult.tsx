import {useSearchParams} from "react-router-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/outline"

const OrderResult = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const status = searchParams.get("status") as 'success' | 'failed';
    return (
        <Card className="container mx-auto my-44 w-[400px]">
            <CardHeader>
                <CardTitle className="flex flex-col items-center">
                    {
                        status === 'success' ?
                            <>
                                <CheckCircleIcon className="text-green-600 h-28 w-28"/>
                                <h2 className="font-bold">Đặt hàng thành công</h2>
                            </> :
                            <>
                                <XCircleIcon className="text-red-600 h-28 w-28"/>
                                <h2 className="font-bold">Thanh toán thất bại</h2>
                            </>
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                {status === 'success'  && <> Quý khách đã đặt đơn hàng mã <span className="font-bold text-green-600">{id}</span> thành công. Đơn hàng của quý khách sẽ được xử lý trong vòng 24 giờ trong ngày làm việc. Chúng tôi sẽ thông báo cho bạn qua email sau khi đơn hàng của bạn đã được chuyển đi. </>}
                {status === 'failed'  && <> Quý khách đã đặt đơn hàng mã <span className="font-bold text-red-600">{id}</span> thất bại do quá trình thanh toán đơn hàng không thành công</>}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Xem lịch sử đơn hàng</Button>
                <Button>Tiếp tục mua sắm</Button>
            </CardFooter>
        </Card>
    )
}

export default OrderResult