<h2>C-Holidays</h3>
<h4>KWM227 - Clientside Web Programming</h3>
<b>Author:</b> Daniel Saiz  

<h4>Introduction</h4>
C-Holidays was developed during the course CWP.
The goal was to create a simple web-application without using a Javascript framework.
<br><br>
In detail the web-application was implemented as a Single Page Application (SPA).
The application is based on the MVC-Pattern (Model, View, Controller), without using the controller part.
There is also a connection to an external API and a implemented indexed database, which allows the 
application to store data for the client. By using the localStorage, it is also possible to store the 
users session and keep in logged in, until the user is willing to logout.

<h4>Components</h4>
1. App Core, which works as the brain of the functions
2. Frontend (Views) + Translation: The SPA is implemented bilingual, another language can be added at any
time.
3. Classes + APIs: the application keeps its things as objects, all the data for the application is provided by
2 external JSON-Files, which act as our API. Furthermore there was a map included for both cities and hotels.
The Maps are using the open-source JavaScript library *leaflet*.
4. Local Database: As already mentioned, the application is using a local indexed database, in which all users on 
this device and their favorite hotels and cities are stored and managed.
By using the local Storage the current user remains logged in.

<h4>Discussion</h4>
It was easy to implement the map for the hotels, just by using the given latitude and longitude, in connection with
the leaflet js-library. But it was not that easy to get the cities map, because no coordinates have been provided 
for this kind of usage. So I had to improvise and looked for a suitable site that would provide me the relevant data.
<br><br>

```javascript
 loadCityMap(){
     $.get({
         url: 'https://geocode.xyz/${this.name.replace(/\s+/g, '%20')}?geoit=csv',
         async: true
     }, (data) => {
         let lat = data.split(",")[2];
         let lng = data.split(",")[3];

         let mymap = L.map('mapid').setView([lat, lng], 5);

         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             maxZoom: 19
         }).addTo(mymap);

         L.marker(L.latLng(lat, lng)).addTo(mymap);
     });
 }
```

By using an AJAX-Call to the external website named *geocode.xyz* and adding the city name to the url. I was able to 
get my latitude and longitude, also for my cities.
Unfortunately, the site throws errors if it is requested too many times in succession.
But hey... it works! :) 

The reason i chose an indexed db was simply the fact, that I have not used this kind of storage before, I just wanted
to try out new stuff. It also keeps my stored data clean and simple, it just needed some time to setup the necessary 
functions in my Core Model.

