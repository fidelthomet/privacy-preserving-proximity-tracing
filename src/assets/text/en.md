+++ text-meta

May 27 2020<br>
[Thomas Haas](https://twitter.com/thomashaaas) & [Fidel Thomet](https://twitter.com/fidelthomet)

+++ text-teaser

<span class="teaser">*A visual explainer on why we need a tracing app, how it would work and the risks it entails*</span>

+++ text-intro

Since March many European states have been faced with the problems posed by COVID-19. Measures such as lockdowns and contact restrictions were taken by the majority of countries. They help to slow down the spread of the virus and relieve pressure on health systems. But there is an obvious downside. The interventions radically restrict our fundamental rights, bring large parts of the economy in a state of despair, and increase social inequality.

What could be an alternative that would effectively help us fight the virus and save us from this dilemma?

The newly formed consortium [DP3T](https://dp-3t.github.io/) (Decentralized Privacy-Preserving Proximity Tracing), under which scientists from renowned European universities and research institutes have joined forces, advocates for voluntary tracing apps that anonymously record our physical contacts and notify us in case of a possible infection. Possible infections could thus be detected early and therefore, at least in theory, any chain of infection could be interrupted.

+++ text-reproduction

## How the virus spreads

To understand the spread of COVID-19, we need to know the reproduction number (R). In epidemiology, it describes how many healthy people are on average infected by a single infectious person. The number can be influenced by preventive measures. In the best case, the number R decreases, and the spread slows down. Without any measures, the reproduction rate is estimated to be [between 2 and 3](https://academic.oup.com/jtm/article/27/2/taaa021/5735319).

+++ vis-reproduction 1

If <span class="highlight pink">R=2,</span> an infectious person infects two others. The disease spreads exponentially.

+++ vis-reproduction 2

When <span class="highlight yellow">R=1,</span> the number of new infections is constant. But if <span class="highlight purple">R=3,</span> then the disease spreads much more easily and is all the more difficult to control.

+++ vis-reproduction 3

To stop the virus, the reproduction number must fall below 1. <span class="highlight pink">R=0.5</span> would mean that only every second case leads to a new infection.

+++ vis-reproduction 4

If a large part of the population is immune, R decreases automatically. But because COVID-19 is a new disease, there is neither a vaccine nor sufficient natural immunity.

+++ vis-reproduction 5

That is why many governments are opting for lockdown and social distancing. The effect is similar. The problem is: as soon as the measures are lifted, new chains of infection can quickly form.

+++ text-tracing
## Proximity tracing 

Ideally, only infected persons should be isolated and suspected cases should be quarantined. And this is exactly what tracing promises, i.e. the precise recording of possible transmissions. To better understand the method, let's take a closer look at a meeting of the two friends <span class="actor purple">Alice</span> and <span class="actor green">Bob.</span>

+++ vis-tracing 1

<span class="actor a">Alice</span> is friends with <span class="actor b">Bob.</span>

+++ vis-tracing 2

That’s why <span class="actor a">Alice</span> visits <span class="actor b">Bob.</span>

+++ vis-tracing 3

A short time later, <span class="actor a">Alice</span> feels unwell and shows symptoms. She goes into quarantine and is tested.

+++ vis-tracing 4

<span class="actor a">Alice</span> tests positive for COVID-19, but she was already infectious before the symptoms appeared.

+++ vis-tracing 5

This means that she may have infected her friend <span class="actor b">Bob.</span>

+++ vis-tracing 6

If this is true, <span class="actor b">Bob</span> may have unconsciously infected others in the meantime.

+++ vis-tracing 7

If <span class="actor a">Alice's</span> contacts are traced and informed quickly, <span class="actor b">Bob</span> can also be warned and thus protect his friends.

+++ vis-tracing 8

In this way, chains of infection are broken, and the spread of the virus is contained.

+++ vis-tracing 9

Manual tracing via telephone interviews does help, but it is not fast enough to keep up with the pace the disease spreads.

+++ vis-tracing 10

And with some contacts it is almost impossible to trace them manually. For example, if <span class="actor a">Alice</span> infects <span class="actor c">Carol</span> on public transport after meeting <span class="actor b">Bob.</span>

+++ vis-tracing 11

<span class="actor a">Alice,</span> <span class="actor b">Bob,</span> and <span class="actor c">Carol</span> all have smartphones. If they use a tracing app, their devices can detect each other via Bluetooth Low Energy (BLE) and measure the duration and approximate distance of the contact.

+++ vis-tracing 12

If <span class="actor a">Alice</span> tests positive, she uploads her data to a server. <span class="actor b">Bob</span> and <span class="actor c">Carol's</span> smartphones can later reconstruct that they were in close contact with <span class="actor a">Alice</span> during the infectious period and report a warning to them.

+++ vis-tracing 13

Of course, this approach also has its problems. If <span class="actor c">Carol</span> has not installed the app or does not use a smartphone at all, the contact cannot be reconstructed. If the app is poorly designed, this could also endanger data protection and privacy.

+++ text-privacy

Tracing, therefore, means the most complete and rapid detection of infections. This allows affected persons to be quarantined in a targeted approach and even pre-symptomatic infections can be prevented. This is particularly important because about half of all transmissions are pre- or asymptomatic. A [study by the University of Oxford](https://science.sciencemag.org/content/368/6491/eabb6936/tab-pdf) proves this fact and also concludes that a tracing app could permanently reduce the reproduction rate below 1.


## Privacy preservation

How can a tracing app that relies on sensitive health and contact data be both compliant with the strict European data protection regulations and able to fulfil its originally intended purpose?

1. **Usage is voluntary!** No person who decides against an installation has to fear any disadvantages.
2. **App users stay anonymous.** No conclusions about the identity of any user can be drawn.
 
Nevertheless, such systems have vulnerabilities — especially wherever data is transferred, either between two users of the app or between user and server. Let's take a closer look.

+++ vis-privacy 1

We assume that <span class="actor a">Alice</span> doesn't know <span class="actor b">Bob</span> nor <span class="actor c">Carol.</span> What data does <span class="actor a">Alice's</span> smartphone exchange with the others'?

+++ vis-privacy 2

To make tracing possible, the apps need to exchange unique IDs when <span class="actor a">Alice</span> and <span class="actor b">Bob</span> meet. The IDs are generated and stored decentrally on the smartphone. So there is no central server that links IDs with real identities.

+++ vis-privacy 3

IDs are only valid for a specified time interval and are continuously regenerated. <span class="actor b">Bob</span> and <span class="actor c">Carol</span> both had contact with <span class="actor a">Alice</span> but may receive different IDs. The changing IDs prevent <span class="actor a">Alice's</span> movements from being tracked by third parties.

+++ vis-privacy 4

All IDs collected and the associated information (distance and duration) remain stored locally on each user's phone and are not passed on to a server or third parties. So how does the critical information that <span class="actor a">Alice</span> was tested positive get to <span class="actor b">Bob</span> and Carol?

+++ vis-privacy 5

Well, via a detour. <span class="actor a">Alice</span> sends only her IDs (or to be more precise, the seed keys from which her IDs are generated – this keeps data traffic low) to a server. <span class="actor b">Bob,</span> <span class="actor c">Carol,</span> and all other users download all new seed keys regularly.

+++ vis-privacy 6

The app then automatically compares them with the locally stored IDs. If there is a match, it issues a warning, assuming the specific risk of transmission. This risk depends on the duration of the encounter and the estimated distance

+++ text-attacks

The real identities of users, their contact details, or the duration of an encounter are therefore never passed on to a central server or a third party. Location or movement data is not collected at all. The locally stored IDs will also automatically be deleted from the smartphone after a certain period. 

Data protection is the focus of the app. Still, some risks remain. They mostly affect all BLE-based tracing systems, and in some cases even extend to any form of contact tracing. There are two central attack vectors: the identification of a confirmed case and the sending of false alarms.

+++ vis-attacks 1

<span class="actor e">Eve</span> is an attacker trying to identify people who have tested positive for the virus. In the simplest case, <span class="actor a">Alice</span> was her only contact.

+++ vis-attacks 2

As soon as <span class="actor a">Alice</span> tests positive and <span class="actor e">Eve</span> receives a warning, she can easily reconstruct that <span class="actor a">Alice</span> must be infected. If she modifies her app so that it also records the date and time of the contacts and notes when she was in contact with whom, <span class="actor e">Eve</span> can apply the same principle to several contacts.

+++ vis-attacks 3

<span class="actor e">Eve</span> also uses more sophisticated methods. For example, she can position directional antennas and surveillance cameras so that both cover the same area. This allows her to link the anonymous ID with a picture of <span class="actor a">Alice.</span> <span class="actor e">Eve</span> herself doesn't even have to be around for this.

+++ vis-attacks 4

As soon as <span class="actor a">Alice</span> publishes her IDs, <span class="actor e">Eve</span> compares them with her database and finds the picture of the now positively tested <span class="actor a">Alice.</span>

+++ vis-attacks 5

Meanwhile, <span class="actor m">Mallot</span> tries to trigger false warnings so that people will wrongly quarantine themselves. This works by contacting his target <span class="actor b">Bob</span> and then claiming that he is infected.

+++ vis-attacks 6

However, this is not so easy. To be considered infected, you need a confirmation code, which you only receive from the authorities after a positive test result.

+++ vis-attacks 7

To place his IDs on the server, <span class="actor m">Mallot</span> would, therefore, have to technically enter the system or obtain a valid authentication code through bribery. If he succeeds, he could even send entire groups into isolation by placing antennas in highly frequented public places.

+++ vis-attacks 8

Another possibility would be for <span class="actor m">Mallot</span> to send the IDs of people who are likely to test positive soon. For example, <span class="actor m">Mallot</span> places one antenna in a COVID-19 test center and another near <span class="actor b">Bob.</span>

+++ vis-attacks 9

When <span class="actor a">Alice</span> visits the test center, the antennas relay her ID to <span class="actor b">Bob.</span> His app assumes that this is real contact.

+++ vis-attacks 10

As soon as <span class="actor a">Alice</span> reports her infection, <span class="actor b">Bob</span> is warned and goes into self-quarantine. 

+++ text-next

## What we learn from this

Despite the privacy-protecting approach, tracing by app bears risks. The extent to which these risks are exploited is challenging to assess. Weighing up the pros and cons, we believe that the reduced probability of infecting other people through your infection outweighs the security risks of this tracing app design. [Expert opinion by id est avocats](https://github.com/DP-3T/documents/blob/master/data_protection/DP-3T%20Model%20DPIA.pdf) also considers these residual risks to be acceptable, provided that users are expressly informed about them.

The European Union assumes that [about 60%](https://ec.europa.eu/health/sites/health/files/ehealth/docs/covid-19_apps_en.pdf) of the population would have to use and follow the app to break infection chains in a lasting way. But it can still play its part in lowering the reproduction rate if fewer people decide to use it. Tracing apps should, therefore, be seen as a supplement and not a substitute for common measures such as hygiene and distance rules. If successful, they can help to relax restrictive measures and thus solve the dilemma between restrictions and the risk of infection.


+++ text-footer 

### Background

Our work refers to the framework «Decentralized Privacy-Preserving Proximity Tracing» published by [DP3T](https://github.com/DP-3T/documents). All documents are publicly available on Github. National implementations may differ.

### Further Links
- [DP3T: Decentralized privacy-preserving proximity tracing (White Paper)](https://github.com/DP-3T/documents/blob/master/DP3T%20White%20Paper.pdf)
- [DP3T: Protecting lives & liberty. How contact tracing apps can foil both COVID-19 and Big Brother](https://github.com/DP-3T/documents/blob/master/public_engagement/cartoon/en/comic-en.pdf)
- [eHealth Network: Mobile applications to support contact tracing in the EU’s fight against COVID-19. Common EU Toolbox for Member States](https://ec.europa.eu/health/sites/health/files/ehealth/docs/covid-19_apps_en.pdf) 
- [eHealth Network: Interoperability guidelines for approved contact tracing mobile applications in the EU](https://ec.europa.eu/health/sites/health/files/ehealth/docs/contacttracing_mobileapps_guidelines_en.pdf)
- [Ferretti et al.: Quantifying SARS-CoV-2 transmission suggests epidemic control with digital contact tracing](https://science.sciencemag.org/content/368/6491/eabb6936/tab-pdf)
- [Id Est Avocats: Data protection assessment report (DP3T)](https://github.com/DP-3T/documents/blob/master/data_protection/DP-3T%20Model%20DPIA.pdf)
- [Liu, Gayle, Wilder-Smith, Rocklöv: The reproductive number of COVID-19 is higher compared to SARS coronavirus](https://academic.oup.com/jtm/article/27/2/taaa021/5735319)
- [Nicky Case: What happens next? COVID-19 futures, explained with playable simulations](https://ncase.me/covid-19/)
- [Republik: Wie Big Tech die Pandemie lösen will](https://www.republik.ch/2020/05/09/wie-big-tech-die-pandemie-loesen-will)
- [Washington Post: Why outbreaks like coronavirus spread exponentially, and how to “flatten the curve”](https://www.washingtonpost.com/graphics/2020/world/corona-simulator/)

### Copyright

Berlin, 2020. [This work](https://tracing.ft0.ch/) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/?ref=ccchooser). The source code is available on [Github](https://github.com/fidelthomet/privacy-preserving-proximity-tracing/).

### Imprint

Responsible for this website are Thomas Haas & Fidel Thomet. We are not responsible for the content of linked external sites.

### Contact

You can reach us via Twitter [@thomashaaas](https://twitter.com/thomashaaas) & [@fidelthomet](https://twitter.com/fidelthomet) and mail: <a href="mailto:tracing@ft0.ch">tracing@ft0.ch</a>.

### Data protection

When you visit this website, the following information is stored on the server in log files: The IP address, the browser and operating system of the visitor, the time of the visit, the web pages called up and files requested and, if transmitted, which website referred to them.

The recorded data is used for error detection and securing the server and is automatically deleted after 14 days. The data will not be transmitted to third parties. The website does not use cookies nor is external content embedded.

+++ dict

isolation → Isolation
immunity → Immunity