###TODO List 
####C-Holiday

✔ TODO #1: using disallowed languages @core.translator.js

✔ TODO #2: Breadcrumbs  

✔ TODO #3: Translate dynamic content (hoteldetail, citydetail)

✔ TODO #4: Favorite Cities + Hotels with indexedDb

✔ TODO #5: beautify stuff :-)

✔ TODO #6: do Favorites for Cities -> view.homepage.js
        add object to database
        check for reload if existing
        delete in database if checkedoff
_____
✔ fixed Bug: reload on language change

✔ fixed Bug: Login/Logout button not working, when language switch

✔ fixed Bug: when clicking Logo or other reference article (a-tag with href="#"), then city output is doubled... why?
fixed it by binding them and preventing Default behavior + setting up slug

✔ fixed Bug: favorite Hotels not loading, when City not favored 

✔ fixed Bug: when reloading Favorite page -> Navigation Tab not highlighted correctly

✔ fixed Bug: Breadcrumbs incorrect, when selected on favorite view

✔ fixed Bug: Its able to favor items, when not logged in -> user null is created as a placeholder in idb

✔ fixed Bug: on login view -> nav item 'homepage' ist active (shouldnt be)

✔ fixed Bug: snackbar message popping up, when logged in

✔ fixed Bug: click handler (login/logout) on favpage not working correctly
_____
### Arbeitsaufträge
_____

####Übungsaufgabe 1:
1. Konfiguriere Less für dein Projekt und deine IDE
2. Baue eine Translation-Engine
3. Erweitere deine Template-Engine, sodass du Teil-Templates
(Header, Footer) rendern kannst.
4. Baue ein Sprachmenü. Sprache soll per Cookie gespeichert werden.
5. Verpasse deiner Seite ein Grundlayout (Header, Footer, Login)

####Übungsaufgabe 2:
1. Lade Städte- und Hoteldaten aus der “API”
2. Baue eine Listen-Ansicht für Städte
3. Baue eine Detail-Ansicht für Städte
4. Binde eine Listen-Ansicht für Hotels in die Detailansicht der
Städte ein
5. Baue eine Detail-Ansicht für Hotels
6. Bonusaufgabe: Baue ein Bread-Crumb Menü

####Übungsaufgabe 3:
1. Ermögliche das Speichern von Städten und Hotels als Favoriten.
2. Favoriten sollten in allen Ausgaben (Listen/Single) als solche
erkennbar sein.
3. Favoritenliste sollt an einen Usernamen gebunden sein.
4. Ermögliche das Entfernen von Städten und Hotels aus Favoriten.
5. Richte eine View ein, wo alle favorisierten Ressourcen (List-View)
angezeigt werden.