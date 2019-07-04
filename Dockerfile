FROM ems-gui-base:latest

COPY requirements-optional.txt requirements-optional.txt
RUN venv/bin/pip install -r requirements-optional.txt


COPY app app
COPY boot.sh ./
RUN chmod +x boot.sh

USER serviceuser

EXPOSE 8000
ENTRYPOINT ["./boot.sh"]

LABEL version="0.0.1-beta"