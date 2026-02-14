import React from 'react'
import Navbar from "~/components/Navbar";
import type { FormEvent } from 'react';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdf-to-image';
import { generateUUID } from '~/lib/utils';
import {prepareInstructions} from "../../constants";



const Upload = () => {
    const {auth, fs, isLoading, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [statusMessage, setStatusMessage] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}:{companyName: string, jobTitle: string, jobDescription: string, file: File | null}) => {
        setIsProcessing(true);
        setStatusMessage("Analizando CV...");

        if (!file) {
        setStatusMessage("Por favor selecciona un archivo");
        setIsProcessing(false);
        return;
    }
        const uploadedFile =  await fs.upload([file]);

        if(!uploadedFile) return setStatusMessage("Error al subir el archivo");

        setStatusMessage("Conviertiendo a imagen...");
        const imageFile = await convertPdfToImage(file);

        if(!imageFile.file) return setStatusMessage("Error al convertir el archivo a imagen");
        
        setStatusMessage("Subiendo imagen...");
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusMessage("Error al subir la imagen");

        setStatusMessage("Generando feedback...");

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume-feedback-${uuid}`, JSON.stringify(data));
        setStatusMessage('Analizando CV con IA...');

        const feedback = await ai.feedback(
            uploadedFile.path,
             prepareInstructions({jobTitle, jobDescription, AIResponseFormat: 'json'})
        )
        if(!feedback) return setStatusMessage("Error al generar feedback");
        const feedbackText = typeof feedback.message.content === "string" 
            ? feedback.message.content
            :  feedback.message.content[0].text;
            data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume-feedback-${uuid}`, JSON.stringify(data));
        setStatusMessage("Análisis completo!");
        console.log(data);

    }

    const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get("company-name") as string;
        const jobTitle = formData.get("job-title") as string;
        const jobDescription = formData.get("job-description") as string;

        console.log({companyName, jobTitle, jobDescription, file});

        if(!file) return;
        handleAnalyze({companyName, jobTitle, jobDescription, file});
    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
        <section className="main-section"> 
            <div className = "page-heading py-16">
                <h1>Retroalimentación de IA para tu trabajo soñado</h1>
                {isProcessing ? (
                    <>
                        <h2>{statusMessage}</h2>
                        <img src="/images/resume-scan.gif" className ="w-full"/>
                    </>
                ): (
                    <h2>Sube tu CV para recibir retroalimentación personalizada</h2>
                )}
                {!isProcessing && (
                    <form id="upload-form" onSubmit ={handleSubmit} className='flex flex-col gap-4 mt-8'>
                        <div className ="form-div">
                            <label htmlFor="company-name">Nombre de la Empresa</label>
                            <input type="text" name="company=name" placeholder='Nombre de la Compañia' id='company-name'></input>
                        </div>
                        <div className ="form-div">
                            <label htmlFor="job-title">Puesto de Trabajo</label>
                            <input type="text" name="job-title" placeholder='Puesto de Trabajo' id='job-title'></input>
                        </div>
                        <div className ="form-div">
                            <label htmlFor="job-description">Descripción del Puesto</label>
                            <textarea rows={5} name="job-description" placeholder='Descripción del Puesto' id='job-description'></textarea>
                        </div>
                        <div className ="form-div">
                            <label htmlFor="uploader">Subir Cv</label>
                            <FileUploader onFileSelect={handleFileSelect}/>

                        </div>
                        <button type="submit" className='primary-button mt-4'>
                            Analizar CV                        
                        </button>    
                        
                    </form>
                )}

            </div>
        </section>

    </main>
  )
}

export default Upload
