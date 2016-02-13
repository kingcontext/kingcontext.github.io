---
layout: post
title: Connect Kafka to HDFS
tags:
- confluent.io
- streaming data platform
- data
- apache kafka
- kafka connect
- hdfs
- analytics
date: 2016-02-13 13:33:12
---
Recently I've been playing with the [Kafka Connect HDFS Connector](http://docs.confluent.io/2.0.0/connect/connect-hdfs/docs/index.html) as a means to get data from Kafka to HDFS. It's a Kafka connector provided by the [Confluent](http://www.confluent.io/) folks, and it's a important part of their *streaming data platform* offering. You can't call it [ETL](http://noetl.org/) these days, but you can refer to it as building [scalable ETL Pipelines](http://www.confluent.io/blog/how-to-build-a-scalable-etl-pipeline-with-kafka-connect).

Some history maybe? The Confluent platform already included [Camus](https://github.com/linkedin/camus) as a means to get data out of Kafka onto HDFS. It does the job, I can confirm. But what used to be LinkedIn's [Camus](https://github.com/linkedin/camus) is being phased out and replaced by [Goblin](https://github.com/linkedin/gobblin), the _universal data ingestion framework for Hadoop_. And since the release of [Apache Kafka](http://kafka.apache.org/) 0.9.0.0, there is Kafka Connect.

So why is this such an important part of a streaming data platform? At least 2 reasons come to mind: **integration** and **analytics**. 

Kafka connectors enable the integration of existing enterprise datasources with Kafka, thus exposing **existing systems as event data streams**. It replaces all what has previously been integrated using custom ETL flows based on some technique of [change data capture](https://en.wikipedia.org/wiki/Change_data_capture). The second kind of integration allows to offload Kafka events to other systems. The Kafka Connect HDFS Connector for example offloads Kafka events to HDFS. It can be a means to provide a backup, to archive historical data or to expose a copy of a stream of data in a more traditional (filesystem-like, batch processing) way.

Unless your Kafka cluster is set to have unlimited log retention, data will be removed from it eventually. A full archive will often be required however when you explore or mine your data and create analytic jobs. Often those jobs **don't produce any meaningful results** unless you already have some history of data available to run them on. 

Kafka is an essential part of a streaming data platform, but it is not such a platform on its own. A true platform also requires tools to ingest and offload data, and an easily accessible, filesystem-like access to the entire data archive. That's often HDFS, used to bootstrap your analytics jobs with, to mine and query, to use with 3rd party tools etc.

In short: the Kafka Connect HDFS Connector is an essential part of a streaming data platform, and as such it's provided by [Confluent](http://www.confluent.io/) as a part of its core platform. It's an implementation of a Kafka Connector that **serves the enterprise integration** of a streaming data platform, but it's also an internal component of the platform that **enables offloading Kafka data to HDFS**.
