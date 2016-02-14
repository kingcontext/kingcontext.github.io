---
layout: post
title: Connect Kafka to S3
tags:
- confluent.io
- docker
- apache kafka
- kafka connect
- hdfs
- S3
- amazon
date: 2016-02-14 17:53:18
---
I already wrote about the Kafka Connect HDFS Connector to [connect Kafka to HDFS](/2016/02/13/connect-kafka-to-HDFS){: .int}. Up next: offloading data from Kafka to S3. For those of you that don't want to run a HDFS cluster.

The [Kafka Connect HDFS Connector](http://docs.confluent.io/2.0.0/connect/connect-hdfs/docs/index.html) should theoretically allow to simply connect to S3 as well (via the S3 Hadoop file system), but soon it became clear it's not working out of the box. The main problem is the connector updating a [WAL](https://en.wikipedia.org/wiki/Write-ahead_logging) co-located with the data on S3. But other than regular HDFS, the S3 Hadoop file system doesn't support appending to existing files.

Below you'll read about the steps involved to get it to work, but please keep in mind that I'm still in a test phase. If you're up for it, do test it yourself and let me know your findings. 

Fingers crossed & good luck!

---

First, familiarize yourself with [kafka-connect-hdfs](http://docs.confluent.io/2.0.0/connect/connect-hdfs/docs/index.html). Install the [confluent platform](http://www.confluent.io/developer#download) (refered to as $CONFLUENT_HOME) and [hadoop](http://hadoop.apache.org/releases.html) (refered to as $HADOOP_HOME).

After that, clone and build this [kafka-connect-hdfs fork](https://github.com/kingcontext/kafka-connect-hdfs). To do so, you'll first have to clone and build (```mvn install```) some dependencies first: [schema-registry](https://github.com/confluentinc/schema-registry.git), [common](https://github.com/confluentinc/common.git) and [rest-utils](https://github.com/confluentinc/rest-utils.git). I'll refer to the kafka-connect-hdfs fork directory as $CONNECT_FORK.

Install the kafka-connect-hdfs fork and install the S3 libraries as a connector _kafka-connect-s3_ (they're part of the hadoop installation):

    rm -R $CONFLUENT_HOME/share/java/kafka-connect-hdfs
    cp -R $CONNECT_FORK/target/kafka-connect-hdfs-2.1.0-SNAPSHOT-package/share/java/kafka-connect-hdfs $CONFLUENT_HOME/share/java
    mkdir $CONFLUENT_HOME/share/java/kafka-connect-s3
    cp $HADOOP_HOME/share/hadoop/tools/lib/aws-java-sdk-1.7.4.jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-aws-2.7.1.jar $HADOOP_HOME/share/hadoop/tools/lib/jets3t-0.9.0.jar $CONFLUENT_HOME/share/java/kafka-connect-s3/

Create a hadoop configuration folder somewhere (refered to as $HADOOP_CONF). In it, create a file __core-site.xml__ with the following content (substitute your AWS keys and optionally ajust the endpoint):

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
      <property>
        <name>dfs.support.append</name>
        <value>false</value>
      </property>
      <property>
        <name>fs.s3a.endpoint</name>
        <value>s3-eu-west-1.amazonaws.com</value>
      </property>
      <property>
        <name>fs.s3a.access.key</name>
        <value>your-access-key</value>
      </property>
      <property>
        <name>fs.s3a.secret.key</name>
        <value>your-secret-key</value>
      </property>
    </configuration>

Edit $CONFLUENT_HOME/etc/kafka-connect-hdfs/quickstart-hdfs.properties so it looks like this (substitute $HADOOP_HOME and $HADOOP_CONF):

    name=hdfs-sink
    connector.class=io.confluent.connect.hdfs.HdfsSinkConnector
    tasks.max=1
    topics=test_topic
    hdfs.url=s3a://kafka-connect
    flush.size=3
    hive.integration=false
    hadoop.home=$HADOOP_HOME
    hadoop.conf.dir=$HADOOP_CONF
    logs.dir=log

To test, first start the Confluent platform components (zookeeper, Kafka and schema-registry). We'll use the default connection settings, this assumes a default confluent install on localhost. Create a topic _test-topic_ and generate some data you'll want to offload to S3. Also create a S3 bucket named _kafka-connect_.

We're ready now to start the kafka-s3-connector. In $CONFLUENT_HOME execute 

    ./bin/connect-standalone etc/schema-registry/connect-avro-standalone.properties etc/kafka-connect-hdfs/quickstart-hdfs.properties

and verify output is created in your S3 bucket.

