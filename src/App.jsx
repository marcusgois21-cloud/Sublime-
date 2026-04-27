import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Servicos from './components/Servicos'
import Experiencia from './components/Experiencia'
import Galeria from './components/Galeria'
import Depoimentos from './components/Depoimentos'
import Agendamento from './components/Agendamento'
import Instagram from './components/Instagram'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import './index.css'

export default function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Experiencia />
        <Galeria />
        <Depoimentos />
        <Agendamento />
        <Instagram />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
