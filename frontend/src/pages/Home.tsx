import { useQuery } from "@tanstack/react-query"
import api from "../services/api"
import Loading from "../components/Loading"
import NewsSlider from "../components/NewSlider"
import TeamSlider from "../components/TeamSlider"
import Partidas from "../components/Partidas"
import MoreNews from "../components/MoreNews"
import PlayerAndGames from "../components/PlayerAndGames"

const Home = () => {

  const { data: noticias, isLoading } = useQuery({
    queryKey: ["noticias"],
    queryFn: () => api.get("/notice").then(res => res.data)
  })

  if (isLoading) return <Loading />

  const ordened = [...(noticias ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const slideNews = ordened.slice(0, 5)
  const gridNews = ordened.slice(5, 9)

  return (
    <div>
      <NewsSlider news={slideNews}/>
      <Partidas />
      <TeamSlider />
      <PlayerAndGames />
      <MoreNews news={gridNews}/>
    </div>
  )
}

export default Home