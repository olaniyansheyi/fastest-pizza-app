import { useSelector } from "react-redux"
import userSlice from "./userSlice"

function Username() {

const userName = useSelector(store=> store.user.userName)

    if (!userName) return null;
    return (
        <div className="text-sm font-semibold hidden md:block">
            {userName}
        </div>
    )
}

export default Username
