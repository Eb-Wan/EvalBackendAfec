import { useState } from "react";
import ModalForm from "./ModalForm";

const SkillCard = ({ title, category, level, imgurl, id=undefined, deleteSkill }) => {
  const [edit, setEdit] = useState(false);
  const [remove, setDelete] = useState(false);

  return (
    <>
      { edit ?
        <ModalForm key={id}
          name="editSkill"
          title="Modifier une compétence"
          onClose={() => setEdit(false)}
          method="put"
          action="/api/skill"
          fields={[
            {name: "title", label: "Titre", type: "text", value: title},
            {name: "category", label: "Catégorie", type: "text", value: category},
            {name: "level", label: "Niveau", type: "text", value: level},
            {name: "image", label: "Illustration", type: "file", value: ""},
            {name: "id", label: "", type: "hidden", value: id}
          ]}/>
        : "" }{ remove ?
          <ModalForm key={id}
            name="deleteSkill"
            title="Supprimer une compétence"
            onClose={() => setDelete(false)}
            method="delete"
            action="/api/skill"
            fields={[
              {name: "id", label: "", type: "hidden", value: id}
            ]}/>
          : "" }
      
      <div className="card m-4 col-3" style={{width:"18rem"}}>
        <img src={imgurl} style={{objectFit: "cover", width: "100%", aspectRatio: "4/3"}} className="card-img-top" alt="Image d'illustration de compétence" />
        <div className="card-body">
            <h5 className="fs-3 card-title fw-bold">{title}</h5>
            <p className="card-text fw-bold">Catégorie : {category}</p>
            <p className={"card-text fw-bold"  + (level === "Débutant" ? ' text-primary' : (level === "Intermédiaire" ? " text-warning" : (level === "Expert" ? " text-danger" : "")))}
            >Niveau : {level}</p>
            {
              id ? <>
                <button className="btn m-1 btn-warning fw-bold" onClick={() => setEdit(true)}>Modifier</button>
                <button className="btn m-1 btn-danger fw-bold" onClick={() => deleteSkill(id)} data-bs-target="#confirmDeleteModal" data-bs-toggle="modal">Supprimer</button>
              </> : ""
            }
        </div>
      </div>
    </>
  )
}

export default SkillCard