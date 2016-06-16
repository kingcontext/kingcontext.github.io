---
layout: post
title:  Confluent3 alpine-based docker images
tags:
- confluent.io
- docker
- container
date:   2016-06-16 10:16:23
---
Just a quick note to communicate the availability of the [confluent.io streaming data platform](http://www.confluent.io) 
alpine-based docker images for *confluent-3.0.0*.

The sources are availabe in the repo [branch _alpine_](https://github.com/kingcontext/docker-images/tree/alpine). The images are pushed to the docker hub with a tag _confluent3-alpine-min_. No need to build them yourself, just use:

- kingcontext/confluent-platform:confluent3-alpine-min
- kingcontext/confluent-zookeeper:confluent3-alpine-min
- kingcontext/confluent-kafka:confluent3-alpine-min
- kingcontext/confluent-schema-registry:confluent3-alpine-min
- kingcontext/confluent-rest-proxy:confluent3-alpine-min
- kingcontext/confluent-tools:confluent3-alpine-min

Enjoy!
