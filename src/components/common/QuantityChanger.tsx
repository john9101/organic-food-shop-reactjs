import {Button} from "@/components/ui/button.tsx";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/solid";
import {Input} from "@/components/ui/input.tsx";
import {ChangeEvent} from "react";
import { isEmpty } from "lodash";

interface ChangeQuantityButtonsProps {
    value: number;
    onChange: (newValue: number) => void;
    onMinus: () => void;
    onPlus: () => void;
}

const QuantityChanger = ({value, onChange, onPlus, onMinus}: ChangeQuantityButtonsProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.trim();
        if (isEmpty(inputValue) || isNaN(Number(inputValue))) {
            onChange(0);
        } else {
            const newValue = parseInt(inputValue);
            if (newValue > 0) {
                onChange(newValue);
            }
        }
    };

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
        if (isEmpty(event.target.value.trim())) {
            onChange(1);
        }
    };

    return (
        <div className="h-full flex border border-green-600 rounded-lg">
            <Button type="button" className="bg-transparent text-black px-4 h-auto focus:ring-0 hover:bg-transparent hover:text-green-700" onClick={onMinus}>
                <MinusIcon/>
            </Button>
            <Input type="text" className="bg-transparent font-semibold text-black px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-center border-none !text-lg tracking-tighter" value={value || ""} onChange={handleChange} onBlur={handleBlur} />
            <Button type="button" className="bg-transparent text-black px-4 h-auto focus:ring-0 hover:bg-transparent hover:text-green-700" onClick={onPlus}>
                <PlusIcon/>
            </Button>
        </div>
    )
}
export default QuantityChanger;