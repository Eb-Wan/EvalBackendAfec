const SkillCard = ({ title, category, level, imgurl, id=undefined }) => {
  return (
    <>
      <div className="card m-4 col-3" style={{width:"18rem"}}>
        <img src={imgurl} style={{objectFit: "cover", width: "100%", aspectRatio: "4/3"}} className="card-img-top" alt="Image d'illustration de compétence" />
        <div className="card-body">
            <h5 className="fs-3 card-title fw-bold">{title}</h5>
            <p className="card-text fw-bold">Catégorie : {category}</p>
            <p className={"card-text fw-bold"  + (level === "Débutant" ? ' text-primary' : (level === "Intermédiaire" ? " text-warning" : (level === "Expert" ? " text-danger" : "")))}
            >Niveau : {level}</p>
            {id ? <><button className="btn m-1 btn-warning fw-bold" onClick={} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Modifier</button><a href="#" className="btn m-1 btn-danger">Supprimer</a></> : ""}
        </div>
      </div>
    </>
  )
}

export default SkillCard