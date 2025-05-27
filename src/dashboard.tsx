import "./dashboard.css"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import supabase from "@/lib/supabase.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Registrationcard from "./registrationcard"; // 导入 Registrationcard 组件

// 定义 AP 考试数据的接口，明确每个字段的类型
interface Exam {
    id: string;         // 考试的唯一标识符
    title: string;      // 考试标题
    start_date: Date;   // 报名开始日期
    end_date: Date;     // 报名截止日期
    fee: number;        // 报名费用
    description: string;// 考试描述
    navigate: string;   // 点击卡片后导航到的路径
}

function getInitials(name: string): string {
    if (!name || name.trim() === "") {
        return "?";
    }
    const trimmedName = name.trim();
    const parts = trimmedName.split(/\s+/);

    if (parts.length === 1 && parts[0].length > 0) {
        return parts[0][0].toUpperCase();
    } else if (parts.length >= 2) {
        const firstInitial = parts[0][0];
        const lastInitial = parts[parts.length - 1][0];
        return (firstInitial + lastInitial).toUpperCase();
    }
    return "?"; // Fallback for unexpected cases
}

function Dashboard() {
    const [userid, setUserid] = useState("")
    const [pinyinname, setPinyinname] = useState("")
    const [chinesename, setChinesename] = useState("")
    const navigate = useNavigate()

    // AP 考试数据状态，初始化为空数组，并使用 Exam 接口指定类型
    const [Exams, setExams] = useState<Exam[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: authData, error: authError } = await supabase.auth.getUser();

            if (authError) {
                toast.error("获取认证用户失败: " + authError.message);
                navigate("/login"); // Redirect if auth fails
                return;
            }

            if (authData?.user) {
                const currentUserId = authData.user.id; // Use this ID directly
                setUserid(currentUserId); // Set state if needed for other purposes

                // Fetch user profile data
                const { data: profileData, error: profileError } = await supabase
                    .from('users')
                    .select('chinese_name, pinyin_name')
                    .eq('user_id', currentUserId)  // Corrected column name and use direct ID
                    .single();

                if (profileError) {
                    toast.error("获取用户资料失败: " + profileError.message);
                    // Potentially navigate away or show a specific error state in UI
                    return;
                }

                if (profileData) {
                    setPinyinname(profileData.pinyin_name);
                    setChinesename(profileData.chinese_name);
                } else {
                    toast.error("未找到用户资料。");
                }
                
                // 获取注册数据
                try {
                    // 获取 AP 考试数据
                    const { data: examData, error: examError } = await supabase
                        .from('registration')  
                        .select('*');
                        
                    if (examError) {
                        toast.error("获取AP考试数据失败: " + examError.message);
                        console.error("获取数据错误:", examError);
                    } else {
                        console.log("原始获取到的数据:", examData);
                        
                        // 格式化数据并更新 Exams
                        if (examData && examData.length > 0) {
                            try {
                                const formattedExams: Exam[] = examData.map(exam => {
                                    console.log("处理数据项:", exam);
                                    
                                    // 处理日期 - 确保是 Date 对象
                                    let startDate, endDate;
                                    try {
                                        startDate = exam.start_date ? new Date(exam.start_date) : new Date();
                                        endDate = exam.end_date ? new Date(exam.end_date) : new Date();
                                    } catch (dateError) {
                                        console.error("日期转换错误:", dateError);
                                        startDate = new Date();
                                        endDate = new Date();
                                    }
                                    
                                    return {
                                        id: exam.id || `exam-${Math.random().toString(36).substring(2, 9)}`,
                                        title: exam.title || "未命名考试",
                                        start_date: startDate,
                                        end_date: endDate,
                                        fee: exam.fee || 0,
                                        description: exam.description || "暂无描述",
                                        navigate: `/register/${exam.id || 'unknown'}`
                                    };
                                });
                                
                                console.log("格式化后的数据:", formattedExams);
                                setExams(formattedExams);
                                console.log("已更新AP考试数据，数组长度:", formattedExams.length);
                            } catch (formatError) {
                                console.error("格式化数据错误:", formatError);
                                toast.error("格式化考试数据错误");
                                setExams([]);
                            }
                        } else {
                            console.log("没有获取到AP考试数据或数组为空");
                            // 设置一些默认数据，以便测试UI是否正常工作
                            setExams([
                                {
                                    id: "test-exam",
                                    title: "测试考试",
                                    start_date: new Date(),
                                    end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
                                    fee: 1000,
                                    description: "这是一个测试考试项目",
                                    navigate: "/register/test"
                                }
                            ]);
                            console.log("已设置默认测试数据");
                        }
                    }
                } catch (error) {
                    console.error("查询AP考试数据错误:", error);
                    toast.error("查询AP考试数据时发生错误");
                    // 设置一些默认数据
                    setExams([
                        {
                            id: "error-test",
                            title: "错误恢复测试",
                            start_date: new Date(),
                            end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
                            fee: 1000,
                            description: "发生错误时显示的测试数据",
                            navigate: "/register/error-test"
                        }
                    ]);
                }
            } else {
                toast.error("未找到认证用户，请重新登录。");
                navigate("/login"); // Redirect if no user session
            }
        };

        fetchUserData();
    }, [navigate]); // Added navigate to dependency array
    return (
        <>
<div className="flex flex-col justify-center p-2">
    <div className="flex flex-row p-4 justify-between">
        <div className="flex flex-col items-start">
        <h1 className="font-semibold text-1xl">主页</h1>
        <h2 className="text-gray-400 text-sm">0个新信息</h2>
        </div>
    <div className="flex flex-row gap-3">
        <div className="flex flex-col items-end">
            <h1 className="font-semibold text-sm">{chinesename}</h1>
            <h2 className="text-gray-400 text-xs">{pinyinname}</h2>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
<Avatar className="size-10 bg-gray-200 cursor-pointer">
    <AvatarFallback className="font-semibold text-lg">{getInitials(pinyinname)}</AvatarFallback>
</Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={4} align="end" alignOffset={-4} className="mr-2 border-gray-300 shadow-2xl">
                <DropdownMenuLabel>用户信息</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-between">
                        我的账户
                        <User className="h-4 w-4 text-black" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-between text-red-500 hover:text-red-500" onClick={async () => {
                        await supabase.auth.signOut()
                        navigate("/login") // 跳转登录页或主页
                    }}>
                        退出登录
                        <LogOut className="h-4 w-4 text-red-500" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </div>
    <Separator />

    
    {/* AP 考试注册卡片部分 */}
    <div className="p-4">
        <h2 className="font-semibold text-xl mb-4">可报名的AP考试</h2>
        <div className="flex flex-wrap gap-6">
            {Exams.length > 0 ? (
                Exams.map((exam) => (
                    <Registrationcard
                        key={exam.id}
                        title={exam.title}
                        start_date={exam.start_date}
                        end_date={exam.end_date}
                        fee={exam.fee}
                        description={exam.description}
                        navigate={exam.navigate}
                    />
                ))
            ) : (
                <p>暂无可报名的AP考试</p>
            )}
        </div>
    </div>
</div>
        </>
    )
}

export default Dashboard
