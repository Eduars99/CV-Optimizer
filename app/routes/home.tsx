import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import  {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import React, { useEffect } from 'react'
import { usePuterStore } from '~/lib/puter';
import { useLocation, useNavigate } from 'react-router';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "CV Optimizer" },
    { name: "description", content: "Retroalimentacion Inteligente para tu trabajo soñado" },
  ];
}

export default function Home() {

    const {auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect (() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');

    },  [auth.isAuthenticated])
  return <><main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    

    <><section className="main-section">
      <div className="page-heading py-16">
        <h1> Ve tus aplicaciones y Puntajes de CV </h1>
        <h2> Analiza tus aplicaciones y mejora tu CV con AI para conseguir el trabajo de tus sueños </h2>

      </div>
        {resumes.length >0 &&(
          <div className="resumes-section">
          {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />

        ))}

        </div>
        )}
      </section></>
      
      
    </main></>
}
