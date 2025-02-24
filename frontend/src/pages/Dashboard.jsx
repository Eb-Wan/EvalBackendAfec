import { useState } from 'react'
import apiClient from '../axiosConfig'

const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  return (
    <>
      <section className='container'>
        {/* tile, category, level, image */}
        <div style={{minHeight: "calc(100vh - 262px)"}}>
          <form style={{maxWidth:"400px"}} className="w-75 p-5 border rounded mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
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
            {info ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{info}</p> : ""}
            <button className="d-block w-50 my-5 mx-auto btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </section>
      <section className='container'>
        {skills}
      </section>
    </>
  )
}

export default Dashboard