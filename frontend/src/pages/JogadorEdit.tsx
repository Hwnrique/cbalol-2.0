import { useParams } from "react-router-dom"
import JogadorForm from "./JogadorForm"

const JogadorEdit = () => {
  const { id } = useParams()
  return <JogadorForm id={id} />
}

export default JogadorEdit;