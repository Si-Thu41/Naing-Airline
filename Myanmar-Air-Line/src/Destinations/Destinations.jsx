import {useLocation,useNavigate} from 'react-router-dom'

function Destinations({image}) {
    const navigate = useNavigate();

    return(<div className="relative h-max w-full cursor-pointer" onClick={() => navigate(`/destinations`, { state: { cityName: image.cityName } }) }>
        <h1 className="text-shadow-lg/50 text-white text-2xl font-bold absolute left-[20%] top-[80%] translate-x-[-50%] translate-y-[-50%] z-10">{image.cityName}</h1>
        <img src={image.photoUrl} alt={image.cityName} className="w-80 h-50 rounded-2xl hover:brightness-[0.7] inline" />
    </div>)
}
export default Destinations;