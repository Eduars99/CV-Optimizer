export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume-01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume-02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume-03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //máximo 100
      ATS: {
        score: number; //calificar basado en la compatibilidad con ATS
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //dar 3-4 consejos
        }[];
      };
      toneAndStyle: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      content: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      structure: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      skills: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `Eres un experto en ATS (Applicant Tracking System) y en análisis de currículums.
Por favor analiza y califica este currículum y sugiere cómo mejorarlo.
La calificación puede ser baja si el currículum es débil.
Sé exhaustivo y detallado. No tengas miedo de señalar cualquier error o área de mejora.
Si hay muchos aspectos por mejorar, no dudes en asignar puntuaciones bajas. El objetivo es ayudar al usuario a mejorar su currículum.
Si está disponible, utiliza la descripción del puesto al que el usuario está aplicando para proporcionar una retroalimentación más específica y personalizada.
Si se proporciona, toma en cuenta la descripción del puesto.
El título del puesto es: ${jobTitle}
La descripción del puesto es: ${jobDescription}
Proporciona la retroalimentación utilizando el siguiente formato: interface Feedback {
      overallScore: number; //máximo 100
      ATS: {
        score: number; //calificar basado en la compatibilidad con ATS
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //dar 3-4 consejos
        }[];
      };
      toneAndStyle: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      content: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      structure: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      skills: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorable";
          tip: string; //que sea un "título" corto para la explicación real
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
    }
Devuelve el análisis como un objeto JSON únicamente, sin ningún otro texto y sin los backticks.
No incluyas ningún otro texto ni comentarios.`;