import { CaretDown, PersonVcard } from "react-bootstrap-icons"
import apiClient from "../axiosConfig"
import SkillCard from '../components/SkillCard';
import { useEffect, useState } from "react";

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [listInfo, setListInfo] = useState("");

  useEffect(() => {
    apiClient.get("/api/skill/EB-Wan", { withCredentials: true })
    .then(response => setSkills(response.data.skills))
    .catch ((error) => {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      setListInfo(message);
    });
  }, [])

  return (
    <>
      <main>
        <section className="p-5 container" style={{background: "center / cover no-repeat url(\"/header-bg.webp\")"}}>
          <div style={{maxWidth:"400px", backgroundColor: "#FFFFFFAA"}} className="card m-4 text-center">
            <div className="fs-3 card-header">
              Bonjour !
            </div>
            <div className="card-body Small shadow">
              <p className="card-text">Bienvenue sur mon portfolio. Je suis John Doe, designer web passionné. Découvrez mes projets et ma vision créative.</p>
              <a href="#projects" className="btn p-2 btn-primary"><CaretDown className="fs-3 bounceAnimation" /></a>
            </div>
            <div className="card-footer text-body-secondary"></div>
          </div>
        </section>

        <section style={{backgroundColor: "#CC4444"}} className="container text-light">
          <div style={{maxWidth:"640px"}} className="mx-auto px-4 py-5 text-center" id="presentation">
            <h1 className="text-decoration-underline"><PersonVcard /> À propos de moi</h1>
            <p>
              Passionné par l'informatique dès mon enfance, j'ai commencé la programmation en créant des jeux vidéos. 
              Après un stage en entreprise, j'ai décidé de suivre <span className="text-warning fw-bold">une formation en développement web / web mobile</span>, et de poursuivre mon apprentissage en <span className="text-warning fw-bold">CDA</span>.
              <br /><br />
              Toutes ces expériences m'ont renforcé dans mes valeurs. Quand je travaille sur un site ou une application web, je prête toujours une grande attention à <span className="text-warning fw-bold">l'ergonomie, la rapidité, l'accessibilité et le design</span>, afin d'offrir la meilleure expérience utilisateur !
            </p>
          </div>
        </section>


        <section className="container p-0 my-5">
          <hr />
          <div style={{maxWidth:"640px"}} className="mx-auto py-5 text-center" id="projects">
            <h1 className="text-decoration-underline">Mon expérience</h1>
            <div style={{height:"50px"}} className="icons w-100 my-5 mx-auto"></div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus voluptates quis nisi rerum sunt nostrum, consectetur magni incidunt dolorum repudiandae dignissimos harum a? Nisi ipsam esse expedita nostrum suscipit rem.</p>
          </div>

          <div className="d-flex flex-wrap justify-content-center" >
            <div className="card m-4" style={{width:"18rem"}}>
              <img src="Projet1.png" style={{objectFit: "cover", width: "100%", aspectRatio: "16/9"}} className="card-img-top" alt="Image d'illustration du projet" />
              <div className="card-body">
                <h5 className="card-title">Projet 1</h5>
                <p className="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus omnis, eos magni suscipit quas magnam maiores sequi hic sit voluptatem!</p>
              </div>
              <div className="card-footer text-body-secondary"><a href="#" className="d-block w-50 btn mx-auto btn-primary">Voir !</a></div>
            </div>

            <div className="card m-4" style={{width:"18rem"}}>
              <img src="HideThePainHarold.jpg" style={{objectFit: "cover", width: "100%", aspectRatio: "16/9"}} className="card-img-top" alt="Image d'illustration du projet" />
              <div className="card-body">
                <h5 className="card-title">Projet 2</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quas eligendi animi hic facere eaque, in, optio blanditiis placeat accusamus eveniet.</p>
              </div>
              <div className="card-footer text-body-secondary"><a href="#" className="d-block w-50 btn mx-auto btn-primary">Voir !</a></div>
            </div>

            <div className="card m-4" style={{width:"18rem"}}>
              <img src="JEEEEEP.png" style={{objectFit: "cover", width: "100%", aspectRatio: "16/9"}} className="card-img-top" alt="Image d'illustration du projet" />
              <div className="card-body">
                <h5 className="card-title">Projet 3</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis ea placeat facilis repellendus voluptatibus?</p>
              </div>
              <div className="card-footer text-body-secondary"><a href="#" className="d-block w-50 btn mx-auto btn-primary">Voir !</a></div>
            </div>
          </div>
        </section>


        <section className='container mx-auto'>
          <hr />
          <div className="text-center my-4">
            <h1>Mes compétences</h1>
            <h2 className="fs-4">sont les suivantes</h2>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {listInfo ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{listInfo}</p> : ""}
            {skills.map((e) => <SkillCard key={e._id} title={e.title} category={e.category} level={e.level} imgurl={e.imgurl}/>)}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home