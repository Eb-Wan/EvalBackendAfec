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
  
  const onSubmit = async (data) => {
    try {
      const captchaToken = recaptcha.current.getValue()
      if (!captchaToken) {
        setInfo("Veuillez cocher la case \"Je ne suis pas un robot\"");
        return;
      }
      await apiClient.post("/api/user/login", {...data, captchaToken}, { withCredentials: true });
      navigate("/dashboard");
    } catch (error) {
      const message = (error.response) ? error.response.data.message : error.message;
      setInfo(message);
    }
  }

  return (
    <>
      <form className="w-75 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Email address</label>
          <input {...register("name", {required: "Ce champ est obligatoire"})} type="text" className="form-control" id="nameInput" />
          {errors.name && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.name.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input {...register("password", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="passwordInput" />
          {errors.password && (<p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password.message}</p>)}
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

export default Login