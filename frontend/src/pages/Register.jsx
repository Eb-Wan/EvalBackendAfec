import apiClient from "../axiosConfig"
import { useForm } from "react-hook-form"
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Captcha from "../components/Captcha";

const Register = () => {
  const recaptcha = useRef(null);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const [isWaiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    const captchaToken = recaptcha.current.getValue();
    if (!captchaToken) return setInfo("Veuillez cocher la case \"Je ne suis pas un robot\"");
    if (data.password !== data.password2) return setInfo("Les mots de passe ne corespondent pas");

    try {
      setWaiting(true);
      await apiClient.post("/api/user/", {...data, captchaToken}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      console.error(error);
      setInfo(message);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <>
      <form style={{maxWidth:"400px"}} className="shadow p-5 border rounded mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
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
        <Captcha recaptcha={recaptcha} />
        {info ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{info}</p> : ""}
        {isWaiting ? <Spinner className="d-block my-5 mx-auto" /> : <button type="submit" className="d-block w-50 my-5 mx-auto btn btn-primary">S'inscrire</button>}
      </form>
    </>
  )
}

export default Register