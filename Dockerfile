FROM python:3.6-alpine

RUN adduser -D serviceuser

WORKDIR /home/serviceuser

RUN chown -R serviceuser:serviceuser ./

RUN apk update
RUN apk add gcc python3-dev musl-dev make

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt


COPY app app
COPY boot.sh ./
RUN chmod +x boot.sh


USER serviceuser

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]

LABEL version="0.0.1-beta"