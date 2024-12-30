import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline"
import {Button} from "@/components/ui/button.tsx";

type CommentProps = {
    isNested?: boolean;
}

const Comment = ({isNested}: CommentProps) => {
    return (
        <div className="nc-CommentCard flex ">
            <div className="pt-1">
                <Avatar className={`w-6 h-6 ${!isNested ? "sm:h-8 sm:w-8 " : ""}`}>
                    <AvatarImage src='https://github.com/shadcn.png'/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div
                className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
                <div className="relative flex items-center pr-6">
                    <a
                        className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                        href="/"
                    >
                        John Doe
                    </a>
                    <span className="mx-2">·</span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">02/11/2024</span>
                </div>
                <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </span>
                <div>
                    <Button className="rounded-full text-neutral-900 border-none bg-neutral-100 dark:text-neutral-200 dark:bg-neutral-800 px-3 h-8 hover:bg-green-50 hover:text-green-600 dark:hover:text-green-500 focus:outline-none">
                        <ArrowUturnLeftIcon/> Phản hồi
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Comment