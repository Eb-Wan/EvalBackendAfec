import { useEffect, useState } from 'react';
import SkillCard from '../components/SkillCard';
import apiClient from "../axiosConfig";
import ModalForm from '../components/ModalForm';


const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [listInfo, setListInfo] = useState("");
  const [add, setAdd] = useState(false);

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
        { add ? 
          <ModalForm key="addSkillForm"
            name="addSkill"
            title="Ajouter une compétence"
            onClose={() => setAdd(false)}
            method="post"
            action="/api/skill"
            fields={[
              {name: "title", label: "Titre", type: "text", value: ""},
              {name: "category", label: "Catégorie", type: "text", value: ""},
              {name: "level", label: "Niveau", type: "select", options: [
                {value: "Débutant", label: "Débutant"},
                {value: "Intermédiaire", label: "Intermédiaire"},
                {value: "Expert", label: "Expert"}
              ]},
              {name: "image", label: "Illustration", type: "file", value: ""}
            ]}
          />
          
        : "" }
        
        <button onClick={ () => setAdd(true) } className="btn btn-primary m-5">Ajouter une compétence</button>
      </section>
      <section className='container mx-auto row align-items-start'>
        {listInfo ? <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{listInfo}</p> : ""}
        {skills.map((e) => {
          return <SkillCard key={e._id} title={e.title} category={e.category} level={e.level} imgurl={e.imgurl} id={e._id} />
        })}
      </section>
    </>
  )
}

export default Dashboard