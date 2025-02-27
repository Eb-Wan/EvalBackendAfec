const SkillCard = ({ title, category, level, imgurl, id=undefined, updateSkill, deleteSkill }) => {
  return (
    <>
      <div className="card m-4 col-3" style={{width:"18rem"}}>
        <img src={imgurl} style={{objectFit: "cover", width: "100%", aspectRatio: "4/3"}} className="card-img-top" alt="Image d'illustration de compétence" />
        <div className="card-body">
            <h5 className="fs-3 card-title fw-bold">{title}</h5>
            <p className="card-text fw-bold">Catégorie : {category}</p>
            <p className={"card-text fw-bold"  + (level === "Débutant" ? ' text-primary' : (level === "Intermédiaire" ? " text-warning" : (level === "Expert" ? " text-danger" : "")))}
            >Niveau : {level}</p>
            {
              id ? <>
                <button className="btn m-1 btn-warning fw-bold" onClick={() => updateSkill({ title, category, level, imgurl, id })} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Modifier</button>
                <button className="btn m-1 btn-danger fw-bold" onClick={() => deleteSkill(id)} data-bs-target="#confirmDeleteModal" data-bs-toggle="modal">Supprimer</button>
              </> : ""}
        </div>
      </div>
    </>
  )
}

export default SkillCard