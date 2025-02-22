import apiClient from "../axiosConfig"
import { useForm } from "react-hook-form"
import { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const recaptcha = useRef(null);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()
  
  const onSubmit = (data) => {
    const captchaToken = recaptcha.current.getValue()

    if (!captchaToken) return setInfo("Veuillez cocher la case \"Je ne suis pas un robot\"");
    if (data.password !== data.password2) return setInfo("Les mots de passe ne corespondent pas")

    apiClient.post("/api/user/", {...data, captchaToken}, { withCredentials: true })
    .then(response => navigate("/"))
    .catch ((error) => {
      const message = (error.response) ? error.response.data.message : error.message;
      setInfo(message);
    });
  }

  return (
    <>
      <form className="w-75 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Nom d'utilisateur</label>
          <input {...register("name", {required: "Ce champ est obligatoire"})} type="text" className="form-control" id="nameInput" />
          {errors.name && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.name.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Adresse email</label>
          <input {...register("email", {required: "Ce champ est obligatoire"})} type="email" className="form-control" id="emailInput" />
          {errors.email && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.email.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Mot de passe</label>
          <input {...register("password", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="passwordInput" />
          {errors.password && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput2" className="form-label">Répeter le mot de passe</label>
          <input {...register("password2", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="passwordInput2" />
          {errors.password2 && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password2.message}</p>)}
        </div>
        <ReCAPTCHA className="m-4"
          ref={recaptcha}
          sitekey="6Lcl_NoqAAAAANvSEFCl1nT9LACx4PsfPUkRgXKN"
        />
        {info ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{info}</p> : ""}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Register