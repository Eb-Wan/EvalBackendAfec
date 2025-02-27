import { useEffect, useState } from 'react'
import apiClient from '../axiosConfig'
import { useForm } from 'react-hook-form';
import SkillCard from '../components/SkillCard';
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [info, setInfo] = useState("");
  const [deleteInfo, setDeleteInfo] = useState("");
  const [listInfo, setListInfo] = useState("");
  const [formMethod, setFormMethod] = useState("post");
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {

    if (formMethod === "post" && data.image.length === 0) return setInfo("Veuillez ajouter une image d'illustration");
    else if (data.image.length > 1) return setInfo("Vous ne pouvez téléverser qu'une seule image.");
    else {
      const file = data.image[0];    
      if (file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/gif" && file.type != "image/bmp" && file.type != "image/webp") {
        setInfo("PNG, JPEG, GIF, BMP et WEBP sonts les seuls formats acceptées.");
        return;
      }
      data.image = file;
    }

    try {
      if (formMethod === "post") await apiClient.post(route, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
      if (formMethod === "put") await apiClient.put(route, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
      if (formMethod === "delete") await apiClient.delete(route + data.id, { withCredentials: true });
      else throw new Error("Méthode invalide")
      navigate(0);
    } catch (error) {
      const message = (error.response) ? error.response.data.message : error.message;
      setInfo(message);
    }

  }
  
  const updateSkill = (data) => {
    setValue("title", data.title);
    setValue("category", data.category);
    setValue("level", data.level);
    setValue("id", data.id);
    setFormMethod("put");
  }
  const deleteSkill = (id) => {
    setValue("id", data.id);
    setFormMethod("put");
  }

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
      <section className='container'>
        <div className="modal fade" id="confirmDeleteModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Confirmer</h1>
                <button onClick={() => reset()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input {...register("id")} type="hidden" id="idInput" />
                <h2>Etes vous sûr de vouloir supprimer cet élément ?</h2>
                {deleteInfo ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{deleteInfo}</p> : ""}
              </div>
              <div className="modal-footer">
                <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Supprimer</button>
                <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Annuler</button>
              </div>
            </form>
          </div>
        </div>
        <button onClick={ () => setFormMethod("post") } className="btn btn-primary m-5" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Ajouter une compétence</button>
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                  {formMethod === "post" ? "Ajouter une compétence" : (formMethod === "put" ? "Modifier une compétence" : "Méthode invalide")}
                </h1>
                <button onClick={() => reset()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <input {...register("id")} type="hidden" id="idInput" />
                <div className="mb-3">
                  <label htmlFor="titleInput" className="form-label">Titre</label>
                  <input {...register("title", {required: "Ce champ est obligatoire"})} type="text" className="form-control" id="titleInput" />
                  {errors.title && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.title.message}</p>)}
                </div>
                <div className="mb-3">
                  <label htmlFor="categoryInput" className="form-label">Categorie</label>
                  <input {...register("category", {required: "Ce champ est obligatoire"})} type="text" className="form-control" id="categoryInput" />
                  {errors.category && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.category.message}</p>)}
                </div>
                <div className="mb-3">
                  <label htmlFor="levelSelect" className="form-label">Niveau</label>
                  <select {...register("level", {required: "Ce champ est obligatoire"})} id="levelSelect" className="form-select">
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Illustration</label>
                  <input {...register("image")} accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" className="form-control" type="file" id="formFile" />
                </div>

                {info ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{info}</p> : ""}
              </div>
              <div className="modal-footer">
                <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className='container mx-auto row align-items-start'>
        {listInfo ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{listInfo}</p> : ""}
        {skills.map((e) => {
          return <SkillCard key={e._id} title={e.title} category={e.category} level={e.level} imgurl={e.imgurl} id={e._id} updateSkill={updateSkill} deleteSkill={deleteSkill}/>
        })}
      </section>
    </>
  )
}

export default Dashboard