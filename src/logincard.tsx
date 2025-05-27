import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabase"
import { toast } from "sonner"
import { Eye, EyeOff } from 'lucide-react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";

import "./logincard.css"
import yunguIcon from "@/assets/yungu_icon.png";
import googleIcon from "@/assets/google_icon.svg";
import appleIcon from "@/assets/Apple_logo_black.svg"

function Logincard() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async () => {
        const newErrors: { [key: string]: boolean } = {
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            password: password.length < 8,
        };

        setFormErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            toast.error("请检查输入信息");
            setTimeout(() => {
                setFormErrors({});
            }, 3000);
            return;
        }

        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setIsLoading(false);

        if (error) {
            toast.error("登录失败: " + error.message);
        } else {
            toast.success("登录成功");
            navigate("/dashboard");
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow-xl w-[360px]">
            <img src={yunguIcon} alt={"Yungu Icon"} className={"w-20 mb-3"}/>

            <h1 className={"font-bold mb-2 text-2xl"}>欢迎来到云谷学校AP报考系统</h1>
            <h3 className={"mb-5"}>登录 / Sign In</h3>

            <Input 
                type={"email"}
                value={email}
                placeholder={"邮箱"}
                className={`mt-4 ${formErrors.email ? "border-red-500 bg-red-50" : ""}`}
                onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
                <div className={"mt-1 self-start"}>
                <p className="text-sm text-red-500">请输入有效邮箱地址</p>
                </div>
            )}

            <div className="relative w-full mt-4 mb-1">
                <Input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder={"密码"}
                    className={`pr-10 ${formErrors.password ? "border-red-500 bg-red-50" : ""}`}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <Eye className="h-5 w-5 text-gray-500" /> : <EyeOff className="h-5 w-5 text-gray-500" />}
                </div>
            </div>
            {formErrors.password && (
                <div className={"self-start"}>
                <p className="text-sm text-red-500">密码需不少于6位</p>
                </div>
            )}

            <div className={"flex flex-row gap-4 justify-between"}>
                <Button 
                    className={"w-[155px] mt-8 mb-2"} 
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <div className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-black animate-spin" />
                        </>
                    ) : (
                        "登录"
                    )}
                </Button>
                <Button 
                    variant={"outline"} 
                    className={"w-[155px] mt-8 mb-2 border-gray-200"}
                    onClick={() => navigate("/register")}
                >
                    注册
                </Button>
            </div>

            <Separator className={"my-2"}/>

            <div className={"flex flex-col justify-center items-center mt-1"}>
<p className={"text-sm text-gray-500 font-normal mb-2"}>或使用其它方式登录</p>
                <Button
                    variant={"outline"}
                    className={"w-[330px] border-gray-200 mb-2"}
                >
                    <img src={googleIcon} alt={"Google Icon"} className={"w-4 h-4 mr-2"}/>
                    使用 Google 登录
                </Button>
                <Button
                    variant={"outline"}
                    className={"w-[330px] border-gray-200 mb-2"}
                >
                    <img src={appleIcon} alt={"Google Icon"} className={"w-4 h-5 mr-2"}/>
                    使用 Apple 登录
                </Button>
            </div>
        </div>
    )
}

export default Logincard