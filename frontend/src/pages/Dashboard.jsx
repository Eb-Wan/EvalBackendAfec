import { useEffect, useState } from 'react'
import apiClient from '../axiosConfig'
import { useForm } from 'react-hook-form';
import SkillCard from '../components/SkillCard';
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
//function here for delete and update

  const [skills, setSkills] = useState([]);
  const [info, setInfo] = useState("");
  const [listInfo, setListInfo] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm()
  
  const onSubmit = (data) => {
    if (data.image.length !== 1) return setInfo("Vous ne pouvez téléverser qu'une seule image.");
    const file = data.image[0];    
    if (file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/gif" && file.type != "image/bmp" && file.type != "image/webp") {
      setInfo("PNG, JPEG, GIF, BMP et WEBP sonts les seuls formats acceptées.");
      return;
    }

    data.image = file;

    apiClient.post("/api/skill/", data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }})
    .then(response => {
      navigate(0);
    })
    .catch ((error) => {
      const message = (error.response) ? error.response.data.message : error.message;
      setInfo(message);
    });
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
        <button className="btn btn-primary m-5" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Ajouter une compétence</button>
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Ajouter une compétence</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

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
                  <input {...register("image", {required: "Ce champ est obligatoire"})} accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" className="form-control" type="file" id="formFile" />
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
        {skills.map(e => SkillCard({ title: e.title, category: e.category, level: e.level, imgurl: e.imgurl, id: e._id }))}
      </section>
    </>
  )
}

export default Dashboard