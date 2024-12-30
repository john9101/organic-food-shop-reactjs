import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {StarIcon} from "@heroicons/react/24/solid";

const Review = () => {
    return (
        <div className='flex space-x-4 py-8'>
            <div className="pt-0.5">
                <Avatar className='h-10 w-10 text-lg'>
                    <AvatarImage src='https://github.com/shadcn.png'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-grow">
                <div className="flex justify-between space-x-3">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">John Doe</span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">02/11/2024</span>
                    </div>
                    <div className="flex text-amber-500">
                        <StarIcon className="w-4 h-4"/>
                        <StarIcon className="w-4 h-4"/>
                        <StarIcon className="w-4 h-4"/>
                        <StarIcon className="w-4 h-4"/>
                        <StarIcon className="w-4 h-4"/>
                    </div>
                </div>
                <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>
            </div>
        </div>
    )
}

export default Review;