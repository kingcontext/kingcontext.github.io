---
layout: post
title:  "The promise of data contracts"
subtitle: "A data contract is to a dataset what an API is to an application: it describes, guards and enforces what a dataset consumer can expect from…"
date:   2023-06-15 20:42:50
canonical_url: "https://medium.com/@jan_uyttenhove/the-promise-of-data-contracts-4086db22a9f9"
---

* * *

A data contract is to a dataset what an API is to an application: it describes, guards and enforces what a dataset consumer can expect from the dataset in terms of structure, quality (e.g. freshness, timeliness, …), interface capabilities etc.

Although there is no real industry standard or specification (yet!) to express data contracts — as opposed to e.g. the OpenAPI specification -, the objective is to have a format that can serve as the configuration for both machine/application processing as well as for the generation of human-readable documentation (e.g. aspects of data governance).

Having an interface contract for data facilitates the (re)use of datasets throughout the landscape and enables reliable data integration between (data) domains: the data contract is seen as a handshake between the data producer and the data consumer(s). Because it can be used as a set of configuration parameters, the contract can be enforced and/or validated programatically, at the time when the data is made available for consumption.

By enforcing the contract when the data is made available for use, the dimensions of quality data are guarded not necessarily in or at the source (system), but at the (unique) interface to the data of the source. This is often the most pragmatic, realistic, feasible and acceptable approach: the ownership and responsibility to guard the data quality lies with the source domain, but not necessarily with (or “in”) the source.

