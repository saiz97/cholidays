###TODO List 
####C-Holiday

TODO #1: using disallowed languages @core.translator.js

TODO #2: Breadcrumbs  
Eine relativ einfache Möglichkeit wäre, in jeder View die 
Breadcrumbs zu definieren (bspw. schon im Konstruktor?) 
Die class.view.js hat dann eine Logik, diese sauber auszugeben.

✔ TODO #3: Translate dynamic content (hoteldetail, citydetail)

TODO #4: collapsible Hamburger Menu

_____
✔ fixed Bug: reload on language change

✔ fixed Bug: Login/Logout button not working, when language switch

Bug: when clicking Logo or other reference article (a-tag with href="#"), then city output is doubled... why?
fixed it by binding them and preventing Default behavior + setting up slug