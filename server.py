import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()
from starlette.staticfiles import StaticFiles
from starlette.responses import PlainTextResponse
from starlette.responses import FileResponse
from starlette.responses import HTMLResponse
import openid.store.filestore
import os 

import pickledb
db = pickledb.load('local.db', True)

@app.get("/")
def read_root():
    with open('index.html','r') as f:
        return HTMLResponse(f.read())

@app.get("/static/{folder}/{filename}")
def static(folder, filename):
    resource =  os.path.join(os.path.join('static',folder),filename)
    return FileResponse(resource)
class Item(BaseModel):
    Modules: dict

@app.post("/workflow/{item_id}")
def update_workflow(item_id: str, data: Item):
    print(data.Modules)
    db['workflow.'+item_id]=data.Modules
    return {"status": "ok"}

@app.get("/workflow/{item_id}")
def get_workflow(item_id: str):
    data = db['workflow.'+item_id]
    return data


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000,reload=True)