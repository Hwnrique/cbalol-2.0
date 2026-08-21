import MVP from './MVP'
import PreviousGames from './PreviousGames'

const PlayerAndGames = () => {
  return (
    <div className='lg:mt-10 flex flex-col lg:flex-grow lg:w-1/2 px-4 lg:px-0 mx-auto'>
      <div className='w-full'>
        <MVP />
      </div>
      <div className='w-full mt-4'>
        <PreviousGames />
      </div>
    </div>
  )
}

export default PlayerAndGames