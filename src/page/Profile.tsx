import {Button} from "@/components/ui/button.tsx";
import {ArchiveBoxIcon, UserIcon, MapPinIcon, EyeIcon, ArrowRightStartOnRectangleIcon, PencilSquareIcon, LockClosedIcon} from "@heroicons/react/24/outline"

const Profile = () => {
    return (
        <div className="container mx-auto grid grid-cols-8 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 my-8">
            <aside className="col-span-1">
                <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                    {/*inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start*/}
                    <Button variant="ghost" className="!place-content-start"><UserIcon/>Thông tin tài khoản</Button>
                    <Button variant="ghost" className="!place-content-start"><ArchiveBoxIcon/>Lịch sử đơn hàng</Button>
                    <Button variant="ghost" className="!place-content-start"><MapPinIcon/>Địa chỉ</Button>
                    <Button variant="ghost" className="!place-content-start"><EyeIcon/>Sản phẩm đã xem</Button>
                    <Button variant="ghost" className="!place-content-start"><ArrowRightStartOnRectangleIcon/>Đăng xuất</Button>
                </nav>
            </aside>
            <div className="col-span-7">
                <section className="bg-white antialiased dark:bg-gray-900">
                    <div>
                        <div>
                            <div className="mb-4 grid gap-4 sm:grid-cols-4 sm:gap-8 lg:gap-16">
                                <img
                                    className="rounded-lg w-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                                    alt="Helene avatar"
                                />
                                <div className="grid grid-cols-2 col-span-3">
                                    <div className="space-y-4">
                                        <dl className="">
                                            <dt className="font-semibold text-gray-900 dark:text-white">
                                                Họ và tên
                                            </dt>
                                            <dd className="text-gray-500 dark:text-gray-400">
                                                Trịnh Trần Sỹ Đông
                                            </dd>
                                        </dl>
                                        <dl className="">
                                            <dt className="font-semibold text-gray-900 dark:text-white">
                                                Email
                                            </dt>
                                            <dd className="text-gray-500 dark:text-gray-400">
                                                helene@example.com
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt className="font-semibold text-gray-900 dark:text-white">
                                                Địa chỉ
                                            </dt>
                                            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">2
                                                Miles
                                                Drive, NJ 071, New York, United States of America
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className="space-y-4">
                                        <dl>
                                            <dt className="font-semibold text-gray-900 dark:text-white">
                                                Số điện thoại
                                            </dt>
                                            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                0334761730
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt className="font-semibold text-gray-900 dark:text-white">
                                                Giới tính
                                            </dt>
                                            <dd className="text-gray-500 dark:text-gray-400">
                                                Nam
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt className="font-semibold text-gray-900 dark:text-white">
                                                Ngày sinh
                                            </dt>
                                            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                17/01/2003
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className="gap-2 flex py-4">
                                        <Button className="bg-green-600 hover:bg-green-500"><PencilSquareIcon/>Chỉnh sửa
                                            thông
                                            tin</Button>
                                        <Button className="bg-green-600 hover:bg-green-500"><LockClosedIcon/>Đổi mật
                                            khẩu</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Profile