import { useParams } from "react-router-dom"
import MVPForm from "./MVPForm"

const MVPEdit = () => {
  const { id } = useParams()
  return <MVPForm id={id} />
}

export default MVPEdit