FROM tensorflow/tensorflow:1.14.0-gpu-py3


RUN pip install bert-serving-server
RUN mkdir /app/

COPY bert_server.py /app/
COPY cased_L-12_H-768_A-12 /app/cased_L-12_H-768_A-12

EXPOSE 5555
EXPOSE 5556

WORKDIR /app
CMD python bert_server.py