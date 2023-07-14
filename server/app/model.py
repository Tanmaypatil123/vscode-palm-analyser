from langchain.llms.base import LLM
from langchain.llms.utils import enforce_stop_tokens
from langchain.llms import GooglePalm
from langchain import PromptTemplate, HuggingFaceHub, LLMChain
import dotenv
from .prompts import analyse_template , write_template
dotenv.load_dotenv()

code_llm = GooglePalm(temperature=0.7)
prompt_open = PromptTemplate(template=analyse_template, input_variables=["language","code"])

open_chain = LLMChain(prompt=prompt_open,llm = code_llm)