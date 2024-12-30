import {useState} from "react";
import {pathOr} from "ramda";
import {Button} from "@/components/ui/button.tsx";

interface ImageShowCaseProps {
    imageUrls: string[] | undefined
}

const ImageShowCase = ({imageUrls}: ImageShowCaseProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg h-[600px]">
                <img src={pathOr('', [activeIndex], imageUrls)} className="h-full w-full object-fill"/>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {
                    imageUrls?.map((imageUrl, index) => (
                        <div key={index} className={`${activeIndex === index ? 'border-2 border-green-600' : ''} h-[140px] overflow-hidden rounded-lg`}>
                            <Button className="p-0 h-full w-full" onClick={() => setActiveIndex(index)}>
                                <img src={imageUrl} className="object-fill" />
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ImageShowCase