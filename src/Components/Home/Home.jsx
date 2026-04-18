
import Nav from '../Navbar/nav.jsx'
import About from '../About/about.jsx'
import Education from '../Education/Education.jsx'
import Skills from '../Skill/Skill.jsx'
import BlogList from '../../Pages/blogs/blogList.jsx'
import Footer from '../Footer/Footer.jsx'
import Contact from '../Contacts/Contact.jsx'


const Home = () => {
  return (
    <div>
       <div className="bg-[#050414]">


      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative pt-20">
      <Nav />
      <About />
      <Education />
      <Skills />
      <BlogList />
      <Contact></Contact>
      <Footer></Footer>
      </div>
      </div>
    </div>
  )
}

export default Home