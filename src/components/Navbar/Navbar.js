import { useState } from "react"
import Sidebar from "./sidebar/Sidebar.js"
import Topbar from "./Topbar/Topbar.js"

const Navbar = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const handleToggleSidebar = () => {
      setSidebarCollapsed((prev) => !prev)
    }
    return (
        <>
            <Topbar onToggleSidebar={handleToggleSidebar}/>
            <Sidebar collapse={sidebarCollapsed}/>
        </>
    )
}
export default Navbar