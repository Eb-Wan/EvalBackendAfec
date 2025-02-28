import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";
import Spinner from "./Spinner";

const ModalForm = ({ name, title, message, onClose, method, action, fields }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const { register, handleSubmit } = useForm();
  const [isWaiting, setWaiting] = useState(false);
  
  name = name+"ModalForm";

  const onSubmit = async (data) => {
    
    if (data.image){
      if (method === "post" && data.image.length === 0) return setInfo("Veuillez ajouter une image d'illustration");
      if (data.image.length > 1) return setInfo("Vous ne pouvez téléverser qu'une seule image.");
      if (data.image.length !== 0){
        const file = data.image[0];    
        if (file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/gif" && file.type != "image/bmp" && file.type != "image/webp") {
          return setInfo("PNG, JPEG, GIF, BMP et WEBP sonts les seuls formats acceptées.");
        }
        data.image = file;
      }
    }
    
    try {
      setWaiting(true);
      if (method === "post") await apiClient.post(action, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
      else if (method === "put") await apiClient.put(action, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
      else if (method === "delete") await apiClient.delete(action, { withCredentials: true });
      else throw new Error("Méthode invalide");
      onClose();
      navigate(0);
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : error.message;
      console.error(error);
      setInfo(errorMessage);
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
            <p>{message}</p>
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
                      <label key={ field.name + "Label" }  htmlFor={ field.name + "Input" } className="form-label">Niveau</label>
                      <select key={ field.name + "Select" } {...register(field.name, { value: field.value })} type={ field.type } id={ field.name + "Input" } className='form-select'>
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
            {
              isWaiting ? <Spinner /> :
              <>
                <button onClick={onClose} className="w-25 mx-2 btn btn-secondary" type="button">Annuler</button>
                {(() => {
                  if (method === "post") return <button className="w-25 mx-2 btn btn-primary" type="submit">Ajouter</button>;
                  else if (method === "put") return <button className="w-25 mx-2 btn btn-primary" type="submit">Modifer</button>;
                  else if (method === "delete") return <button className="w-25 mx-2 btn btn-danger" type="submit">Supprimer</button>;
                  else return <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Confirmer</button>;
                })()}
              </>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalForm;