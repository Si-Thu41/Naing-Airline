function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 ">
      <div className="container mx-auto text-center flex flex-col gap-2">
        <p>&copy; {new Date().getFullYear()} Naing Co.Ltd. All rights reserved.</p>
        <a href="https://www.flaticon.com/free-icons/flight" title="flight icons">Flight icons created by icon_small - Flaticon</a>
        <a href="mailto:123@example.com" >Contact Us: <span className="underline">123@example.com</span></a>
      </div>
    </footer>
  );
}
export default Footer;