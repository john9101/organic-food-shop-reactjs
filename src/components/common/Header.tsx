import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {Link} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import * as React from "react";
import Logo from "@/components/common/Logo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/hook.ts";
import AvatarDropdown from "@/components/common/AvatarDropdown.tsx";
import CartDropDown from "@/components/common/CartDropDown.tsx";
import WishlistDropDown from "@/components/common/WishlistDropDown.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import {CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useEffect, useState} from "react";
import {getAllCategories} from "@/redux/slice/category.slice.ts";
import {searchProduct} from "@/redux/slice/product.slice.ts";

const Header = () => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const {category} = useAppSelector(state => state.category);
    const {product} = useAppSelector(state => state.product);
    const {authentication} = useAppSelector(state => state.authentication);
    const loggedInAuth = authentication.loggedIn
    const [emptyKeyword, setEmptyKeyword] = useState(true);
    const {account} = useAppSelector(state => state.account);
    const gotAccountInfo = account.info.got
    const allCategories = category.all
    const searchedProduct = product.searched

    useEffect(() => {
        if (!allCategories) {
            const promise = dispatch(getAllCategories())
            return () => promise.abort()
        }
    }, [allCategories])


    const handleSearchProduct = (keyword: string) => {
        if (keyword){
            setEmptyKeyword(false);
            const promise = dispatch(searchProduct(keyword))
            return () => promise.abort()
        }else {
            setEmptyKeyword(true);
        }
    }

    return (
        <div className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur-lg backdrop-filter sticky top-0 w-full left-0 right-0 z-40 shadow-sm dark:border-b dark:border-neutral-700 text-left">
            <div className="relative z-10">
                <div className="lg:container mx-auto py-4 lg:py-5 relative flex justify-between items-center"> {/*px-4*/}
                    <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
                        <Logo/>
                         <NavigationMenu>
                            <NavigationMenuList >
                                <NavigationMenuItem>
                                    <Link to="/">
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-lg text-black bg-transparent hover:bg-transparent")}>
                                            Trang chủ
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-lg text-black !bg-transparent">Sản phẩm</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        {/*<div className="grid gap-4 p-6 lg:grid-cols-[.75fr_1fr]">*/}
                                        {/*    <div className="col-span-1">*/}
                                        {/*        <NavigationMenuLink asChild>*/}
                                        {/*            <Link*/}
                                        {/*                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-zinc-50 p-6 no-underline outline-none focus:shadow-md"*/}
                                        {/*                to="/">*/}
                                        {/*                <div className="mb-2 mt-4 pr-20">*/}
                                        {/*                    <Logo/>*/}
                                        {/*                </div>*/}
                                        {/*                <p className="text-sm font-normal leading-tight text-black">*/}
                                        {/*                    Từ mảnh đất xanh đến bàn ăn của bạn, chúng tôi trân trọng*/}
                                        {/*                    từng thực phẩm hữu cơ, đảm bảo bạn và gia đình luôn nhận*/}
                                        {/*                    được những điều tinh túy nhất từ thiên nhiên*/}
                                        {/*                </p>*/}
                                        {/*            </Link>*/}
                                        {/*        </NavigationMenuLink>*/}
                                        {/*    </div>*/}
                                        {/*    <div*/}
                                        {/*        className="col-span-1 grid gap-2 md:w-[400px] lg:w-[580px] lg:grid-cols-3">*/}
                                        {/*        {*/}
                                        {/*            allCategories?.items.map((item) => (*/}
                                        {/*                <ListItem to={`collection/${item.id}`} title={item.name}*/}
                                        {/*                          className="row-span-1"></ListItem>*/}
                                        {/*            ))*/}
                                        {/*        }*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        {/*<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">*/}
                                        {/*    <li className="row-span-3">*/}
                                        {/*        <NavigationMenuLink asChild>*/}
                                        {/*            <a*/}
                                        {/*                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"*/}
                                        {/*                href="/"*/}
                                        {/*            >*/}
                                        {/*                <Logo/>*/}
                                        {/*                <div className="mb-2 mt-4 text-lg font-medium">*/}
                                        {/*                    shadcn/ui*/}
                                        {/*                </div>*/}
                                        {/*                <p className="text-sm leading-tight text-muted-foreground">*/}
                                        {/*                    Beautifully designed components that you can copy and*/}
                                        {/*                    paste into your apps. Accessible. Customizable. Open*/}
                                        {/*                    Source.*/}
                                        {/*                </p>*/}
                                        {/*            </a>*/}
                                        {/*        </NavigationMenuLink>*/}
                                        {/*    </li>*/}
                                        {/*    /!*<ListItem href="/docs" title="Introduction">*!/*/}
                                        {/*    /!*    Re-usable components built using Radix UI and Tailwind CSS.*!/*/}
                                        {/*    /!*</ListItem>*!/*/}
                                        {/*    /!*<ListItem href="/docs/installation" title="Installation">*!/*/}
                                        {/*    /!*    How to install dependencies and structure your app.*!/*/}
                                        {/*    /!*</ListItem>*!/*/}
                                        {/*    /!*<ListItem href="/docs/primitives/typography" title="Typography">*!/*/}
                                        {/*    /!*    Styles for headings, paragraphs, lists...etc*!/*/}
                                        {/*    /!*</ListItem>*!/*/}

                                        {/*</ul>*/}

                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {
                                                allCategories?.items.map((item) => (
                                                    <ListItem to={`collection/${item.id}`} title={item.name} className="text-black hover:text-green-600"></ListItem>
                                                ))
                                            }
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                         </NavigationMenu>
                    </div>
                    <div className="flex items-stretch justify-end flex-1 text-neutral-600 space-x-2">
                        <Button variant="outline" className="relative p-0 h-auto xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                                onClick={() => setOpen(true)}>
                            <MagnifyingGlassIcon />
                            <span className="hidden xl:inline-flex text-base">Tìm kiếm sản phẩm...</span>
                        </Button>
                        <CommandDialog open={open} onOpenChange={setOpen}>
                            <CommandInput onValueChange={handleSearchProduct} placeholder="Nhập tên hoặc tiêu đề sản phẩm ..."/>
                            <CommandList>
                                <CommandEmpty>{emptyKeyword ? <>Kết quả tìm kiếm sản phẩm hiển thị ở đây</> : <>Không tìm thấy sản phẩm phù hợp</>}</CommandEmpty>
                                {
                                    !emptyKeyword && searchedProduct?.items.map((item) => (
                                        <CommandItem asChild value={item.title} onSelect={() => {
                                            setOpen(false)
                                            setEmptyKeyword(true);
                                        }}>
                                            <Link className="text-neutral-600 hover:!text-green-600" to={`/products/${item.id}`}>{item.title}</Link>
                                        </CommandItem>
                                    ))
                                }
                            </CommandList>
                        </CommandDialog>

                        {
                            (gotAccountInfo || loggedInAuth) ?
                                <div className="flex items-center space-x-2">
                                    <WishlistDropDown/>
                                    <CartDropDown/>
                                    <AvatarDropdown
                                        email={gotAccountInfo?.email ? gotAccountInfo!.email : loggedInAuth!.metadata.email}
                                        fullName={gotAccountInfo?.full_name ? gotAccountInfo!.full_name : loggedInAuth!.metadata.full_name}
                                    />
                                </div> :
                                <div className="flex items-stretch space-x-2">
                                    <Button className="text-lg h-auto font-bold hover:text-green-400" variant="default"
                                            asChild>
                                        <Link to="/register">Đăng ký</Link>
                                    </Button>
                                    <Button
                                        className="bg-green-600 text-lg hover:bg-green-500 font-bold hover:text-white h-auto"
                                        asChild>
                                        <Link to="/login">Đăng nhập</Link>
                                    </Button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

const ListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link>
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"