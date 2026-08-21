import { useParams } from "react-router-dom"
import PartidaForm from "./PartidaForm"

const PartidaEdit = () => {
  const { id } = useParams()
  return <PartidaForm id={id} />
}

export default PartidaEdit