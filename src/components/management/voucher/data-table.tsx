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
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {AddVoucherRequest} from "@/type/request/voucher.request.ts";
import {addVoucherSchema} from "@/schema/voucher.schema.ts";
import {addVoucher, resetAddedVoucher} from "@/redux/slice/voucher.slice.ts";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "@heroicons/react/24/outline";
import {Calendar} from "@/components/ui/calendar.tsx";

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
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const {voucher} = useAppSelector(state => state.voucher)
    const addedVoucher = voucher.added

    useEffect(() => {
        if (addedVoucher){
            toast.success(`Đã thêm phiếu giảm giá thành công`, {
                position: "top-right",
                duration: 2000,
            })
            dispatch(resetAddedVoucher())
            setTimeout(() => setOpen(false), 2000)
        }
    }, [addedVoucher]);

    const addVoucherForm = useForm<AddVoucherRequest>({
        resolver: yupResolver(addVoucherSchema),
    })

    const onSubmitAddVoucherForm = (body: AddVoucherRequest) => {
        const promise = dispatch(addVoucher(body))
        return () => promise.abort()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-stretch gap-2">
                <h2 className="place-content-end font-semibold text-2xl leading-none tracking-tighter text-green-600">Danh sách phiếu giảm giá</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="ml-auto hover:text-white bg-green-600 hover:bg-green-500">Thêm phiếu giảm giá</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle className="text-green-600">Thêm mới phiếu giảm giá</DialogTitle>
                            <DialogDescription>Nhập thông tin về phiếu giảm giá</DialogDescription>
                        </DialogHeader>
                        <Form {...addVoucherForm}>
                            <form onSubmit={addVoucherForm.handleSubmit(onSubmitAddVoucherForm)} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={addVoucherForm.control}
                                        name="code"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Code <span
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
                                        control={addVoucherForm.control}
                                        name="discountPercent"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Phần trăm giảm giá <span
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
                                        control={addVoucherForm.control}
                                        name="description"
                                        render={({field}: { field: FieldValues }) => (
                                            <FormItem className="flex flex-col items-start col-span-2">
                                                <FormLabel>Mô tả </FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} autoComplete="on"/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addVoucherForm.control}
                                        name="quantity"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Số lượt áp dụng <span
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
                                        control={addVoucherForm.control}
                                        name="minimumAmount"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Giá tối thiểu áp dụng <span
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
                                        control={addVoucherForm.control}
                                        name="effectiveDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Ngày hiệu lực <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "text-left w-full font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value && format(field.value, "P")}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            className="pointer-events-auto"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-xs text-red-600"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addVoucherForm.control}
                                        name="expiryDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Ngày hết hạn <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "text-left w-full font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value && format(field.value, "P")}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            className="pointer-events-auto"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-xs text-red-600"/>
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