import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import ProductCard from "@/components/card/ProductCard.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Link, useParams} from "react-router-dom";
import {Popover, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {Slider} from "@/components/ui/slider.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {formatCurrency, formatPriceRangeTitle, rangePaging} from "@/util/decoration.util.ts";
import {Select, SelectContent, SelectItem, SelectValue} from "@/components/ui/select.tsx";
import {SelectTrigger} from "@radix-ui/react-select";
import {ProductSort} from "@/constant/sort.constant.ts"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {defaultPriceRanges} from "@/constant/available.constant.ts";
import categoryApi from "@/api/category.api.ts";

const Collection = () => {
    const [priceRangeCustom, setPriceRangeCustom] = useState<number[]>([0, 5000000])
    const [priceRangeTemp, setPriceRangeTemp] = useState<number[]>(priceRangeCustom)
    const {slug} = useParams();
    const {data} = useQuery({
        queryKey: ['collection', slug],
        queryFn: () => categoryApi.getProductsOfCategory(slug as string),
        placeholderData: keepPreviousData
    })

    return (
        <div className="container lg:grid grid-cols-4 gap-6 mx-auto mt-8">
            <div className="col-span-1">
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="item-1" >
                        <AccordionTrigger className="bg-transparent hover:border-transparent hover:no-underline font-semibold data-[state=open]:text-green-600 !outline-none text-lg">Mức giá</AccordionTrigger>
                        <AccordionContent className="p-5 space-y-6 text-base">
                            <div className="space-y-4">
                                {
                                    defaultPriceRanges.map((priceRange, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Checkbox
                                                className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                                id="terms"/>
                                            <label htmlFor="terms" className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tracking-tighter">
                                                {formatPriceRangeTitle(priceRange.min, priceRange.max)}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="relative flex flex-col space-y-6">
                                <div className="space-y-5">
                                    <span className="font-normal">Hoặc nhập khoảng giá phù hợp với bạn:</span>
                                    <Slider
                                        defaultValue={priceRangeCustom}
                                        max={5000000}
                                        step={10000}
                                        onValueChange={value => setPriceRangeTemp(value)}
                                    />
                                </div>
                                <div className="flex justify-between space-x-5">
                                    <div>
                                    <label htmlFor="minPrice"
                                               className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">Giá
                                            từ</label>
                                        <div className="mt-1 relative rounded-md">
                                            <div
                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-neutral-500 sm:text-sm">₫</span>
                                            </div>
                                            <Input
                                                type="text"
                                                name="minPrice"
                                                id="minPrice"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                value={priceRangeTemp[0]}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="maxPrice"
                                               className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">Giá
                                            đến</label>
                                        <div className="mt-1 relative rounded-md">
                                            <div
                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-neutral-500 sm:text-sm">₫</span>
                                            </div>
                                            <input
                                                type="text"
                                                name="maxPrice"
                                                id="maxPrice"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                value={priceRangeTemp[1]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger
                            className="bg-transparent hover:border-transparent hover:no-underline data-[state=open]:text-green-600 font-semibold text-lg !outline-none">Thương
                            hiệu</AccordionTrigger>
                        <AccordionContent className="p-5 text-base">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        id="terms"/>
                                    <label htmlFor="terms"
                                           className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Organicfood
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger
                            className="bg-transparent hover:border-transparent hover:no-underline data-[state=open]:text-green-600 font-semibold text-lg !outline-none">Đánh
                            giá</AccordionTrigger>
                        <AccordionContent className="p-5 text-base">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        id="terms"/>
                                    <label htmlFor="terms"
                                           className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        5 sao
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        id="terms"/>
                                    <label htmlFor="terms"
                                           className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Từ 4 sao trở lên
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        id="terms"/>
                                    <label htmlFor="terms"
                                           className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Từ 3 sao trở lên
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        id="terms"/>
                                    <label htmlFor="terms"
                                           className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Từ 2 sao trở lên
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="bg-transparent border-neutral-400 hover:border-black data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                        id="terms"/>
                                    <label htmlFor="terms"
                                           className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Từ 1 sao trở lên
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="col-span-3 space-y-6">
                <div className="space-y-4">
                    <Breadcrumb>
                        <BreadcrumbList className="text-base">
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to="/" className="text-neutral-900 flex hover:text-neutral-500 font-medium">Trang
                                        chủ</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to="/categories"
                                          className="text-neutral-900 hover:text-neutral-500 font-medium">Danh
                                        mục</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-green-600 font-medium">{data?.data.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex justify-between items-between">
                        <h2 className="uppercase font-extrabold text-3xl tracking-tighter">{data?.data.title}</h2>
                        <div className="flex space-x-2 items-center">
                            <span className="font-semibold">Sắp xếp</span>
                            <Select defaultValue={Object.keys(ProductSort)[0]}>
                                <SelectTrigger
                                    className="py-2 rounded-full bg-transparent border border-neutral-200 hover:border-neutral-400">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Object.entries(ProductSort).map(([key, value]) => (
                                            <SelectItem value={key}>{value}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="sm:flex lg:hidden space-x-4">
                        <Popover className="relative">
                            {({close}) => (
                                <>
                                    <Popover.Button
                                        className={`flex items-center justify-center gap-0.5 px-4 py-2 text-sm rounded-full border text-black bg-transparent border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100 focus:outline-none `}>
                                <span className="font-semibold">
                                    Khoảng giá:
                                </span>
                                        <span>{formatCurrency(priceRangeCustom[0])} - {formatCurrency(priceRangeCustom[1])}</span>
                                        {/*{renderXClear()}*/}
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                                            <div
                                                className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                                <div className="relative flex flex-col px-5 py-6 space-y-8">
                                                    <div className="space-y-5">
                                                        <span className="font-medium">Chọn khoảng giá</span>
                                                        <Slider
                                                            defaultValue={priceRangeCustom}
                                                            max={5000000}
                                                            step={10000}
                                                            onValueChange={value => setPriceRangeTemp(value)}
                                                        />
                                                    </div>

                                                    <div className="flex justify-between space-x-5">
                                                        <div>
                                                            <label htmlFor="minPrice"
                                                                   className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                                Giá từ
                                                            </label>
                                                            <div className="mt-1 relative rounded-md">
                                                                <div
                                                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                    <span
                                                                        className="text-neutral-500 sm:text-sm">₫</span>
                                                                </div>
                                                                <Input
                                                                    type="text"
                                                                    name="minPrice"
                                                                    id="minPrice"
                                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                    value={priceRangeTemp[0]}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="maxPrice"
                                                                   className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Giá
                                                                đến</label>
                                                            <div className="mt-1 relative rounded-md">
                                                                <div
                                                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                    <span
                                                                        className="text-neutral-500 sm:text-sm">₫</span>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="maxPrice"
                                                                    id="maxPrice"
                                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                    value={priceRangeTemp[1]}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                                    <Button variant="outline" className="rounded-full" onClick={close}>
                                                        Thiết lập lại
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setPriceRangeCustom(priceRangeTemp)
                                                            close()
                                                        }}
                                                        className="rounded-full bg-green-600 hover:bg-green-500 border-none"
                                                    >
                                                        Áp dụng
                                                    </Button>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {
                            data?.data.items?.map((item, index) => (
                                <ProductCard key={index} shadow={true} item={item} />
                            ))
                        }
                    </div>
                    <div className="flex mt-8 justify-center items-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious to="#"
                                                        className="text-black rounded-full p-0 flex items-center justify-center w-10 h-10"/>
                                </PaginationItem>
                                {
                                    rangePaging(data?.data.total_pages).map((value, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink to="#" className="text-black rounded-full p-0 flex items-center justify-center w-10 h-10">{value}</PaginationLink>
                                        </PaginationItem>
                                    ))
                                }
                                <PaginationItem>
                                    <PaginationNext to="#"
                                                    className="text-black rounded-full p-0 flex items-center justify-center w-10 h-10"/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection