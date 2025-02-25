import React from 'react'

const SkillCard = ({ id, title, category, level, imgurl }) => {
  return (
    <>
      <div className="card col-3 m-4" style={{width:"18rem"}}>
        <img src={imgurl} style={{objectFit: "cover", width: "100%", aspectRatio: "1/1"}} className="card-img-top" alt="Image d'illustration de compétence" />
        <div className="card-body">
            <h5 className="fs-3 card-title">{title}</h5>
            <p className="card-text">Catégorie : {category}</p>
            <p className="card-text">Niveau : {level}</p>
            {id ? <><a href="#" className="btn m-1 btn-warning">Modifier</a><a href="#" className="btn m-1 btn-danger">Supprimer</a></> : ""}
        </div>
      </div>
    </>
  )
}

export default SkillCard