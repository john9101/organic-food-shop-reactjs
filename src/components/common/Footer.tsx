import Logo from "@/components/common/Logo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PhoneIcon, AtSymbolIcon, ClockIcon, MapPinIcon} from "@heroicons/react/24/outline"
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="relative py-16 border-t border-neutral-200">
            <div className="container mx-auto grid grid-cols-7 gap-x-10">
                <div className="flex flex-col gap-6 col-span-2">
                    <Logo/>
                    <div className="space-y-6">
                        <div className="flex items-center gap-x-1.5">
                            <PhoneIcon className="h-12 w-12"/>
                            <div className="grid">
                                <span className="text-sm">Hotline</span>
                                <h2 className="font-bold">0334761730</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                            <AtSymbolIcon className="h-12 w-12"/>
                            <div className="grid">
                                <span className="text-sm">Email</span>
                                <h2 className="font-bold">organicbox2024@gmail.com</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                            <MapPinIcon className="h-12 w-12"/>
                            <div className="grid">
                                <span className="text-sm">Địa chỉ</span>
                                <h2 className="font-bold">abcdefgh</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                            <ClockIcon className="h-12 w-12"/>
                            <div className="grid">
                                <span className="text-sm">Thời gia hoat động</span>
                                <h2 className="font-bold">Tất cả ngày trong tuần (8:30 - 22:00)</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg">Liên kết nhanh</h2>
                    <ul className="mt-4 text-base space-y-2">
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Đăng nhập</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Đăng ký</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Sản phẩm mới</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Sản phẩm giảm giá</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Sản phẩm bán chạy</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Giỏ hàng</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Thanh toán</Link>
                        </li>
                        <li>
                        <Link className="text-neutral-600 hover:text-green-600" to="/login">Liên hệ</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Về chúng tôi</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-lg">Chính sách</h2>
                    <ul className="mt-4 text-base space-y-2">
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/">Chính sách hoàn trả</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Chính sách khuyến
                                mãi</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Chính sách bảo
                                mật</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Chính sách giao
                                hàng</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-lg">Hỗ trợ & chăm sóc</h2>
                    <ul className="mt-4 text-base space-y-2">
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/">Hướng dẫn mua hàng</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Hỏi đáp - FAQs</Link>
                        </li>
                        <li>
                            <Link className="text-neutral-600 hover:text-green-600" to="/login">Theo dõi đơn hàng</Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4 col-span-2">
                    <p>Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.</p>
                    <Button>Đóng góp ý kiến</Button>
                </div>
            </div>
        </div>
    )
}

export default Footer