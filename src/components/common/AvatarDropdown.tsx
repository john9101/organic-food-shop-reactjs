import {Popover, Transition} from "@headlessui/react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Fragment} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {UserIcon, IdentificationIcon, ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline"

interface AvatarDropDownProps {
    email: string;
    fullName: string;
}

const AvatarDropdown = ({email, fullName}: AvatarDropDownProps) => {
    return (
        <>
            <Popover className="relative flex">
                {({close}) => (
                    <>
                        <Popover.Button className="rounded-full right-0 p-0 flex items-center justify-center focus:outline-none ">
                            <Avatar>
                                <AvatarFallback className="bg-transparent"><UserIcon className="w-10 h-10 stroke-1"/></AvatarFallback>
                            </Avatar>
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
                            <Popover.Panel className="absolute max-w-[260px] pt-2 top-full right-0 z-10 w-screen">
                                <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="grid grid-cols-1 gap-2 p-4">
                                        <div className="flex items-stretch space-x-2 py-2">
                                            <Avatar className="w-12 h-12">
                                                <AvatarFallback className="bg-transparent"><UserIcon className="stroke-1"/></AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow grid">
                                                <h4 className="font-bold tracking-tighter text-lg leading-none place-content-center">{fullName}</h4>
                                                <p className="text-xs mt-0.5 place-content-center">{email}</p>
                                            </div>
                                        </div>
                                        <div className="w-full border-b border-neutral-200"/>
                                        <Button variant="ghost" asChild className="space-x-2 justify-start text-neutral-600 text-base">
                                            <Link to="/account/info" onClick={() => close()}><IdentificationIcon/> Tài khoản
                                                của
                                                tôi</Link>
                                        </Button>
                                        <Button variant="ghost" asChild className="space-x-2 justify-start text-neutral-600 text-base">
                                            <Link to="/account/order" onClick={() => close()}><ArchiveBoxIcon/> Đơn hàng
                                                của
                                                tôi</Link>
                                        </Button>
                                        <div className="w-full border-b border-neutral-200"/>
                                        <Button variant="ghost" asChild className="space-x-2 justify-start text-neutral-600 text-base">
                                            <Link to="/logout"
                                                  onClick={() => close()}><ArrowLeftStartOnRectangleIcon/> Đăng
                                                xuất</Link>
                                        </Button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </>
    )
}
export default AvatarDropdown;