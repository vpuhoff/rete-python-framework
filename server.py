import uvicorn
from starlette.applications import Starlette
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles
from starlette.responses import JSONResponse
from starlette.responses import HTMLResponse
from starlette.responses import PlainTextResponse
from starlette.routing import Mount, Route, Router
from starlette.endpoints import HTTPEndpoint
from starlette.requests import Request
from starlette.responses import Response

templates = Jinja2Templates(directory='templates')

app = Starlette(debug=True)

app = Router([
    Mount('/static', StaticFiles(directory='static'), name='static')
])




@app.route("/save",methods=["POST"])
class Save(HTTPEndpoint):
    async def app(scope, receive, send):
        assert scope['type'] == 'http'
        request = Request(scope, receive)
        body = b''
        async for chunk in request.stream():
            body += chunk
        response = Response(body, media_type='text/plain')
        print(body.decode())
        await response(scope, receive, send)
@app.route("/")
class Homepage(HTTPEndpoint):
    async def get(self, request):
        with open('index.html','r') as f:
            return HTMLResponse(f.read())

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)