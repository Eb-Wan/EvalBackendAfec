import apiClient from "../axiosConfig"
import { useForm } from "react-hook-form"
import { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    if (!captchaToken) {
      setInfo("Veuillez cocher la case \"Je ne suis pas un robot\"");
      return;
    }

    apiClient.post("/api/user/login", {...data, captchaToken}, { withCredentials: true })
    .then(response => navigate("/"))
    .catch ((error) => {
      const message = (error.response) ? error.response.data.message : error.message;
      setInfo(message);
    });
  }

  return (
    <>
      <div style={{minHeight: "calc(100vh - 262px)"}}>
        <form style={{maxWidth:"400px"}} className="p-5 border rounded mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Nom d'utilisateur ou adresse email</label>
            <input {...register("name", {required: "Ce champ est obligatoire"})} type="text" className="form-control" id="nameInput" />
            {errors.name && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.name.message}</p>)}
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Mot de passe</label>
            <input {...register("password", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="passwordInput" />
            {errors.password && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password.message}</p>)}
          </div>
          <ReCAPTCHA className="mx-auto my-4"
            ref = { recaptcha }
            sitekey = { import.meta.env.VITE_CAPTCHA_SITE }
          />
          {info ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{info}</p> : ""}
          <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Se connecter</button>
        </form>
      </div>
    </>
  )
}

export default Login