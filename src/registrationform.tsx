import "@/registrationform.css"
import { ScrollArea } from "@/components/ui/scroll-area"

function RegistrationForm() {
  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <ScrollArea className="h-screen w-100 rounded-md border border-gray-300">
        <div className=" flex p-3 flex-col items-center">
          <h1 className="font-bold text-lg mb-1">
            Advanced Placement（报名）
          </h1>
        </div>
      </ScrollArea>
    </div>
  )
}

export default RegistrationForm