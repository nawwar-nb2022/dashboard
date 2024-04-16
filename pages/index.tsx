import { IRootState } from "@/store";
import { useSelector } from "react-redux";

const Index = () => {
    const themeConfig = useSelector((state : IRootState)=>state.themeConfig)
    return (
        <>
            <div>
                {themeConfig.sidebar.toString()}
                <h1>starter page</h1>
            </div>
        </>
    );
};

export default Index;
