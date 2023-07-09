import dotenv
import os

from fastapi import FastAPI
from .schemas import AnalyseItem
from .model import open_chain
from fastapi.middleware.cors import CORSMiddleware

dotenv.load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/analyse")
def analyse(data:AnalyseItem):
    output = open_chain.run({
        "code" : data.code,
        "language" : data.language
    })
    # print(output)
    return output
