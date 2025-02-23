"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {Column} from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
    cols:  Column<TData, unknown>[]
}

export function DataTableViewOptions<TData>({cols}: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="hidden lg:flex"
                >
                    <Settings2 />
                    Tùy chọn xem
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Danh sách các cột</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    cols.map((col) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={col.id}
                                checked={col.getIsVisible()}
                                onCheckedChange={(value) => col.toggleVisibility(!!value)}
                            >
                                {col.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
