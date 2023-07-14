from pydantic import BaseModel

class AnalyseItem(BaseModel):
    code : str
    language : str
