+++ text-meta

27\. Mai 2020<br>
[Thomas Haas](https://twitter.com/thomashaaas) & [Fidel Thomet](https://twitter.com/fidelthomet)

+++ text-teaser

<span class="teaser">*Eine visuelle Erklärung, warum wir eine Tracing-App brauchen, wie sie funktioniert und welche Risiken existieren*</span>

+++ text-intro

Seit März stellt COVID-19 viele europäischen Staaten vor einen folgenschweren Konflikt. Maßnahmen wie Lockdowns und Kontaktsperren, die von der überwiegenden Anzahl aller Länder ergriffen wurden, helfen dabei, die Ausbreitung des Virus zu verlangsamen und Gesundheitssysteme zu entlasten. Doch es gibt eine offensichtliche Kehrseite: Die Eingriffe schränken unsere Grundrechte fundamental ein, stellen weite Teile der Wirtschaft vor existenzielle Fragen und verstärken soziale Ungleichheit.

Wie kann also eine Alternative aussehen, die uns effektiv bei der Bekämpfung des Virus hilft und uns dabei vor diesem Dilemma bewahrt?

Das neu formierte Konsortium [DP3T](https://dp-3t.github.io) (Decentralized Privacy-Preserving Proximity Tracing), unter dem sich WissenschaftlerInnen renommierter europäischer Universitäten und Forschungsinstitute zusammengefunden haben, plädiert für freiwillige Tracing-Apps, die unsere physischen Kontakte anonymisiert aufzeichnen und uns im Fall einer möglichen Ansteckung benachrichtigen. So könnten mögliche Infektionen frühzeitig erkannt und somit – zumindest in der Theorie – jede Infektionskette unterbrochen werden. 

+++ text-reproduction

## Wie sich das Virus ausbreitet

Um die Ausbreitung von COVID-19 zu verstehen, hilft uns die Reproduktionszahl (R). In der Epidemiologie beschreibt sie, wie viele gesunde Menschen im Durchschnitt von einer infektiösen Person angesteckt werden. Sie kann durch präventive Maßnahmen beeinflusst werden – im besten Fall verlangsamt sich die Ausbreitung und die Zahl R nimmt ab. Ohne Maßnahmen wird die Reproduktionszahl auf einen Wert [zwischen 2 und 3 geschätzt](https://academic.oup.com/jtm/article/27/2/taaa021/5735319).

+++ vis-reproduction 1

Ist <span class="highlight pink">R=2,</span> steckt eine infektiöse Person zwei weitere an. Die Krankheit breitet sich exponentiell aus.

+++ vis-reproduction 2

Bei <span class="highlight yellow">R=1</span> ist die Anzahl der Neuinfektionen gleichbleibend. Wenn <span class="highlight purple">R=3</span> dann breitet sich die Krankheit deutlich leichter aus und ist umso schwieriger zu kontrollieren.

+++ vis-reproduction 3

Um das Virus zu stoppen, muss die Reproduktionszahl unter 1 sinken. <span class="highlight pink">R=0.5</span> bedeutet zum Beispiel, dass nur jeder zweite Fall zu einer neuen Infektion führt. 

+++ vis-reproduction 4

Ist ein großer Teil der Bevölkerung immun, nimmt R automatisch ab. Weil COVID-19 aber eine neue Krankheit ist, gibt es weder einen Impfstoff noch eine ausreichende natürliche Immunität.

+++ vis-reproduction 5

Deshalb setzen viele Regierungen auf einen Lockdown und Social Distancing. Der Effekt ist ähnlich. Das Problem: Sobald die Maßnahmen aufgehoben werden, können sich rasch neue Infektionsketten bilden.

+++ text-tracing
## Proximity Tracing 

Idealerweise sollten also nur Infizierte isoliert und Verdachtsfälle quarantänisiert werden. Und genau hierin liegt das Versprechen des Tracings, also der präzisen Nachverfolgung von möglichen Übertragungen. Um die Methode besser zu verstehen, schauen wir uns ein Treffen der beiden Freunde <span class="actor purple">Alice</span> und <span class="actor green">Bob</span> etwas genauer an:

+++ vis-tracing 1

<span class="actor a">Alice</span> ist mit <span class="actor b">Bob</span> befreundet.

+++ vis-tracing 2

Also besucht <span class="actor a">Alice</span> <span class="actor b">Bob.</span>

+++ vis-tracing 3

Kurze Zeit später fühlt sich <span class="actor a">Alice</span> unwohl und entwickelt Symptome. Sie begibt sich in Quarantäne und wird <span class="highlight pink">getestet.</span>

+++ vis-tracing 4

<span class="actor a">Alices</span> Test fällt <span class="highlight pink">positiv</span> aus. Sie war allerdings schon infektiös, bevor die Symptome auftraten.

+++ vis-tracing 5

Das bedeutet, dass sie vielleicht auch ihren Freund <span class="actor b">Bob</span> <span class="highlight purple">angesteckt</span> hat.

+++ vis-tracing 6

Wenn das stimmt, könnte <span class="actor b">Bob</span> in der Zwischenzeit selbst weitere Personen <span class="highlight purple">angesteckt</span> haben, ohne es zu merken.

+++ vis-tracing 7

Werden <span class="actor a">Alices</span> Kontakte rasch <span class="highlight yellow">nachverfolgt</span> und informiert, kann auch <span class="actor b">Bob</span> gewarnt werden und seine Freunde <span class="highlight green">schützen.</span> So werden Infektionsketten unterbrochen und die Ausbreitung des Virus eingedämmt.

+++ vis-tracing 9

Manuelles <span class="highlight yellow">Tracing</span> über Telefoninterviews <span class="highlight green">hilft</span> zwar, ist aber nicht schnell genug, um mit dem Tempo der <span class="highlight purple">Ausbreitung</span> Schritt zu halten. 

+++ vis-tracing 10

Und bei manchen Kontakten ist es fast unmöglich, sie manuell <span class="highlight yellow">nachzuvollziehen.</span> Zum Beispiel, wenn <span class="actor a">Alice</span> <span class="actor c">Carol</span> in der Bahn <span class="highlight purple">ansteckt,</span> nachdem sie <span class="actor b">Bob</span> getroffen hat. 

+++ vis-tracing 11

<span class="actor a">Alice,</span> <span class="actor b">Bob</span> und <span class="actor c">Carol</span> benutzen Smartphones. Wenn Sie eine Tracing-App verwenden, können sich ihre Geräte über Bluetooth Low Energy (BLE) erkennen und Dauer und ungefähren Abstand des Kontakts messen. 

+++ vis-tracing 12

Wird <span class="actor a">Alice</span> <span class="highlight pink">positiv getestet,</span> übermittelt sie diese Information an einen Server. Die Smartphones von <span class="actor b">Bob</span> und <span class="actor c">Carol</span> können später rekonstruieren, dass sie innerhalb des infektiösen Zeitraums in engem Kontakt zu <span class="actor a">Alice</span> standen und melden ihnen eine <span class="highlight yellow">Warnung.</span>

+++ vis-tracing 13

Natürlich gibt es auch bei diesem Ansatz Schwierigkeiten. Wenn <span class="actor c">Carol</span> die App nicht installiert hat oder gar kein Smartphone nutzt, kann der Kontakt nicht nachvollzogen werden. Ist die App schlecht konzipiert, könnte das tiefe Eingriffe in unsere Privatsphäre und den Datenschutz bedeuten.

+++ text-privacy

Tracing bedeutet also die möglichst lückenlose und schnelle Erkennung von Infektionen. Dadurch können sich Betroffene gezielt in Quarantäne begeben und selbst präsymptomatische Ansteckungen verhindert werden. 


Das ist besonders wichtig, da laut einer [Studie der Universität Oxford](https://science.sciencemag.org/content/early/2020/03/30/science.abb6936/tab-pdf) etwa die Hälfte aller Übertragungen prä- oder asymptomatisch stattfinden. Die Studie kommt zu dem Schluss, die Reproduktionszahl mit Hilfe einer Tracing-App dauerhaft unter 1 senken zu können.

## Privacy Preservation

Wie kann eine Tracing-App, die mit sensiblen Gesundheits- und Kontaktdaten arbeitet, konzipiert und designt sein, um sowohl die strengen europäischen Datenschutzrichtlinien zu befolgen als auch ihren ursprünglich intendierten Zweck zu erfüllen? 

1. **Die Nutzung ist freiwillig!** Keine Person, die sich gegen eine Installation entscheidet, muss daraus weitere Nachteile fürchten. 
2. **Alle, die die App nutzen, tun das anonym.** Es können also keine Rückschlüsse auf die Identität der NutzerInnen gezogen werden. 

Trotzdem haben solche Systeme vulnerable Stellen. Nämlich überall dort, wo Daten übermittelt werden – entweder zwischen zwei NutzerInnen der App oder zwischen NutzerIn und Server. Werfen wir also einen genaueren Blick darauf: 

+++ vis-privacy 1

Gehen wir dieses Mal davon aus, dass <span class="actor a">Alice</span> weder <span class="actor b">Bob</span> noch <span class="actor c">Carol</span> kennt. Welche Daten tauscht <span class="actor a">Alices</span> Smartphone mit dem der anderen aus? 

+++ vis-privacy 2

Um das Tracing überhaupt möglich zu machen, tauschen die Apps eindeutige Identifikationsnummern (IDs) aus, sobald sich <span class="actor a">Alice</span> und <span class="actor b">Bob</span> zufällig getroffen haben. Die IDs werden dezentral auf dem Smartphone generiert und gespeichert. Es gibt also keinen riesigen Server, der IDs mit realen Personen verknüpfen kann. 

+++ vis-privacy 3

Was ist noch wichtig? IDs gelten nur für ein bestimmtes Zeitintervall und werden kontinuierlich neu generiert. <span class="actor b">Bob</span> und <span class="actor c">Carol</span> hatten zwar beide Kontakt zu <span class="actor a">Alice,</span> erhalten aber möglicherweise verschiedene IDs. Die wechselnden IDs verhindern, dass <span class="actor a">Alice</span> Bewegungen von Dritten aufgezeichnet werden können.

+++ vis-privacy 4

Alle gesammelten IDs und die dazugehörigen Informationen (Abstand, Dauer) bleiben lokal auf dem Smartphone jedes Users gespeichert und werden nicht an einen Server oder an Dritte weitergegeben. Wie gelangt also die wichtige Information, dass <span class="actor a">Alice</span> positiv getestet wurde, an <span class="actor b">Bob</span> und <span class="actor c">Carol?</span> 

+++ vis-privacy 5

Nun, über einen Umweg. <span class="actor a">Alice</span> sendet nämlich nur ihre IDs (oder besser gesagt die Seed Keys, aus dem ihre IDs generiert werden – so bleibt der Daten-Traffic gering) an einen Server. <span class="actor b">Bob,</span> <span class="actor c">Carol</span> und alle anderen NutzerInnen downloaden regelmäßig alle neuen Seed Keys. 

+++ vis-privacy 6

Die App gleicht sie dann automatisch mit den lokal gespeicherten IDs ab. Gibt es eine Übereinstimmung, spricht sie – abhängig vom Übertragungsrisiko, das sich aus Kontaktdauer und geschätzter Distanz ergibt – eine <span class="highlight yellow">Warnung</span> aus. 


+++ text-attacks

Die realen Identitäten der NutzerInnen, ihre Kontaktdaten oder die Dauer einer Begegnung werden also nie an einen zentralen Server oder Dritte weitergereicht. Standort- oder Bewegungsdaten werden überhaupt nicht erst gesammelt. Die lokal gespeicherten IDs werden außerdem nach einer bestimmten Zeitspanne automatisch vom Smartphone gelöscht.

Der Datenschutz steht also merklich im Fokus der App. Trotzdem gibt es Restrisiken. Sie betreffen in erster Linie alle BLE-basierte Tracing-Systeme, zum Teil sogar jegliche Form des Tracings. Es bestehen zwei zentrale Angriffsvektoren: Die Identifikation eines bestätigten Falles und das Senden falscher Alarme.

+++ vis-attacks 1

<span class="actor e">Eve</span> ist eine <span class="highlight red">Angreiferin</span> und versucht, Personen zu identifizieren, die positiv auf das Virus getestet wurden. Im einfachsten Fall hatte sie selbst ausschließlich Kontakt zu <span class="actor a">Alice.</span>

+++ vis-attacks 2

Sobald <span class="actor a">Alice</span> nun <span class="highlight pink">positiv getestet</span> wird und <span class="actor e">Eve</span> eine <span class="highlight yellow">Warnung</span> erhält, kann sie einfach rekonstruieren, dass <span class="actor a">Alice</span> infiziert sein muss. Wenn sie ihre App so modifiziert, dass sie auch Datum und Uhrzeit der Kontakte erfasst und sich notiert, wann sie mit wem in Kontakt war, kann <span class="actor e">Eve</span> das gleiche Prinzip auch auf mehrere Kontakte anwenden.

+++ vis-attacks 3

<span class="actor e">Eve</span> nutzt auch ausgeklügeltere Methoden. Sie kann zum Beispiel Richtantennen und Überwachungskameras so positionieren, dass beide den gleichen Bereich abdecken. Das erlaubt ihr, die eigentlich anonyme ID mit einem Bild von <span class="actor a">Alice</span> zu verknüpfen. Dafür muss <span class="actor e">Eve</span> selbst gar nicht in der Nähe sein.

+++ vis-attacks 4

Sobald <span class="actor a">Alice</span> ihre IDs veröffentlicht, gleicht <span class="actor e">Eve</span> diese mit ihrer Datenbank ab und findet das Bild der jetzt positiv getesteten <span class="actor a">Alice.</span>

+++ vis-attacks 5

Währenddessen versucht <span class="actor m">Mallot,</span> falsche Warnungen auszulösen, damit Leute sich fälschlicherweise in Quarantäne begeben. Das funktioniert, indem er mit seinem Angriffsziel <span class="actor b">Bob</span> in Kontakt tritt und danach behauptet, er selbst wäre infiziert.

+++ vis-attacks 6

Das ist allerdings gar nicht so einfach. Denn um als infiziert zu gelten, benötigt man einen Bestätigungscode, den man nur nach einem <span class="highlight pink">positiven Testbefund</span> von den Behörden erhält.

+++ vis-attacks 7

Um seine IDs auf dem Server zu platzieren, müsste <span class="actor m">Mallot</span> also technisch in das System eindringen oder durch Bestechung einen gültigen Authentifizierungscode erhalten. Gelingt ihm das, könnte er sogar ganze Gruppen in Isolation schicken, indem er Antennen an hoch frequentierten öffentlichen Orten aufstellt.

+++ vis-attacks 8

Ein andere Möglichkeit wäre, dass <span class="actor m">Mallot</span> die IDs von Personen versendet, die wahrscheinlich in naher Zukunft positiv getestet werden. Ein Beispiel: <span class="actor m">Mallot</span> platziert eine Antenne in einem Corona-Testzentrum und eine weitere in der Nähe von <span class="actor b">Bob.</span>

+++ vis-attacks 9

Wenn <span class="actor a">Alice</span> das Testzentrum besucht, leiten die Antennen ihre ID direkt weiter an <span class="actor b">Bob.</span> Seine App geht davon aus, dass es sich um einen echten Kontakt handelt.

+++ vis-attacks 10

Sobald <span class="actor a">Alice</span> nun ihre Infektion meldet, wird <span class="actor b">Bob</span> <span class="highlight yellow">gewarnt</span> und begibt sich in Selbstquarantäne. 

+++ text-next

## What’s Next?

Trotz des Privatsphäre-schützenden Ansatz birgt das Tracing per App Risiken. In welcher Dimension diese Risiken ausgenutzt werden, lässt sich nur schwer abschätzen. Wägt man Vor- und Nachteile ab, überwiegt unserer Meinung nach die verminderte Wahrscheinlichkeit, andere Menschen im Falle einer eigenen Infektion anzustecken, gegenüber den Sicherheitsrisiken einer Tracing-App. Auch ein [Gutachten von id est avocats](https://github.com/DP-3T/documents/blob/master/data_protection/DP-3T%20Model%20DPIA.pdf) schätzt diese Restrisiken als vertretbar ein, sofern NutzerInnen ausdrücklich darauf hingewiesen werden.

Die Europäische Union geht davon aus, dass [etwa 60%](https://ec.europa.eu/health/sites/health/files/ehealth/docs/covid-19_apps_en.pdf) der Bevölkerung die App nutzen und befolgen müssten, um Infektionsketten nachhaltig zu durchbrechen. Entschließen sich weniger Menschen zur Nutzung, lässt sich die Reproduktionszahl trotzdem senken. Tracing-Apps sollten also als Ergänzung und nicht als Ersatz zu gängigen Maßnahmen wie Hygiene- und Abstandsregeln verstanden werden. Im Erfolgsfall können sie dazu beitragen, einschränkende Maßnahmen zu lockern und damit das Dilemma aus Einschränkungen und Infektionsgefahr zu lösen.


+++ text-footer 

### Hintergrund

Unsere Arbeit bezieht sich auf das von DP3T veröffentlichte Framework «Decentralized Privacy-Preserving Proximity Tracing». Alle Dokumente sind auf [Github](https://github.com/DP-3T/documents) öffentlich einsehbar. Nationale Umsetzungen können sich davon unterscheiden.

### Weiterführende Links
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

Berlin, 2020. [Dieses Werk](https://tracing.ft0.ch/) ist lizensiert unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/?ref=ccchooser). Der Source Code ist auf [Github](https://github.com/fidelthomet/privacy-preserving-proximity-tracing/) veröffentlicht.


### Impressum

Verantwortlich für diese Webseite sind Thomas Haas & Fidel Thomet. Für Inhalte auf verlinkte externe Seiten sind wir nicht verantwortlich.

### Kontakt

Wir sind erreichbar über Twitter [@thomashaaas](https://twitter.com/thomashaaas) & [@fidelthomet](https://twitter.com/fidelthomet)<br>und Mail: <a href="mailto:tracing@ft0.ch">tracing@ft0.ch</a>.

### Datenschutz

Beim Besuch dieser Webseite werden folgende Informationen auf dem Server in Logfiles gespeichert: Die IP-Adresse, der Browser und das Betriebssystem der Besucherin / des Besuchers, der Zeitpunkt des Besuchs, die aufgerufenen Webseiten und angefragten Dateien und, sofern übermittelt, welche Webseite auf diese verwiesen hat.

Die aufgezeichneten Daten dienen der Fehlersuche und Absicherung des Servers und werden nach 14 Tagen automatisiert gelöscht. Die Daten werden nicht an Dritte übermittelt. Die Webseite verwendet weder Cookies noch werden externe Inhalte eingebettet.

+++ dict

isolation → Isolation
immunity → Immunität