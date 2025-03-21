Dieses Bachelorprojekt ist in digitales Journal in der man Erlebnisse eintragen kann.
- Die Extention ist die die zip File!
- Es wurde von 4 Studenten realisiert.
- Wenn man ein neuen EIntrag erstellt lassen sich zudem ein Bild hinzufügen, eine Emotion auswählen und mehrere Hash-Tags hinzufügen.
- Auf der Hauptseite werden alle EInträge von jetzigen Datum abwärts angezeigt.
  - Falls zwei EInträge an verschiedenen Tagen erstellt wurden, wird das Datum des älteren Eintrages dazwischen angezeigt um eine Trennung der Tage darzustellen.
  - Auf der linken Seite lassen sich die EInträge durch die Tags filtern.
  - Auf der rechten Seite der Hauptseite ist ein Kalender welcher die den Mittelwert der Emotionen der Erlebnisse des jeweiligen Tages anzeigt.
    - Wird der Tag angeklickt wird auf den obersten Eintrag des gewählten Tages gescrollt. 
    - Der Kalender passt die Einträge und den Mittelwert der Emotionen der Einträge an, die durch die Tags gefiltert wurden.

Folgendes wurde von mir geschrieben:
- In der journaling/Classes/Controller/JournalingController.php
  - Zeile 47-60
  - Zeile 66-86 (Wurde von mir überarbeitet um in JournalingsArray den Mittelwert der int 'emotion' pro 'date' zu ermitteln, damit diese für den Kalender weiterverwendet werden können)
  - Zeile 102-170 (Mit der gleichen bearbeitung für den Kalender)
  - Zeile 200-197
  - Zeile 214-243
  
- Unter journaling/Resources/Private/Templates/List (bzw. ListWithTags. Beide sind identisch):
  - Zeile 20-43 (Tag Auswahl)
  - Zeile 53 
  - Zeile 57-59 (Anzeige des Datums falls dieser später ist als der vorige) 
  
- Unter journaling/Resources/Private/Templates/NewIMG:
  - Zeile 28-31
  
