import Header from "@/components/common/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "@/components/common/Footer.tsx";
import {Toaster} from "sonner";

const MainClientLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Toaster richColors/>
            <Footer/>
        </div>
    )
}

export default MainClientLayout;