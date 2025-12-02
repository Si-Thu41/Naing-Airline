import Header from "../components/Header";
import Footer from "../components/Footer";

function Promotion() {
  return <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow-1 py-10 bg-gray-100">
        <h1 className="text-4xl font-bold p-4 text-center">Promotions</h1>
        <div className="grid grid-cols-3 gap-4 px-10">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <img src="Singapore.jpg" className=""/>
                <h1 className="my-3 text-xl font-bold px-2">Promotion Title</h1>
                <p className="p-2">Promotion goes here</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <img src="Singapore.jpg" className=""/>
                <h1 className="my-3 text-xl font-bold px-2">Promotion Title</h1>
                <p className="p-2">Promotion goes here</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <img src="Singapore.jpg" className=""/>
                <h1 className="my-2 text-xl font-bold px-2">Promotion Title</h1>
                <p className="p-2">Promotion goes here</p>
            </div>
        </div>
    </main>
    <Footer />
  </div>;
}
export default Promotion;