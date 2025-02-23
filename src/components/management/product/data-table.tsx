import {
    ColumnDef,
    flexRender,
    getCoreRowModel, getPaginationRowModel,
    useReactTable, VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {DataTablePagination} from "@/components/data-table/pagination.tsx";
import React from "react";
import {DataTableViewOptions} from "@/components/data-table/view-option.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>(
    {
        columns,
        data,
    }: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility
        },
    })

    const cols = table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())



    return (
        <div className="space-y-4">
            <div className="flex items-stretch gap-2">
                <h2 className="place-content-end font-semibold text-2xl leading-none tracking-tighter text-green-600">Danh sách sản phẩm</h2>
                <Button className="ml-auto hover:text-white bg-green-600 hover:bg-green-500" asChild>
                    <Link to="add">Thêm sản phẩm</Link>
                </Button>
                <DataTableViewOptions cols={cols}/>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </div>
    )
}