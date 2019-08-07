FROM python:3.6-alpine

RUN adduser -D serviceuser

WORKDIR /home/serviceuser

RUN chown -R serviceuser:serviceuser ./

RUN apk update
RUN apk add gcc python3-dev musl-dev make
RUN apk add libffi-dev openssl-dev

RUN python -m venv venv

COPY requirements-main.txt requirements-main.txt
RUN venv/bin/pip install -r requirements-main.txt
RUN venv/bin/pip install --upgrade pip

RUN apk add --no-cache --virtual .build-deps \
    gcc \
    python3-dev \
    musl-dev \
    postgresql-dev \
    && pip install --no-cache-dir psycopg2 \
    && apk del --no-cache .build-deps


LABEL version="0.0.3-base"