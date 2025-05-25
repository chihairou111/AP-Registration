import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabase";

function Mainpage() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
        });
    }, []);

    return null;
}

export default Mainpage
