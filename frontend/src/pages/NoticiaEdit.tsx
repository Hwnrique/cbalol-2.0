import { useParams } from "react-router-dom"
import NoticiaForm from "./NoticiaForm"

const NoticiaEdit = () => {
  const { id } = useParams()
  return <NoticiaForm id={id} />
}

export default NoticiaEdit