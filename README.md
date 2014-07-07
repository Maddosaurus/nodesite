nodesite
========

Node.JS-based video surveillance webapp.

Basic skeleton for a webapp that shows RTSP livestreams via a VLC Player browser plugin (currently, address is hardcoded).  
It can also query a MongoDB GridFS collection for saved MJPEGS, wich then are streamed/played in a seperate div ( [nodesocket](https://github.com/s1gpwr/nodesocket) is needed for this functionality).  


##Getting started
Just run it via ```node server.js```
