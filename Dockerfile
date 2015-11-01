FROM openfpgaduino/openfpgaduino
MAINTAINER Zhizhou Li <lzz@meteroi.com>
RUN  apt-get update && apt-get -y upgrade 
RUN rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/OpenFPGAduino/Arduinojs.git
RUN cd Arduinojs; make clean; make
