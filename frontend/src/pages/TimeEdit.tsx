import { useParams } from "react-router-dom"
import TimeForm from "./TimeForm"

const TimeEdit = () => {
  const { id } = useParams()
  return <TimeForm id={id} />
}

export default TimeEdit;