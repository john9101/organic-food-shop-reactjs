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
import React, {useEffect} from "react";
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
import {useForm} from "react-hook-form";
import {AddCategoryRequest} from "@/type/request/category.request.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {addCategorySchema} from "@/schema/category.schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import {addCategory, resetAddedCategory} from "@/redux/slice/category.slice.ts";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const {category} = useAppSelector(state => state.category)
    const addedCategory = category.added

    useEffect(() => {
        if (addedCategory){
            dispatch(resetAddedCategory())
            navigate("/category-management")
        }
    }, [addedCategory]);

    const addCategoryForm = useForm<AddCategoryRequest>({
        resolver: yupResolver(addCategorySchema),
    })

    const onSubmitAddCategoryForm = (body: AddCategoryRequest) => {
        const promise = dispatch(addCategory(body))
        return () => promise.abort()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-stretch gap-2">
                <h2 className="place-content-end font-bold text-2xl">Danh sách danh mục sản phẩm</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="ml-auto">Thêm danh mục sản phẩm</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Thêm mới danh mục sản phẩm</DialogTitle>
                            <DialogDescription>Nhập thông tin về danh mục sản phẩm</DialogDescription>
                        </DialogHeader>
                        <Form {...addCategoryForm}>
                            <form onSubmit={addCategoryForm.handleSubmit(onSubmitAddCategoryForm)} className="space-y-6">
                                <div className="grid gap-6">
                                    <FormField
                                        control={addCategoryForm.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-black">Tên danh mục sản phẩm <span
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
                                        control={addCategoryForm.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel>Mô tả danh mục sản phẩm</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="on"/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Hủy</Button>
                                    </DialogClose>
                                    <Button type="submit">Lưu</Button>
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