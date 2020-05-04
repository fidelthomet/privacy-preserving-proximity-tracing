+++ text-intro

# <span>Proximity Tracing</span>

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

<span class="actor a pink">Alice</span> is friends with <span class="actor b green">Bob</span>

+++ vis-tracing 2

So <span class="actor a pink">Alice</span> visits <span class="actor b green">Bob</span>

+++ vis-tracing 3

Then <span class="actor a pink">Alice</span> develops symptoms, self isolates and gets tested.

+++ vis-tracing 4

<span class="actor a pink">Alice</span> is tested positively, but with covid she was already infectios days before developing symptoms.

+++ vis-tracing 5

So her Friend <span class="actor b purple">Bob</span> might has contracted the virus.

+++ vis-tracing 6

And if he has, it is likely that <span class="actor b purple">Bob</span> is already unknowingly spreading the disease further.

+++ vis-tracing 7

But if <span class="actor a pink">Alices</span> contacts can be traced back, <span class="actor b purple">Bob</span> and could be warned and asked to get tested and self-isolate.

+++ vis-tracing 8

This helps to break the chain of infection and to contain the further spread of the coronavirus.

+++ vis-tracing 9

Tracing can be done manually through over the phone interviews. While definetly helpful, there are downsides as it takes time, which limits the chance to contain the virus… 

+++ vis-tracing 10

…and some chains can be nearly impossible to trace. E.g. if <span class="actor a pink">Alice</span> infected <span class="actor c green">Carol</span> in public transport after visiting <span class="actor b purple">Bob</span>

+++ vis-tracing 11

…and some chains can be nearly impossible to trace. E.g. if <span class="actor a pink">Alice</span> infected <span class="actor c green">Carol</span> in public transport after visiting <span class="actor b purple">Bob</span>

+++ text-app

+++ vis-app 1

Er hatte nicht weit zu gehen; er wußte sogar, wieviel Schritte es von seiner Haustür waren: genau siebenhundertunddreißig. Er hatte sie einmal gezählt, als er sich sein Vorhaben schon lebhaft ausmalte.

+++ vis-app 2

Damals freilich glaubte er selbst noch nicht an diese seine Phantasiegemälde und kitzelte nur sich selbst mit ihrer grauenhaften, aber verführerischen Verwegenheit.

+++ vis-app 3

Jetzt, einen Monat später, hatte er bereits angefangen, die Sache anders zu betrachten, und trotz aller höhnischen Monologe über seine eigene Schwäche und Unschlüssigkeit hatte er sich unwillkürlich daran gewöhnt, das »grauenhafte« Phantasiegemälde bereits als ein beabsichtigtes Unternehmen zu betrachten, wiewohl er an seinen Entschluß noch immer selbst nicht recht glaubte.

+++ vis-app 4

Sein jetziger Ausgang hatte sogar den Zweck, eine Probe für sein Vorhaben zu unternehmen, und mit jedem Schritte wuchs seine Aufregung mehr und mehr.

+++ vis-app 5

Das Herz stand ihm fast still, und ein nervöses Zittern überkam ihn, als er sich einem kolossalen Gebäude näherte, das mit der einen Seite nach dem Kanal, mit der andern nach der . . . straße zu lag. 

+++ vis-app 6

Dieses Haus hatte lauter kleine Wohnungen, in denen allerlei einfache Leute wohnten: Schneider, Schlosser, Köchinnen, Deutsche verschiedenen Berufes, alleinstehende Mädchen, kleine Beamte usw. Durch die beiden Haustore und auf den beiden Höfen des Hauses war ein fortwährendes Kommen und Gehen. Hier gab es drei oder vier Hausknechte zur Aufsicht.

+++ text-privacy

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
