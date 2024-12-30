import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline"

interface NextPrevGlideProps {
    className?: string;
    onlyNext?: boolean;
    onlyPrev?: boolean;
    onClickNext?: () => void;
    onClickPrev?: () => void;
    navBtnClassName?: string;
}

const NextPrevGlide = ({className, onlyNext=false, onlyPrev=false, onClickPrev, onClickNext, navBtnClassName="w-10 h-10"}: NextPrevGlideProps) => {
    return (
        <div className={`relative flex items-center text-neutral-900 dark:text-blue-300 ${className}`} data-glide-el="controls">
            {!onlyNext && (
                <button className={`${navBtnClassName} ${!onlyPrev ? "mr-[6px]" : ""} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300}`} onClick={onClickPrev} data-glide-dir="<">
                    {/*<i className="las la-angle-left"></i>*/}
                    <ChevronLeftIcon/>
                </button>
            )}
            {!onlyPrev && (
                <button className={`${navBtnClassName} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300}`} onClick={onClickNext} data-glide-dir=">">
                    {/*<i className="las la-angle-right"></i>*/}
                    <ChevronRightIcon/>
                </button>
            )}
        </div>
    )
}

export default NextPrevGlide;