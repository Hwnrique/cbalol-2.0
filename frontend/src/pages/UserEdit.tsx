import { useParams } from "react-router-dom"
import UserForm from "./UserForm"

const UserEdit = () => {
  const { id } = useParams()
  return <UserForm id={id} />
}

export default UserEdit