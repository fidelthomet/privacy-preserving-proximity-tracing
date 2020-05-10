+++ text-intro

# <span>Privacy Preserving Proximity Tracing</span>

*Wie können wir die Ausbreitung des Coronavirus verlangsamen, ohne unsere Grundrechte und die Wirtschaft langfristig zu schädigen? Die Wissenschaft ist sich sicher: anonyme Tracing-Apps können der entscheidende Schlüssel sein. Eine visuelle Erklärung darüber, wie Privacy-Preserving Proximity Tracing funktioniert – und welche Rolle unsere Privatsphäre dabei spielt.*

Wie reagiert man angemessen auf das Coronavirus? Viele Ländern haben sich längst entschieden: Maßnahmen wie Lockdowns und Kontaktsperren helfen, die Ausbreitung des Virus zu verlangsamen und Gesundheitssysteme zu entlasten. Doch es gibt eine offensichtliche Kehrseite. Denn die Eingriffe schränken unsere Grundrechte fundamental ein, stellen weite Teile der Wirtschaft vor existenzielle Fragen und verstärken soziale Ungleichheiten und psychische Krankheiten.
Wie kann also eine Alternative aussehen, die uns bei der Bekämpfung des Virus hilft, ohne dabei aber unsere Gesellschaft nachhaltig in ihren Grundfesten zu erschüttern?

Weite Teile der Wissenschaft plädieren für freiwillige Tracing-Apps, die unsere physischen Kontakte anonymisiert aufzeichnen und uns im Fall einer möglichen Ansteckung unmittelbar benachrichtigen. So könnte – zumindest in der Theorie – jede Infektionskette identifiziert und unterbrochen werden.

Eine Schritt für Schritt-Erklärung, worum es bei Privacy-Preserving Proximity Tracing geht und wie unsere Privatsphäre geschützt werden soll. 


+++ text-reproduction

## Reproduktion

Ein wichtiger Kennwert im Umgang mit der Ausbreitung von COVID-19 ist die Reproduktionszahl R. Sie zeigt an, wie häufig eine infizierte Person im Durchschnitt gesunde Menschen mit dem Virus ansteckt. Ohne präventive Maßnahmen geht das Robert Koch-Institut von einer Basisreproduktionszahl R<span class="sub">0</span> zwischen 2 und 3,3 aus. 

+++ vis-reproduction 1

Ist <span class="highlight pink">R<span class="sub">0</span>=2</span>, werden zwei weitere Personen von einer infizierten angesteckt. Die Krankheit breitet sich exponentiell aus.

+++ vis-reproduction 2

Bei <span class="highlight yellow">R<span class="sub">0</span>=1</span> bleibt das Wachstum gleichbleibend linear. Wenn <span class="highlight purple">R<span class="sub">0</span>=3</span> gilt, ist die Ausbreitung deutlich stärker und somit schwieriger zu kontrollieren.

+++ vis-reproduction 3

Um das Virus zu stoppen, muss R<span class="sub">e</span> unter 1 sinken. <span class="highlight pink">R<span class="sub">e</span>=0.5</span> bedeutet zum Beispiel, dass nur jeder zweite Fall zu einer neuen Infektion führt. 

+++ vis-reproduction 4

Ist ein großer Teil der Bevölkerung immun, verlangsamt sich die Zahl Re automatisch. Weil Covid-19 aber eine neue Krankheit ist, gibt es weder einen Impfstoff noch eine ausreichende natürliche Immunität.

+++ vis-reproduction 5

Deshalb setzen viele Regierungen auf den Lockdown - er hat einen ähnlichen Effekt. Das Problem: Sobald die Maßnahmen aufgehoben werden, können sich neue Infektionsketten bilden.

+++ text-tracing
## Tracing 

Idealerweise sollten also nur Infizierte und Verdachtsfälle isoliert werden. Und genau hierin liegt das Versprechen des Tracings, also der präzisen Nachverfolgung von Infektionsketten. Um das besser zu verstehen, schauen wir uns ein Treffen der beiden Freunde Alice und Bob etwas genauer an:

