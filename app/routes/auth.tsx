import React, { useEffect } from 'react'
import { usePuterStore } from '~/lib/puter';
import { useLocation, useNavigate } from 'react-router';
export const meta = () => ([
    {title: 'CV Optimizer - Auth'},
    {name: "descripcion", content: "Inicia sesión para acceder a tus aplicaciones y puntajes de CV"}
])


const auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location: any = useLocation();
    const next: string = location.search.split ('next=')[1];
    const navigate = useNavigate();

    useEffect (() => {
        if(auth.isAuthenticated) navigate(next);

    },  [auth.isAuthenticated, next])

  return (
    <main className= "bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='gradient-border shadow-lg'>
            <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                <div className='flex flex-col items-center gap-2 text-center'>
                    <h1>Bienvenido</h1>
                    <h2>Ingresa a tu cuenta para continuar tu experiencia en CV Optimizer</h2>
                </div>
                <div>
                    {isLoading ? (
                        <button className="auth-button animate-pulse">
                            <p>Iniciando sesion...</p>
                        </button>
                    ) : (
                        <>
                            {auth.isAuthenticated ? (
                                <button className='auth-button' onClick= {auth.signOut}>
                                    <p>Cerrar Sesion</p>
                                </button>
                            ):(
                                <button className='auth-button' onClick= {auth.signIn}>
                                    <p>Iniciar  Sesion</p>
                                </button>
                            )}
                        </>
                    )}
                </div>
                 

            </section>

        </div>
    </main>
  )
  
}

export default auth
