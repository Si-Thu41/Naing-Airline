import { useNavigate } from "react-router";

function Header(){
    const navigate = useNavigate();

    return(<>
   
    <nav className="text-left pt-[10px] pl-[20px] mb-[10px] ">
       <img src="naing-high-resolution-logo-transparent.png" alt="Logo" className="w-[100px] inline" onClick={() => navigate("/")}/>
      <span className="font-Arial hover:border-b-2 border-orange-700 pb-[10px] pr-[30px] pl-[30px] pt-[10px] cursor-pointer">Plan Trip</span>
      <span className="font-Arial hover:border-b-2 border-orange-700 pb-[10px] pr-[30px] pl-[30px] pt-[10px] cursor-pointer">Travel Info</span>
      <span className="font-Arial hover:border-b-2 border-orange-700 pb-[10px] pr-[30px] pl-[30px] pt-[10px] cursor-pointer">Experiences</span>
      <span className="font-Arial hover:border-b-2 border-orange-700 pb-[10px] pr-[30px] pl-[30px] pt-[10px] cursor-pointer">Promotions</span>
    </nav>

    </>)
}

export default Header;