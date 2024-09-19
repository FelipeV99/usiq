import "./topbar.css"
import Searchbar from '../searchbar/Searchbar'

const Topbar = () => {
  return (
    <div className='topbar-container'>
        <Searchbar />
        <div>
            <p>profile img</p>
        </div>
    </div>
  )
}

export default Topbar