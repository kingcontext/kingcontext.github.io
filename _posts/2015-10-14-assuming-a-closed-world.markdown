---
layout: post
title:  "Assuming a closed world"
date:   2015-10-14 11:04:35
---
Hardly anyone will disagree with the statement that no-one posesses all information and knowledge that is out there. Yet many software systems are built as if they contain or control a complete set of information. They adhere - often unknowingly - the principle of the [Closed world assumption](https://en.wikipedia.org/wiki/Closed-world_assumption).

New systems and apps today do it differently. Smart (streaming) (big) data applications unlock new sources of data. Open datasets are linked and used to enrich enterprise data. Analytics derive new insights. It becomes clear to many that there is a virtually unlimited, open world of datasets waiting to be explored. 

Enterprises first had data lakes and now evolve to use streaming data platforms. But still there's often no [Open world](https://en.wikipedia.org/wiki/Open-world_assumption) assumed when designing the new solutions using all this data. Wrong by design, already. And why would this be so important, you ask?  

Take for example a Consumer Profile, composed for the purpose of omni-channel marketing campaigning. The customer order history files are combined with a stream of online (web, app) visits, albeit identified. Some visitors can be linked to known customers, and so their Consumer Profile gets a _true_ value in the field _isCustomer_. 

A lot of the stream of visitors however cannot be linked to an order, especially in the very beginning of this new data collection effort this will happen frequently. If at this point they get a _false_ for the _isCustomer_ field, this is based on a Closed world assumption. 

This example of a wrong deduction should be very clear. The _isCustomer_ should instead read _unknown_ as long as no order can be linked to a visitor. It seems obvious, but I've seen this very example been implemented incorrectly already a number of times. And I don't have to explain the consequences, of course.

A lot of **incorrect insights** are also implemented in other, less obvious use cases. And some are also blamed to poor data quality, but are in fact the result of a wrong - often implicit - assumption. So it's a good practice to always assume an open world, because after all, it is.

Context: _[Bad customer data will sabotage your CRM initiative](http://www.cmswire.com/customer-experience/bad-customer-data-will-sabotage-your-crm-initiative/)_

>The marketing team unintentionally sent the campaign to a lot of deceased customers because the 'deceased' data field wasn’t properly migrated to the new CRM application.




