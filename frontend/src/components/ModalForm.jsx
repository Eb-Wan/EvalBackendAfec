import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";
import Spinner from "./Spinner";

const ModalForm = ({ name, title, onClose, method, action, fields }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const { register, handleSubmit } = useForm();
  const [isWaiting, setWaiting] = useState(false);
  
  name = name+"ModalForm";

  const onSubmit = async (data) => {
    setWaiting(true);

    if (method === "post" && data.image.length === 0) return setInfo("Veuillez ajouter une image d'illustration");
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
      if (method === "post") await apiClient.post(action, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
      else if (method === "put") await apiClient.put(action, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
      else if (method === "delete") await apiClient.delete(action, { withCredentials: true });
      else throw new Error("Méthode invalide");
      navigate(0);
    } catch (error) {
      const message = (error.response) ? error.response.data.message : error.message;
      setInfo(message);
    }
    finally {
      setWaiting(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      document.getElementById(name).style.display = 'block';
      document.getElementById(name).classList.add("show");
    }, 10);
  }, [name]);



  return (
    <div className="modal fade" id={name}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {title}
            </h1>
            <button onClick={onClose} type="button" className="btn-close" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {
              fields.map((field) => {
                if (field.type === "text") {
                  return(
                    <><div key={ field.name + "Div" } className="mb-3">
                      <label key={ field.name + "Label" } htmlFor={ field.name + "Input" } className="form-label">{ field.label }</label>
                      <input key={ field.name + "Input" } {...register(field.name, { value: field.value })} type={ field.type } className="form-control" id={ field.name + "Input" } />
                    </div></>
                  );
                } else if (field.type === "file") {
                  return(
                    <><div key={ field.name + "Div" } className="mb-3">
                      <label key={ field.name + "Label" } htmlFor={ field.name + "Input" } className="form-label">{ field.label }</label>
                      <input key={ field.name + "Input" } {...register(field.name, { value: field.value })} accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" type={ field.type } className="form-control" id={ field.name + "Input" } />
                    </div></>
                  );
                } else if (field.type === "hidden") {
                  return(<><input key={ field.name + "Input" } {...register(field.name, { value: field.value })} type={ field.type } id={ field.name + "Input" } /></>);
                } else if (field.type === "select") {
                  return(
                    <><div key={ field.name + "Div" } className="mb-3">
                      <label htmlFor={ field.name + "Input" } className="form-label">Niveau</label>
                      <select key={ field.name + "Input" } {...register(field.name, { value: field.value })} type={ field.type } id={ field.name + "Input" } className='form-select'>
                        {field.options.map((fieldOption) => (<><option key={ field.name+ fieldOption.value + "Option" } value={fieldOption.value}>{fieldOption.label}</option></>))}
                      </select>
                    </div></>
                  );
                }
              })
            }
          </div>
          {info ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{info}</p> : ""}
          <div className="modal-footer align-items-end">
            <button onClick={onClose} className="w-25 mx-2 btn btn-secondary" type="button">Annuler</button>
            {
              isWaiting ? <Spinner /> :
              <>{(() => {
                if (method === "post") return <button className="w-25 mx-2 btn btn-primary" type="submit">Ajouter</button>;
                else if (method === "put") return <button className="w-25 mx-2 btn btn-primary" type="submit">Modifer</button>;
                else if (method === "delete") return <button className="d-block w-25 m-3 mx-auto btn btn-danger" type="submit">Supprimer</button>;
                else return <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Confirmer</button>;
              })()}</>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalForm



            // <input {...register("id")} type="hidden" id="idInput" />
            // <div className="mb-3">
            //   <label htmlFor="levelSelect" className="form-label">Niveau</label>
            //   <select {...register("level", {required: "Ce champ est obligatoire"})} id="levelSelect" className="form-select">
            //     <option value="Débutant">Débutant</option>
            //     <option value="Intermédiaire">Intermédiaire</option>
            //     <option value="Expert">Expert</option>
            //   </select>
            // </div>
            // <div className="mb-3">
            //   <label htmlFor="formFile" className="form-label">Illustration</label>
            //   <input {...register("image")} accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" className="form-control" type="file" id="formFile" />
            // </div>

            // 