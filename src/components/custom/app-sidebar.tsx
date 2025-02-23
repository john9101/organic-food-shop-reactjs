import * as React from "react"

import { NavMain } from "@/components/custom/nav-main"
import { NavUser } from "@/components/custom/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/components/common/Logo.tsx";
import {useAppSelector} from "@/redux/hook.ts";

const concept = {
    navMain: [
        {
            title: "Tổng quan",
            url: "/dashboard",
        },
        {
            title: "Khách hàng",
            url: "/customer-management",
        },
        {
            title: "Nhân viên",
            url: "/employee-management",
        },
        {
            title: "Sản phẩm",
            url: "/product-management",
        },
        {
            title: "Danh mục",
            url: "/category-management",
        },
        {
            title: "Thương hiệu",
            url: "/brand-management",
        },
        {
            title: "Đơn hàng",
            url: "/order-management",
        },
        {
            title: "Phiếu khuyến mãi",
            url: "/voucher-management",
        },
    ],
    configs: [
        {
            title: "Phân quyền vai trò",
            url: "/role-management",
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {authentication} = useAppSelector(state => state.authentication);
    const loggedInAuth = authentication.loggedIn
    const {account} = useAppSelector(state => state.account);
    const gotAccountInfo = account.info.got

    return (
        <Sidebar {...props}>
            <SidebarHeader className="py-6 place-content-start">
                <Logo className="h-8 w-full"/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain heading="Quản lý" items={concept.navMain} />
                <NavMain heading="Cấu hình" items={concept.configs} />
            </SidebarContent>
            <SidebarFooter>
                {
                    (loggedInAuth || gotAccountInfo) && <NavUser user={{
                        email: gotAccountInfo?.email ? gotAccountInfo!.email : loggedInAuth!.metadata.email!,
                        fullName: gotAccountInfo?.full_name ? gotAccountInfo!.full_name : loggedInAuth!.metadata.full_name
                    }} />
                }
            </SidebarFooter>
            <SidebarRail className="p-0"/>
        </Sidebar>
    )
}