import {Button} from "@/components/ui/button.tsx";
import {NavLink, Outlet} from "react-router-dom";
import {
    ArchiveBoxIcon,
    ArrowLeftStartOnRectangleIcon,
    IdentificationIcon,
    LockClosedIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";

export const AccountManagementLayout = () => {
    return (
        <div className="container mx-auto">
            <div className="py-6">
                <section>
                    <div className="space-y-6">
                        <div className="space-y-0.5">
                            <h2 className="text-2xl font-bold tracking-tight text-green-600">Quản ký tài khoản cá nhân</h2>
                            <p className="text-muted-foreground">
                                Thiết lập thông tin tài khoản, số địa chỉ và nhiều hơn thế nữa.
                            </p>
                        </div>
                        <div
                            data-orientation="horizontal"
                            role="none"
                            className="shrink-0 bg-border h-[1px] w-full my-6"
                        />
                        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                            <aside className="lg:w-1/5">
                                <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                                    <Button variant="ghost" className="whitespace-nowrap justify-start p-0 text-neutral-600">
                                        <NavLink to="/account/info" className={({isActive}) => isActive ? "text-white hover:text-white inline-flex items-center gap-2 bg-green-600 py-2.5 px-4 w-full rounded-md" : "text-neutral-600 inline-flex items-center gap-2 py-2.5 px-4 w-full hover:text-neutral-600"}><IdentificationIcon/> Thông tin tài khoản</NavLink>
                                    </Button>
                                    <Button variant="ghost" className="whitespace-nowrap justify-start p-0 text-neutral-600">
                                        <NavLink to="/account/order" className={({isActive}) => isActive ? "text-white hover:text-white inline-flex items-center gap-2 bg-green-600 py-2.5 px-4 w-full rounded-md" : "text-neutral-600 inline-flex items-center gap-2 py-2.5 px-4 w-full hover:text-neutral-600"}><ArchiveBoxIcon/> Đơn hàng của tôi</NavLink>
                                    </Button>
                                    <Button variant="ghost" className="whitespace-nowrap justify-start p-0 text-neutral-600">
                                        <NavLink to="/account/address" className={({isActive}) => isActive ? "text-white hover:text-white inline-flex items-center gap-2 bg-green-600 py-2.5 px-4 w-full rounded-md" : "text-neutral-600 inline-flex items-center gap-2 py-2.5 px-4 w-full hover:text-neutral-600"}><MapPinIcon/> Số địa chỉ</NavLink>
                                    </Button>
                                    <Button variant="ghost" className="whitespace-nowrap justify-start p-0 text-neutral-600">
                                        <NavLink to="/account/change-password" className={({isActive}) => isActive ? "text-white hover:text-white inline-flex items-center gap-2 bg-green-600 py-2.5 px-4 w-full rounded-md" : "text-neutral-600 inline-flex items-center gap-2 py-2.5 px-4 w-full hover:text-neutral-600"}><LockClosedIcon/> Đổi mật khẩu</NavLink>
                                    </Button>
                                    <Button variant="ghost" className="whitespace-nowrap justify-start p-0 text-neutral-600">
                                        <NavLink to="/logout" className={({isActive}) => isActive ? "text-white hover:text-white inline-flex items-center gap-2 bg-green-600 py-2.5 px-4 w-full rounded-md" : "text-neutral-600 inline-flex items-center gap-2 py-2.5 px-4 w-full hover:text-neutral-600"}><ArrowLeftStartOnRectangleIcon/> Đăng xuất</NavLink>
                                    </Button>
                                </nav>
                            </aside>
                            <Outlet/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}