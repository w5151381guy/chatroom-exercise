FROM python:3.6 AS build

WORKDIR /app
ADD requirements.txt /app
RUN pip install -r requirements.txt --no-cache-dir

FROM python:3.6-slim

WORKDIR /app
ADD . /app
COPY --from=build /usr/local/lib/python3.6/site-packages /usr/local/lib/python3.6/site-packages

EXPOSE 8000
ENV PYTHONPATH=/usr/local/lib/python3.6/site-packages

RUN python manage.py collectstatic

CMD ["python","manage.py", "runserver", "0.0.0.0:8000"]
