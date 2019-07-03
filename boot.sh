#!/bin/sh
source venv/bin/activate
exec uvicorn --port 5000  server:app