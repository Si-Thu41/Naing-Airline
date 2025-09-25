function CityPhoto(props) {
  return (
    <div className="">
      <img src={props.img} alt="City" className="" />
      <h3 >{props.cityName}</h3>
    </div>
  );
}