Die WissenschafterInnen sind optimistisch, die Basis­reproduktions­zahl R0  so auf einen Wert < 1 verringern zu können. 

+++ vis-tracing 1

<span class="actor a">Alice</span> ist mit <span class="actor b">Bob</span> befreundet.

+++ vis-tracing 2

Also besucht <span class="actor a">Alice</span> <span class="actor b">Bob.</span>

+++ vis-tracing 3

Kurze Zeit später fühlt sich <span class="actor a">Alice</span> unwohl und entwickelt Symptome. Sie isoliert sich und wird getestet.

+++ vis-tracing 4

<span class="actor a">Alices</span> Test ist positiv. Sie war allerdings schon infektiös, bevor die Symptome auftraten.

+++ vis-tracing 5

Das bedeutet, dass sie vielleicht auch ihren Freund <span class="actor b">Bob</span> angesteckt hat. 

+++ vis-tracing 6

Wenn das stimmt, könnte <span class="actor b">Bob</span> in der Zwischenzeit selbst weitere Personen angesteckt haben, ohne es zu merken.

+++ vis-tracing 7

Werden <span class="actor a">Alices</span> Kontakte also rasch nachverfolgt und informiert, können <span class="actor b">Bob</span> und seine Freunde geschützt werden.

+++ vis-tracing 8

So werden Infektionsketten unterbrochen und die Ausbreitung des Virus eingedämmt.

+++ vis-tracing 9

Die Gesundheitsämter betreiben bereits manuelles Tracing über Telefon und Fax. Das hilft zwar, ist aber nicht schnell genug, um mit dem Tempo der Ausbreitung Schritt zu halten.

+++ vis-tracing 10

Und bei manchen Kontakte ist es fast unmöglich, sie manuell nachzuweisen. Zum Beispiel, wenn <span class="actor a">Alice</span> <span class="actor c">Carol</span> in der Bahn ansteckt, nachdem sie <span class="actor b">Bob</span> getroffen hat.

+++ vis-tracing 11

<span class="actor a">Alice,</span> <span class="actor b">Bob</span> und <span class="actor c">Carol</span> benutzen Smartphones. Wenn Sie eine Tracing-App mit Bluetooth Low Energy (BLE) verwenden, können sich ihre Geräte erkennen und die Dauer und den Abstand messen.

+++ vis-tracing 12

Wird <span class="actor a">Alice</span> positiv getestet, übermittelt sie diese Information an einen Server. Die Smartphones von <span class="actor b">Bob</span> und <span class="actor c">Carol</span> können später rekonstruieren, dass sie innerhalb des infektiösen Zeitraums in engem Kontakt zu einem bestätigten Fall standen und melden eine Warnung.

+++ vis-tracing 13

Natürlich gibt es auch bei diesem Ansatz ein paar Schwierigkeiten. Wenn <span class="actor c">Carol</span> die App nicht installiert hat, kann der Kontakt nicht erkannt werden. Ist die App darüber hinaus schlecht konzipiert, könnte das tiefe Eingriffe in unsere Privatsphäre und den Datenschutz bedeuten.

+++ text-privacy

Tracing bedeutet also die möglichst lückenlose und schnelle Erfassung von Infektionsketten. Deshalb können Betroffene gezielt isoliert werden und somit auch präsymptomatische Ansteckungen verhindert werden.

Das ist besonders wichtig, weil laut einer Studie der Universität Oxford (Ferretti et al., 2020) etwa die Hälfte aller Übertragungen prä- oder asymptomatisch stattfinden.

Die WissenschafterInnen sind optimistisch, die Basis­reproduktions­zahl R0  mit Hilfe einer App dauerhaft auf einen Wert < 1 verringern zu können. Durch das Tracing ist man dem Virus also einen entscheidenden Schritt voraus.


## Privacy Preservation

Wie kann also eine App konzipiert und designt sein, die...

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
