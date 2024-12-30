import {PercentBadgeIcon} from "@heroicons/react/24/solid"
const CouponTicket = () => {
    return (
        <div className="flex w-full text-zinc-50 overflow-hidden">
            <div className="h-full bg-zinc-900 px-4 grid items-center  rounded-l-lg">
                <PercentBadgeIcon className="w-16 h-16 text-green-400"/>
            </div>
            <div className="relative h-full flex flex-col items-center border-dashed justify-between border bg-zinc-900 border-zinc-50">
                <div className="absolute rounded-full w-7 h-7 bg-white -top-5"/>
                <div className="absolute rounded-full w-7 h-7 bg-white -bottom-5"/>
            </div>
            <div className="h-full flex-1 w-80 gap-1.5 py-4 px-6 bg-zinc-900 grid rounded-r-lg">
                <div className="font-extrabold text-xl tracking-tighter text-green-400">
                    ORGANICBOX <span className="text-sm font-normal text-white">(100)</span>
                </div>
                <p className="row-span-6 text-sm truncate ">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <div className="flex justify-between">
                    <span className="font-bold leading-none text-sm place-self-center">HXD: <span
                        className="font-normal">17/01/2025</span></span>
                    <span className="text-green-400 font-bold leading-none flex text-sm">Điều kiện</span>
                </div>
            </div>
        </div>
    )
}

export default CouponTicket