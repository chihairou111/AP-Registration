import { useState } from "react";
import { useNavigate } from "react-router-dom";


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ArrowLeft } from "lucide-react";

import "./registercard.css"


function Registercard() {
    const [role, setRole] = useState("student")
    const [grade, setGrade] = useState("")
    const [chinesename, setChinesename] = useState("")
    const [pinyinname, setPinyinname] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    return (

            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow-xl w-[360px]">

<Button className="self-start mb-4 mt-3 flex items-center gap-1 justify-center px-2 py-1 h-8 " variant={"outline"} onClick={() => navigate("/login")}>
<ArrowLeft className="size-4"/>
</Button>
                <h1 className={"font-bold text-2xl self-start mb-4"}>注册 / Sign In</h1>

                <div className={"flex flex-col gap-4"}>

                <Select value={role} onValueChange={setRole} >
                    <SelectTrigger className="w-[330px]">
                        <SelectValue placeholder="选择身份" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>身份</SelectLabel>
                            <SelectItem value="student">学生</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

<div className={"flex flex-row gap-4"}>
    <Input
        value={chinesename}
        type={"text"}
        onChange={(e) => setChinesename(e.target.value)}
        placeholder="中文姓名"
    />
    <Input
        value={pinyinname}
        type={"text"}
        onChange={(e) => setPinyinname(e.target.value)}
        placeholder="拼音姓名"
    />
</div>

                <Select value={grade} onValueChange={setGrade} >
                    <SelectTrigger className="w-[330px]">
                        <SelectValue placeholder="选择年级" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>年级</SelectLabel>
                            <SelectItem value="10">10年级</SelectItem>
                            <SelectItem value="11">11年级</SelectItem>
                            <SelectItem value="12">12年级</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Input
                    value={email}
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="邮箱"
                />
                </div>
            </div>

    )
}

export default Registercard