+++ text-intro

# <span>Privacy Preserving Proximity Tracing</span>

*Wie können wir die Ausbreitung des Coronavirus verlangsamen, ohne unsere Grundgesetze und die Wirtschaft langfristig zu schädigen? Verschiedene Teams aus WissenschaftlerInnen scheinen darauf eine Antwort gefunden zu haben. So funktioniert die Tracing-App PEPP-PT.*

Weil die Ausbreitung des Coronavirus europa- und weltweit weiter rasant ansteigt, ergreifen viele Staaten einschneidende Maßnahmen, um Infektionszahlen zu verringern und damit eine Überlastung der Gesundheitssysteme zu vermeiden. Leider spüren immer größere Teile der Bevölkerung die signifikanten Nebenwirkungen von Lockdowns, Ausgangssperren und Kontaktverboten. Die Verordnungen bedeuten tiefe Einschnitte in unsere Grundrechte, stellen viele Unternehmen und Selbstständige vor existenzielle wirtschaftliche Herausforderungen und sind sozial ungerecht. Bleiben die gegenwärtigen Interventionen bestehen, spitzt sich dieser Interessenkonflikt weiter zu. Ein Szenario, das wir alle unbedingt vermeiden möchten.

Die Alternative könnte laut verschiedenen ForscherInnen-Teams eine frei zugängliche App sein, die unsere physischen Kontakte aufzeichnet und uns im Fall einer möglichen Ansteckung direkt  benachrichtigt. Um unsere Privatsphäre brauchen wir uns aber nicht zu sorgen. Es werden weder Bewegungsprofile noch persönliche Kontaktprotokolle gespeichert. Wir erklären Schritt für Schritt die Grundlagen und die Funktionsweise von PEPP-PT.

+++ text-reproduction

## R₀ 

Verschiedene Teams aus europäischen WissenschaftlerInnen plädieren deshalb dafür, diese Maßnahmen schrittweise durch digitale Tracing-Apps zu ersetzen. Die Vorschläge tragen kompliziert klingende Namen wie "Pan European Privacy Protecting Proximity Tracing" (PEPP-PT) oder "Decentralized Privacy-Preserving Proximity Tracing" (DP^3T), basieren aber auf einem einfachen Prinzip: dem Tracing. Statt flächendeckender Massenisolation sollen Infektionsketten durch das Smartphone extrem präzise nachverfolgt und isoliert werden. Die notwendigen Daten liefert eine App, die alle unmittelbaren physischen Kontakte eines Users mit anderen App-Usern nachvollzieht. Sobald Kontakt zu einer infizierten Person bestand, warnt die App die BenutzerIn schnell und anonym. 

+++ vis-reproduction 1

If <span class="highlight pink">R<span class="sub">0</span>=2</span> on average one infected person infects two persons leading to expotential growth.

+++ vis-reproduction 2

If <span class="highlight yellow">R<span class="sub">0</span>=1</span> the growth remains linear, but if <span class="highlight purple">R<span class="sub">0</span>=3</span> it would spread even more making it more difficult to contain.

+++ vis-reproduction 3

To stop the disease from spreading R<span class="sub">e</span>, the effective reproduction number needs to be below 1. <span class="highlight red">R<span class="sub">e</span>=0.5</span> would mean that only every 2nd case would lead to another infection.

+++ vis-reproduction 4

A high level of immunity will lower Re significantly. But since it's a new disease there is no vaccine and natural immunity in the population is low.

+++ vis-reproduction 5

Isolation has a simillar effect. But if no other measures are taken expotential spreading will pick up again.

+++ text-tracing
## Tracing 

