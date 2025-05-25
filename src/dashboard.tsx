import "./dashboard.css"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import supabase from "@/lib/supabase.ts";
import { useEffect, useState } from "react";



function Dashboard() {
    const [userid, setUserid] = useState("")
    const [pinyinname, setPinyinname] = useState("")
    const [chinesename, setChinesename] = useState("")

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error) {
                toast.error(error.message);
                return;
            }

            if (data?.user) {
                setUserid(data.user.id);

                // Fetch user data
                const { data: userData, error: userError } = await supabase
                    .from('users')  // 使用小写表名
                    .select('chinesename, pinyinname')  // 只选择需要的字段
                    .eq('userid', userid)  // 使用正确的字段名
                    .single()

                if (userError) {
                    toast.error(userError.message);
                    return;
                }

                if (userData) {
                    setPinyinname(userData.pinyinname)
                    setChinesename(userData.chinesename)
                }
            }
        }
        getUser()
    }, []);
    return (
        <>
<div className="flex flex-col">
    <div className="flex flex-row p-4 justify-between">
        <h1 className="font-semibold text-1xl">主页</h1>

    <div className="flex flex-row gap-3">
        <div className="flex flex-col items-end">
            <h1 className="font-semibold text-1xl">{chinesename}</h1>
            <h2 className="text-gray-400 text-sm">{pinyinname}</h2>
        </div>
<Avatar className="size-10 bg-gray-200">
    <AvatarFallback className="font-semibold text-lg">CN</AvatarFallback>
</Avatar>
    </div>
    </div>
</div>
        </>
    )
}

export default Dashboard

