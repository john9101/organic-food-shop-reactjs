import {Popover, Transition} from "@headlessui/react";
import {HeartIcon} from "@heroicons/react/24/outline";
import {Fragment} from "react";

const WishlistDropDown = ()=>{
    return (
        <>
            <Popover className="relative flex">
                {() => (
                    <>
                        <Popover.Button className="rounded-full right-0 p-0 flex items-center justify-center focus:outline-none relative">
                            <HeartIcon className="w-8 h-8 text-black"/>
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
                            <Popover.Panel className="absolute max-w-[520px] pt-2.5 top-full right-0 z-10 w-screen">
                                <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="grid grid-cols-1 gap-2 p-4">

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
export default WishlistDropDown