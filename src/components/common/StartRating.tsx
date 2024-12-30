import {StarIcon} from "@heroicons/react/24/solid"

interface StartRatingProps {
    point: number,
    reviewCount: number,
}

const StartRating = ({point, reviewCount}: StartRatingProps) => {
    return (
        <div className="flex items-center space-x-0.5 text-base !tracking-[-0.1rem]">
            <StarIcon  className="w-[16px] h-[16px] text-amber-500"/>
            <span className="font-semibold text-black">{point}</span>
            <span className="text-neutral-500 dark:text-neutral-400">({reviewCount})</span>
        </div>
    )
}

export default StartRating