import "./registrationcard.css";
import { CalendarDaysIcon } from "lucide-react";
import { CircleDollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button.tsx";

interface RegistrationCardProps {
    title: string;
    start_date: Date;
    end_date: Date;
    fee: number;
    description: string;
    navigate: string;
}



function Registrationcard({
                              title,
                              start_date,
                              end_date,
                              fee,
                              description,
                              navigate
                          }: RegistrationCardProps) {

    const formatDate = (date: Date): string => {
        if (!date) return ""; // Handle cases where date might be null or undefined
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is 0-indexed
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    };

    const formattedStartDate = formatDate(start_date);
    const formattedEndDate = formatDate(end_date);


    return (
<div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-2xs rounded-md w-[300px] p-3">
<h1 className="font-bold text-lg self-start mb-1">{title}</h1>
<div className="flex items-center gap-1 self-start mb-1">
    <CalendarDaysIcon className="size-3 text-gray-500"/>
    <p className="text-xs text-gray-500">{formattedStartDate} - {formattedEndDate}</p>
</div>
    <div className="flex items-center gap-1 self-start mb-1">
    <CircleDollarSign className="size-3 text-gray-500"/>
    <p className="text-xs text-gray-500 self-start">¥{fee}</p>
        </div>
    <p className="text-xs text-gray-500 self-start mt-2 mb-3">{description}</p>
    <Button className="w-full rounded-2xl">报名</Button>
</div>
    )
}

export default Registrationcard