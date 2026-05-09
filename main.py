from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import statistics
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de foco e produtividade")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://127.0.0.1:5500"] se usar Live Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegistroFoco(BaseModel):
    nivel_foco: int = Field(..., ge=1, le=5)
    tempo_minutos: int = Field(..., gt=0)
    comentario: Optional[str] = None
    categoria: Optional[str] = None
    tags: Optional[List[str]] = None

registros: List[RegistroFoco] = []

@app.post("/registro_foco")
def registrar_foco(registro: RegistroFoco):
    registros.append(registro)
    return {
        "mensagem": "registro salvo",
        "total_registros": len(registros)
    }

@app.get("/diagnostico-produtividade")
def diagnostico():
    if not registros:
        raise HTTPException(status_code=404, detail="Nenhum registro de foco encontrado")

    media_foco = statistics.mean([r.nivel_foco for r in registros])
    tempo_total = sum(r.tempo_minutos for r in registros)

    if media_foco < 2:
        feedback = "ta dormindo em servico, bora acordar e focar mais!"
    elif media_foco < 3:
        feedback = "ta indo, mas pode melhorar, bora focar mais!"
    else:
        feedback = "ta voando, continue assim!"

    return {
        "media_nivel_foco": round(media_foco, 2),
        "tempo_total_minutos": tempo_total,
        "feedback": feedback
    }
