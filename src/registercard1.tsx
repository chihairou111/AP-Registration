import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabase"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import "./registercard1.css"

function Registercard1() {
    const [role, setRole] = useState("student")
    const [chinesename, setChinesename] = useState("")
    const [pinyinname, setPinyinname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({})
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false) // 

    const handleRegister = async () => {
      const newErrors: { [key: string]: boolean } = {
        chinesename: !chinesename.trim(),
        pinyinname: !pinyinname.trim(),
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        password: password.length < 8,
        confirmPassword: password !== confirmPassword,
      };

      setFormErrors(newErrors);

      if (Object.values(newErrors).some(Boolean)) {
        toast.error("请检查输入信息");

        // auto-clear error highlights after 3 seconds
        setTimeout(() => {
          setFormErrors({});
        }, 3000);

        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      setIsLoading(false);

      if (error) {
        toast.error("注册失败: " + error.message);
      } else {
          const { error: userError } = await supabase
              .from('users')  // 
              .insert({
                  user_id: data.user.id,  //
                  role: role,
                  chinese_name: chinesename,
                  pinyin_name: pinyinname
              })

          if (userError) {
              toast.error("用户信息存储失败: " + userError.message);
              // Consider if you need to handle the auth user if profile insert fails
          } else {
              toast.success("注册成功");
              navigate("/login");
          }
      }
    };


    return (
<Card className={"w-[350px] border-white"}>
  <CardHeader>
    <CardTitle>注册</CardTitle>
  <CardDescription>开启你的申请之旅吧！</CardDescription>
  </CardHeader>
  <CardContent className={"flex flex-col gap-4"}>
    <form
        noValidate={true}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="role-select">身份</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full" id="role-select">
            <SelectValue placeholder="选择身份" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>身份</SelectLabel>
              <SelectItem value="student">学生</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className={"flex flex-row gap-4"}>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="chinesename">中文姓名</Label>
          <Input
              id={"chinesename"}
            value={chinesename}
            type={"text"}
            onChange={(e) => setChinesename(e.target.value)}
            placeholder="周苹果"
            className={formErrors.chinesename ? "border-red-500 bg-red-50" : ""}
          />
          {formErrors.chinesename && (
            <p className="text-sm text-red-500">请输入中文姓名</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="pinyinname">拼音姓名</Label>
          <Input
              id={"pinyinname"}
            value={pinyinname}
            type={"text"}
            onChange={(e) => setPinyinname(e.target.value)}
            placeholder="Pingguo Zhou"
            className={formErrors.pinyinname ? "border-red-500 bg-red-50" : ""}
          />
          {formErrors.pinyinname && (
            <p className="text-sm text-red-500">请输入拼音姓名</p>
          )}
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id={"email"}
          value={email}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={formErrors.email ? "border-red-500 bg-red-50" : ""}
        />
        {formErrors.email && (
          <p className="text-sm text-red-500">请输入有效邮箱地址</p>
        )}
      </div>

        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">密码</Label>
            <Input
                id={"password"}
                type={"password"}
                value={password}
                placeholder="密码"
                className={formErrors.password ? "border-red-500 bg-red-50" : ""}
                onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className="text-sm text-red-500">密码需不少于8位</p>
            )}
        </div>

        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="confirmPassword">确认密码</Label>
            <Input
                id={"confirmPassword"}
                type={"password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                className={formErrors.confirmPassword ? "border-red-500 bg-red-50" : ""}
            />
            {formErrors.confirmPassword && (
                <p className="text-sm text-red-500">两次密码输入不一致</p>
            )}
        </div>
        <CardFooter className="flex justify-between mt-4 px-0">
            <Button variant={"outline"} type={"button"} onClick={() => navigate(-1)}>返回</Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-black animate-spin" />
          </>
        ) : (
          "注册"
        )}
      </Button>
</CardFooter>
    </form>
  </CardContent>
</Card>
    )
}

export default Registercard1
