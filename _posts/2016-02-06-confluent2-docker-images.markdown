---
layout: post
title:  Confluent2 docker images
tags:
- confluent.io
- docker
- container
date:   2016-02-06 10:16:23
---
If you want to use the [confluent.io streaming data platform](http://www.confluent.io) docker images for *confluent-2.0.0*, here are some pointers.

### Debian-based
Starting from a [forked github repo](https://github.com/kingcontext/docker-images/tree/master) I pushed the platform images for confluent-2.0.0 to the [docker hub](https://hub.docker.com/u/kingcontext/) with a tag _confluent2_. So there's no need to build them yourself, just use: 

- kingcontext/confluent-platform:confluent2
- kingcontext/confluent-zookeeper:confluent2
- kingcontext/confluent-kafka:confluent2
- kingcontext/confluent-schema-registry:confluent2
- kingcontext/confluent-rest-proxy:confluent2
- kingcontext/confluent-tools:confluent2

Note that I also upgraded the images to use *Java 8*.

### Alpine-based
For those of you that like *minimal container images*, I also created a variant based on [alpine](https://hub.docker.com/_/alpine/). This is again confluent-2.0.0 with Java 8, but it has [kafka connect](http://docs.confluent.io/2.0.0/connect/) removed to further reduce the image size, resulting in images of *223Mb*.

The sources are availabe in the repo [branch _alpine_](https://github.com/kingcontext/docker-images/tree/alpine). Images are pushed to the docker hub with a tag _confluent2-alpine_. So again, no need to build them yourself, just use:

- kingcontext/confluent-platform:confluent2-alpine
- kingcontext/confluent-zookeeper:confluent2-alpine
- kingcontext/confluent-kafka:confluent2-alpine
- kingcontext/confluent-schema-registry:confluent2-alpine
- kingcontext/confluent-rest-proxy:confluent2-alpine
- kingcontext/confluent-tools:confluent2-alpine

Enjoy!
