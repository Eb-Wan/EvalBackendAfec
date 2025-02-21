import apiClient from "../axiosConfig"
import { useForm } from "react-hook-form"
import { useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const recaptcha = useRef(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    try {
      const captchaToken = recaptcha.current.getValue()
      await apiClient.post("/api/user/login", {...data, captchaToken}, { withCredentials: true });
      window.location.replace("/");
    } catch (error) {
      const message = (error.password) ? error.password.data.message : error.message;
      setError("password", { message, type: "focus" }, { shouldFocus: true })
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Login