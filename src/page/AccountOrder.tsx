import {Separator} from "@/components/ui/separator.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

const AccountOrderPassword = () => {
    const dispatch = useAppDispatch()
    const {account} = useAppSelector(state => state.account)

    return (
        <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-green-600">Đơn hàng của tôi</h3>
                    <p className="text-sm text-muted-foreground">
                        Theo đơn hàng để nắm bắt thời gian giao hàng
                    </p>
                </div>
                <Separator orientation="horizontal" className="w-full"/>
                <Card className="space-y-6">
                    <CardContent className="flex flex-wrap items-center gap-y-4 border-gray-200 pt-6 relative">
                        <dl className="w-1/2 space-y-1">
                            <dt className="text-base font-medium text-gray-500 ">
                                Mã đơn hàng:
                            </dt>
                            <dd className="text-base font-semibold text-gray-900">
                                <span>FWB12546798</span>
                            </dd>
                        </dl>
                        <dl className="w-1/2 space-y-1">
                            <dt className="text-base font-medium text-gray-500 ">
                                Ngày đặt hàng:
                            </dt>
                            <dd className="text-base font-semibold text-gray-900 ">
                                11.12.2023
                            </dd>
                        </dl>
                        <dl className="w-1/2 space-y-1">
                            <dt className="text-base font-medium text-gray-500 ">
                                Tổng tiền:
                            </dt>
                            <dd className="text-base font-semibold text-gray-900 ">
                                $499
                            </dd>
                        </dl>
                        <dl className="w-1/2 space-y-1">
                            <dt className="text-base font-medium text-gray-500 ">
                                Trạng thái:
                            </dt>
                            <dd className="me-2 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                In transit
                            </dd>
                        </dl>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"
                                        className="absolute top-4 right-4"><EllipsisHorizontalIcon/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40">
                                <DropdownMenuItem>Hủy đơn hàng</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AccountOrderPassword;