import { CaretDown, PersonVcard } from "react-bootstrap-icons"
import apiClient from "../axiosConfig"

const Home = () => {

  // apiClient.get("/api/skills/")

  return (
    <>
      <main>

        <section className="p-5 container" style={{background: "center / cover no-repeat url(\"/header-bg.webp\")"}}>
          <div style={{maxWidth:"400px", backgroundColor: "#FFFFFFAA"}} class="card m-4 text-center">
            <div class="fs-3 card-header">
              Bonjour !
            </div>
            <div class="card-body Small shadow">
              <p class="card-text">Bienvenue sur mon portfolio. Je suis John Doe, designer web passionné. Découvrez mes projets et ma vision créative.</p>
              <a href="#projects" class="btn p-2 btn-primary"><CaretDown class="fs-3 bounceAnimation" /></a>
            </div>
            <div class="card-footer text-body-secondary"></div>
          </div>
        </section>

        <section style={{backgroundColor: "#DD4444"}} className="container text-light">
          <div style={{maxWidth:"640px"}} className="mx-auto px-4 py-5 text-center" id="presentation">
            <h1 className="text-decoration-underline"><PersonVcard /> A propos de ma personne</h1>
            <p>
              Passionné par l'informatique dès mon enfance, j'ai commencé la programmation en faisant des jeux vidéos. 
              Après un stage dans une entreprise pour apprendre le dévelopemment web, j'ai décidé de suivre <span className="text-warning fw-bold">une formation en dévelopemment web / web mobile</span>, et de poursuivre mon apprentissage avec un <span className="text-warning fw-bold">CDA en alternance</span>.
              <br /><br />
              Toutes ces experiences m'ont apporté becoup de valeurs, quand je travail sur un site ou une application web, je met toujours un point d'honneur sur <span className="text-warning fw-bold">l'ergonomie, la rapidité, l'accessibilité et le design</span>, afin d'offrir la meiller experience utilisateur!
            </p>
          </div>
        </section>


        <section className="container p-0">
          <hr />
          <div style={{maxWidth:"640px"}} className="mx-auto py-5 text-center" id="projects">
            <h1 className="text-decoration-underline">Mon experience</h1>
            <div style={{height:"50px"}} class="icons w-100 my-5 mx-auto"></div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus voluptates quis nisi rerum sunt nostrum, consectetur magni incidunt dolorum repudiandae dignissimos harum a? Nisi ipsam esse expedita nostrum suscipit rem.</p>
          </div>

          <div className="mx-auto row justify-content-around" >
            <div className="card col-3" style={{width:"18rem"}}>
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Projet 1</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Voir !</a>
              </div>
            </div>

            <div className="card col-3" style={{width:"18rem"}}>
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Projet 1</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Voir !</a>
              </div>
            </div>

            <div className="card col-3" style={{width:"18rem"}}>
              <img src="" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Projet 1</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Voir !</a>
              </div>
            </div>
          </div>
        </section>


        <section className="container">
          <hr />
          {}
        </section>

      </main>
    </>
  )
}

export default Home