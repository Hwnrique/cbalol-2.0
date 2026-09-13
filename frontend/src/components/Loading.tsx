import { AiOutlineLoading3Quarters } from "react-icons/ai";
import classes from "./Loading.module.css"

const Loading = () => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
    <AiOutlineLoading3Quarters className={classes.loader}/>
    </div>
  )
}

export default Loading