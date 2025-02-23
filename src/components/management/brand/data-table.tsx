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
import React, {useEffect, useState} from "react";
import {DataTableViewOptions} from "@/components/data-table/view-option.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {AddBrandRequest} from "@/type/request/brand.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {addBrandSchema} from "@/schema/brand.schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {addBrand, resetAddedBrand} from "@/redux/slice/brand.slice.ts";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea.tsx";

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

    const dispatch = useAppDispatch();
    const {brand} = useAppSelector(state => state.brand)
    const addedBrand = brand.added

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (addedBrand){
            toast.success(`Đã thêm thương hiệu thành công`, {
                position: "top-right",
                duration: 2000
            })
            dispatch(resetAddedBrand())
            setTimeout(() => setOpen(false), 2000)
        }
    }, [addedBrand]);

    const addBrandForm = useForm<AddBrandRequest>({
        resolver: yupResolver(addBrandSchema),
    })

    const onSubmitAddBrandForm = (body: AddBrandRequest) => {
        const promise = dispatch(addBrand(body))
        return () => promise.abort()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-stretch gap-2">
                <h2 className="place-content-end font-semibold text-2xl leading-none tracking-tighter text-green-600">Danh sách thương hiệu</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="ml-auto hover:text-white bg-green-600 hover:bg-green-500">Thêm thương hiệu</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle className="text-green-600">Thêm thương hiệu mới</DialogTitle>
                            <DialogDescription>Nhập thông tin về danh mục thương hiệu</DialogDescription>
                        </DialogHeader>
                        <Form {...addBrandForm}>
                            <form onSubmit={addBrandForm.handleSubmit(onSubmitAddBrandForm)} className="space-y-6">
                                <div className="grid gap-6">
                                    <FormField
                                        control={addBrandForm.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Tên <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        autoComplete="on"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs text-red-600"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addBrandForm.control}
                                        name="description"
                                        render={({field}: { field: FieldValues }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Mô tả</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} autoComplete="on"/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Hủy</Button>
                                    </DialogClose>
                                    <Button type="submit" className="bg-green-600 hover:bg-green-500">Lưu</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
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