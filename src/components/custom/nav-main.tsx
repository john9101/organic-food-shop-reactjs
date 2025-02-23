import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { NavLink} from "react-router-dom";

export function NavMain({heading, items}: {
    heading: string;
    items: {
        title: string
        url: string
    }[]
}) {

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{heading}</SidebarGroupLabel>
            <SidebarMenu>
                {
                    items.map((item, index) => (
                        <SidebarMenuButton
                            key={index}
                            tooltip={item.title}
                            className="p-0"
                        >
                            <NavLink
                                to={item.url}
                                className={({isActive}) => isActive  ? "bg-green-600 text-white hover:text-white flex w-full" : "!text-neutral-600 flex w-full"}
                            >
                                <span className="m-2 w-full">{item.title}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
    )
}