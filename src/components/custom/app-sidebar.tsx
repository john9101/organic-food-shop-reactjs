import * as React from "react"
import {
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
} from "lucide-react"

import { NavMain } from "@/components/custom/nav-main"
import { NavUser } from "@/components/custom/nav-user"
import { TeamSwitcher } from "@/components/custom/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

const concept = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Tổng quan",
            url: "#"
        },
        {
            title: "Khách hàng",
            url: "#"
        },
        {
            title: "Nhân viên",
            url: "#"
        },
        {
            title: "Sản phẩm",
            url: "#",
            isActive: true,
            items: [
                {
                    title: "Danh sách sản phẩm",
                    url: "#",
                },
                {
                    title: "Danh sách danh mục sản phẩm",
                    url: "#",
                },
                {
                    title: "Danh sách bình luận sản phẩm",
                    url: "#",
                }
            ],
        },
        {
            title: "Đơn hàng",
            url: "#",
            items: [
                {
                    title: "Danh sách đơn hàng",
                    url: "#",
                },
                {
                    title: "Danh sách đánh giá đơn hàng",
                    url: "#",
                }
            ],
        },
        {
            title: "Mã khuyến mãi",
            url: "#",
        },
    ],
    configs: [
        {
            title: "Phân quyền vai trò",
            url: "#",
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={concept.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain heading="Quản lý" items={concept.navMain} />
                <NavMain heading="Cấu hình" items={concept.configs} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={concept.user} />
            </SidebarFooter>
            <SidebarRail className="p-0"/>
        </Sidebar>
    )
}