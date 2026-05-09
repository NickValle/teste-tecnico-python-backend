# 🚀 Log de Performance – API de Foco e Produtividade
Esse projeto nasceu de um desafio técnico que eu topei fazer. A ideia era simples: montar uma API que ajudasse a registrar sessões de foco e produtividade, e no final dar um diagnóstico inteligente de como foi o período de trabalho.

Usei FastAPI com Uvicorn porque já curto essa stack, é rápida e prática. Além disso, dei uma brincada e fiz um frontend retro em HTML + TailwindCSS, só pra deixar mais divertido e com aquela vibe nostálgica.

Pra ser sincera, não achei tão complicado — já tinha feito algo parecido quando comecei a estudar Python, então foi mais questão de organizar melhor e caprichar nos detalhes.

## 🛠 O que usei
- Python 3.x

- FastAPI

- Uvicorn

- SQLite (bem simples, só pra guardar os registros)

- HTML + TailwindCSS (frontend com estilo retrô)

<img src="https://github.com/NickValle/teste-tecnico-python-backend/blob/main/tela-principal.png?raw=true"/>

<img src="https://github.com/NickValle/teste-tecnico-python-backend/blob/main/tela-registro.png?raw=true"/>

<img src="https://github.com/NickValle/teste-tecnico-python-backend/blob/main/tela-diagnostico.png?raw=true"/>

## 🚀 Como rodar
Clona o repositório:
```
git clone https://github.com/seu-usuario/log-performance.git
cd log-performance
```
#
Cria o ambiente virtual:
```
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```
#
Instala as dependências:
```
pip install -r dependencies.txt
```
#
Sobe o servidor:
```
uvicorn main:app --reload
```
#
Pronto, o servidor vai estar rodando em:
```
http://127.0.0.1:8000
```
#
## 🎨 Frontend Retro
Além da API, fiz um frontend simples em HTML + TailwindCSS com aquele jeitão retrô. Dá pra registrar sessões e ver o diagnóstico direto na tela.

### 📌 Observações
Esse projeto foi parte de um desafio técnico.

> [!NOTE]
> 📌 Esse projeto foi parte de um desafio técnico.

Usei IA (Copilot) em alguns momentos pra acelerar a escrita de código FRONTEND e documentação.

Foi tranquilo porque já tinha feito algo parecido quando tava começando com Python.