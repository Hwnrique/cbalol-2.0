import { AiOutlineLoading3Quarters } from "react-icons/ai";
import classes from "./Loading.module.css"

const Loading = () => {
  return (
    <>
    <AiOutlineLoading3Quarters className={classes.loader}/>
    </>
  )
}

export default Loading