Verschiedene Teams aus europäischen WissenschaftlerInnen plädieren deshalb dafür, diese Maßnahmen schrittweise durch digitale Tracing-Apps zu ersetzen. Die Vorschläge tragen kompliziert klingende Namen wie "Pan European Privacy Protecting Proximity Tracing" (PEPP-PT) oder "Decentralized Privacy-Preserving Proximity Tracing" (DP^3T), basieren aber auf einem einfachen Prinzip: dem Tracing. Statt flächendeckender Massenisolation sollen Infektionsketten durch das Smartphone extrem präzise nachverfolgt und isoliert werden. Die notwendigen Daten liefert eine App, die alle unmittelbaren physischen Kontakte eines Users mit anderen App-Usern nachvollzieht. Sobald Kontakt zu einer infizierten Person bestand, warnt die App die BenutzerIn schnell und anonym.

Die WissenschafterInnen sind optimistisch, die Basis­reproduktions­zahl R0  so auf einen Wert < 1 verringern zu können. 

+++ vis-tracing 1

<span class="actor a">Alice</span> is friends with <span class="actor b">Bob</span>

+++ vis-tracing 2

So <span class="actor a">Alice</span> visits <span class="actor b">Bob</span>

+++ vis-tracing 3

Then <span class="actor a">Alice</span> develops symptoms, self isolates and gets tested.

+++ vis-tracing 4

<span class="actor a">Alice</span> is tested positively, but with covid she was already infectios days before developing symptoms.

+++ vis-tracing 5

So her Friend <span class="actor b">Bob</span> might has contracted the virus.

+++ vis-tracing 6

And if he has, it is likely that <span class="actor b">Bob</span> is already unknowingly spreading the disease further.

+++ vis-tracing 7

But if <span class="actor a">Alices</span> contacts can be traced back, <span class="actor b">Bob</span> and could be warned and asked to get tested and self-isolate.

+++ vis-tracing 8

This helps to break the chain of infection and to contain the further spread of the coronavirus.

+++ vis-tracing 9

Tracing can be done manually through over the phone interviews. While definetly helpful, there are downsides as it takes time, which limits the chance to contain the virus… 

+++ vis-tracing 10

…and some chains can be nearly impossible to trace. E.g. if <span class="actor a">Alice</span> infected <span class="actor c">Carol</span> in public transport after visiting <span class="actor b">Bob</span>

+++ vis-tracing 11

<span class="actor a">Alice</span>, <span class="actor b">Bob</span> and <span class="actor c">Carol</span> carry smartphones. By making use of BLE they could detect nearby devices and log duration and proximity of contacts.

+++ vis-tracing 12

When <span class="actor a">Alice</span> is tested positive, that information is transmitted to a <span class="actor gray">server.</span> The phones of <span class="actor b">Bob</span> and <span class="actor c">Carol</span> can reconstruct, that they have been in close contact with a confirmed case and show a warning.

+++ vis-tracing 13

However, there are also downsides to this approach. If <span class="actor c">Carol</span> did not install the app, the contact cannot be traced. Furthermore, if designed badly, an app like that could pose a tremendous invasion of privacy.

+++ text-privacy

## Privacy Preservation

It's voluntary! No repurcussions if you decide to not install the app. The sensitive parts are where data is exchanged between devices. i.e. between two users of the app or between a user and the server. Let's have a look at them.

+++ vis-privacy 1

Broadcasting your ID makes your device visible not only to other users with the tracing app but to all bluetooth devices. To prevent <span class="actor e">Eve</span> from setting up a network of bluetooth antennas to track <span class="actor a"/>Alice's</span> movements, the boradcasted IDs change periodically.

+++ vis-privacy 2

Who has contact with whom, for how long, and how close is quite sensitive data. In an attempt to Identify who <span class="actor a"/>Alice</span> was in contact with or to create a wider social graph of all tracing-app users <span class="actor m">Mallet</span> might try to obtain this data by attacking the <span class="actor gray">server.</span> To prevent this attack, this data stays on <span class="actor a"/>Alice's</span> and <span class="actor b"/>Bob's</span> phones.

+++ vis-privacy 3

Only after she's been tested positively <span class="actor a">Alice</span> uploads data to the <span class="actor gray">server.</span> These data contain her own IDs or keys to generate her IDs cryptographically, but no information on her contacts. That is enough for <span class="actor b">Bob</span> to check if he's been exposed to a confirmed case, and prevents <span class="actor m">Mallet</span> from acessing data that's not public anyways.

