import apiClient from "../axiosConfig"
import {useForm} from "react-hook-form"
const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/api/user/login", data);
      alert("success", response.data);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.name && (<p>errors.name.message</p>)}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input {...register("email", {required: "Ce champ est obligatoire"})} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input {...register("password", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Login