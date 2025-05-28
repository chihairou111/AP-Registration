import { useState } from "react";
import "@/registrationform.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDaysIcon } from "lucide-react";
import { CircleDollarSign } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


function RegistrationForm() {
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState([
    "AP Calculus AB",
    "AP Calculus BC",
    "AP Statistics",
    "AP Chemistry",
    "AP Biology",
    "AP Microeconomics",
    "AP Macroeconomics",
    "AP Psychology",
    "AP Physics C: Electromagnetism",
    "AP Physics C: Mechanics",
    "AP Computer Science A",
    "AP World History",
    "AP Human Geography",
    "AP 2D Art and Design",
    "AP 3D Art and Design",
    "AP Drawing",
    "AP Music Theory"
  ]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      <ScrollArea className="h-full w-[400px] max-w-2xl rounded-md border border-gray-200 bg-white shadow-lg">
        <div className="flex p-5 flex-col self-start w-full">
          <h1 className="font-bold text-lg mb-0.5 self-start">
            Advanced Placement（报名）
          </h1>
          <div className="flex flex-row gap-3 self-start">
            <div className="flex items-center gap-1 mb-1">
              <CalendarDaysIcon className="size-3 text-gray-500" />
              <p className="text-xs text-gray-500">2023年9月1日 - 2023年9月30日</p>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <CircleDollarSign className="size-3 text-gray-500" />
              <p className="text-xs text-gray-500">1000元</p>
            </div>
          </div>
          <Separator className="my-2" />

          {/* Form Fields Start Here */}
          <form className="w-full space-y-4 mt-4 ">
            {/* User Info Fields */}
            <div className="flex flex-col ">
              <Label htmlFor="chineseName" className="block text-sm font-medium mb-1">
                中文姓名
              </Label>
              <Input
                  disabled={true}
                  type="text"
                  id="chineseName" 
                  name="chineseName" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
                  placeholder="中文名字"
              />
              <Label htmlFor="pinyinName" className="block text-sm font-medium mb-1">
                拼音姓名
              </Label>
              <Input
                  disabled={true}
                  type="text"
                  id="pinyinName"
                  name="pinyinName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
                  placeholder="拼音名字"
              />
              
              <Label htmlFor="grade-select" className="block text-sm font-medium mb-1">
                年级
              </Label>
              <Select name="grade"
              value={grade}
              onValueChange={(currentValue) => setGrade(currentValue)}
              >
                <SelectTrigger id="grade-select" className="w-full"> 
                  <SelectValue placeholder="选择年级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>选择年级</SelectLabel>
                    <SelectItem value="9">九年级</SelectItem>
                    <SelectItem value="10">十年级</SelectItem>
                    <SelectItem value="11">十一年级</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                <div className="flex flex-col gap-2 mt-4">
                  <Label className="mb-2 font-medium">选择科目</Label>
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2 mb-1">
                      <Checkbox id={subject} />
                      <Label htmlFor={subject} className="font-normal">{subject}</Label>
                    </div>
                  ))}
                </div>
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}

export default RegistrationForm;