import Header from '../Components/Header'
import Footer from '../Components/Footer'
import HeroImage from '../assets/hero img.png'

export default function Home(){
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <section className="max-h-7xl mx-auto py-4">
                {/*<img src={HeroImage} alt="" className="md:max-h-6xl"/>*/}
            </section>
            <section>

            </section>
            <section>

            </section>
            <Footer/>
        </div>
    )
}