+++ text-attacks

While the system is designed in a way to preserve privacy, some risks remain. They are mostly inherent to all BLE-based tracing systems or even to contact tracing, including manual, in general. There are two main attack vectors: Identifying a confirmed case and sending false alerts.

+++ vis-attacks 1

Since <span class="actor e"/>Eve</span> failed to track people she now tries to indentify people who have been tested positively for having the virus. In the simplest case, she only was in contact with <span class="actor a">Alice</span> or is certain, that her other contacts have not been tested positively.

+++ vis-attacks 2

When <span class="actor a">Alice</span> is tested positively and <span class="actor e"/>Eve</span> receives a warning, she can simply figure out that <span class="actor a">Alice</span> must have the virus. Similarly, by using a modified version of the app, that not only notifies about having had contact to a confirmed case, but also about the time of the contact (or by switching accounts/devices after each contact), and simulatainly logging with whom she was in contact at what time <span class="actor e"/>Eve</span> could reconstruct who has been tested positively.

+++ vis-attacks 3

Using a more elaborate setup of linking directional antennas with cameras, credit card terminals or other equpment that can help indentifying people <span class="actor e"/>Eve</span> is also able to identify a larger group of confirmed cases, without being physically close to them herself.

+++ vis-attacks 4

As soon as <span class="actor a">Alice</span> uploads her IDs to the server, <span class="actor e"/>Eve</span> who already knows who is behind those IDs, can identify her.

+++ text-privacy-old

## Datenschutz

Bisher standen artverwandte Apps häufig und auch zurecht in der Kritik, weil sie grundlegende Rechte des europäischen Datenschutzes GDPR unterwandern. Doch anders als bei verschiedenen Tracking-Methoden, die auf umfassenden Bewegungsprofilen von NutzerInnen basieren, stellt PEPP-PT die Privatsphäre und den Datenschutz der User offensiv in den Mittelpunkt. 

Denn um einen ansteckenden Kontakt nachweisen zu können, sind laut DP^3T nur zwei Informationen notwendig: 

→ Der Aufenthalt in unmittelbarer Nähe und ausreichender Dauer zu einer infizierten Person (Unabhängig des genauen Ortes)  
→ Der Fakt, dass diese Kontaktperson zum Zeitpunkt des Treffens ansteckend war  

Das bedeutet auch, dass keine sensiblen Informationen zur übertragenden Person, dem genauen Ort des Treffens, weiteren Bewegungsprotokollen oder weiteren Kontexten notwendig sind. 


+++ text-next

## What’s Next?

Natürlich bleiben nach wie vor einige Fragen offen. Die deutsche Version der App befindet sich aktuell noch in der Entwicklung, beteiligt sind neben dem Heinrich-Hertz-Institut und der TU Dresden auch das Robert Koch-Institut. Einen genauen Termin für die Veröffentlicht gibt es nicht.

Außerdem ist nicht sicher, welche Maßnahmen PEPP-PT genau ablösen könnte. Mit großer Sicherheit werden die gängigen Abstands- und Hygieneregeln weiterhin aufrecht erhalten. Trotzdem: Durch PEPP-PT kann es möglich werden, Infektionsketten präzise zu verfolgen und somit genau die Menschen zu isolieren, die wirklich einer realen Gefahr ausgesetzt sind. Die Voraussetzung wäre ein breites gesellschaftliches Verständnis dafür, betroffene BürgerInnen für den jeweiligen Isolationszeitraum "freizustellen". 

Damit kann die App einen erheblichen Beitrag dazu leisten, unser öffentliches Leben wieder zu normalisieren. Die eingangs erwähnten Nebeneffekte von Lockdowns, also die Verletzung unsere Grundrechte, existenzielle wirtschaftliche Schäden und soziale Ungerechtigkeit, würden somit größtenteils aufgehoben werden.

So könnte unsere neue Normalität mit PEPP-PT aussehen.
