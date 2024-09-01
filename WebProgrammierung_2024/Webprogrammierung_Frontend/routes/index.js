/*
/                   - Zeigt die Startseite mit allen Pflanzen an.
/article/:id        - Zeigt die Detailansicht einer einzelnen Pflanze an.
/dashboard          - Zeigt das Dashboard des angemeldeten Benutzers an.
/login              - Zeigt das Login-Formular an und verarbeitet die Login-Anfrage.
/logout             - Meldet den Benutzer ab und leitet zur Startseite weiter.
/userList           - Zeigt eine Liste aller Benutzer für Administratoren an.
/plantList          - Zeigt eine Liste aller Pflanzen für Administratoren an.
/createUser         - Zeigt das Registrierungsformular an und verarbeitet die Registrierung.
/updateUser/:id     - Zeigt das Formular zum Bearbeiten eines Benutzers an und verarbeitet die Aktualisierung.
/deleteUser/:id     - Löscht einen Benutzer.
/createPlant        - Zeigt das Formular zum Erstellen einer neuen Pflanze an und verarbeitet die Erstellung.
/updatePlant/:id    - Zeigt das Formular zum Bearbeiten einer Pflanze an und verarbeitet die Aktualisierung.
/deletePlant/:id    - Löscht eine Pflanze.
/createBorrow       - Erstellt eine neue Ausleihe.
/updateBorrow/:id   - Bearbeitet eine bestehende Ausleihe.
/deleteBorrow/:id   - Löscht eine Ausleihe. */

var express = require('express');
var router = express.Router();

// Nach dem Einloggen soll die Variable befüllt werden
let userData = [];
const url = 'http://localhost:3000';

// Diese Funktion simuliert eine Anmeldung, indem sie userData befüllt und die Daten an verschiedenen Punkten in den Webseiten abfragt.
const fillUserData = (temp) => {
  userData = {
    id: temp.id,
    username: temp.username,
    email: temp.email,
    role: temp.role,
    created: temp.created
  };
}





/* INDEX: Zeigt die Hauptseite mit allen Pflanzen an */
router.get('/', function(req, res, next) {
  fetch(url + '/equipment', {
    method: 'GET'
  })
  .then(response => {
    // Überprüfen, ob die Antwort erfolgreich ist
    if (!response.ok) {
      throw new Error('Netzwerk-Antwort war nicht ok');
    }
    // Die Antwort als JSON parsen
    return response.json();
  })
  .then(data => {
    console.log(data); // JSON-Daten der Pflanzen anzeigen
    res.render('index', {title: 'Event Flora', currentUrl: req.originalUrl, userData: userData, allPlants: data});
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* PFLANZE EINZELANSICHT: Zeigt Details zu einer einzelnen Pflanze */
router.get('/article/:id', function(req, res, next) {
  fetch(url + '/equipment/' + req.params.id, {
    method: 'GET'
  })
  .then(response => {
    // Überprüfen, ob die Antwort erfolgreich ist
    if (!response.ok) {
      throw new Error('Netzwerk-Antwort war nicht ok');
    }
    // Die Antwort als JSON parsen
    return response.json();
  })
  .then(data => {
    console.log(data); // JSON-Daten der Pflanze anzeigen
    res.render('SinglePlant', {title: 'Pflanze Einzelansicht', currentUrl: req.originalUrl, userData: userData, plant: data});
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





// Hilfsfunktion zum Filtern von Ausleihen nach Benutzer-ID
function filterBorrow(data) {
  var temp = [];
  data.forEach(function (element) {
    if(element.id == userData.id) temp.push(element);
  });
  return temp;
}

/* DASHBOARD: Zeigt das Dashboard des angemeldeten Benutzers an */
router.get('/dashboard', (req, res) => {
  if(userData.length == 0){
    res.send("Zugriff nicht gestattet. Melden Sie sich an!")
  } else {
    fetch(url + '/borrows', {
      method: 'GET'
    })
    .then(response => {
      // Überprüfen, ob die Antwort erfolgreich ist
      if (!response.ok) {
        throw new Error('Netzwerk-Antwort war nicht ok');
      }
      // Die Antwort als JSON parsen
      return response.json();
    })
    .then(data => {
      var temp = userData.role != 'Administrator' ? filterBorrow(data) : data;
      console.log(temp); // JSON-Daten der Ausleihen anzeigen
      res.render('dashboard', {title: 'Dashboard', currentUrl: req.originalUrl, userData: userData, borrows: temp});
    })
    .catch(error => {
      console.error('Es gab ein Problem mit der Fetch-Operation:', error);
      res.status(500).send('Server Error');
    });
  }
});





/* LOGIN: Zeigt das Login-Formular an und verarbeitet die Login-Anfrage */
router.route('/login')
.get((req, res) => {
  res.render('login', { title: 'Login', currentUrl: req.originalUrl, userData: userData, error: "" });
})
.post((req, res) => {
  fetch(url + '/users/byName?username=' + req.body.username, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    if(typeof data === 'string') res.render('login', { title: 'Login', currentUrl: req.originalUrl, userData: userData, error: data });

    // Prüfen, ob das Passwort übereinstimmt
    const temp = data[0];
    if(req.body.password === temp.password) {
      fillUserData(temp);
      // Weiterleiten zum Dashboard
      res.redirect('/dashboard');
    } else {
      res.send('Passwort falsch!');
    }
  });
});





/* LOGOUT: Meldet den Benutzer ab und leitet zur Startseite weiter */
router.get('/logout', (req, res) => {
  userData = [];
  res.redirect('/');
});





/* USERLIST: Zeigt eine Liste aller Benutzer für Administratoren an */
router.get('/userList', (req, res) => {
  fetch(url + '/users', {
    method: 'GET'
  })
  .then(response => {
    // Überprüfen, ob die Antwort erfolgreich ist
    if (!response.ok) {
      throw new Error('Netzwerk-Antwort war nicht ok');
    }
    // Die Antwort als JSON parsen
    return response.json();
  })
  .then(data => {
    console.log(data); // JSON-Daten der Benutzer anzeigen
    res.render('adminUsersView', {title: 'Dashboard', currentUrl: req.originalUrl, userData: userData, usersList: data});
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* PLANTLIST: Zeigt eine Liste aller Pflanzen für Administratoren an */
router.get('/plantList', (req, res) => {
  fetch(url + '/equipment', {
    method: 'GET'
  })
  .then(response => {
    // Überprüfen, ob die Antwort erfolgreich ist
    if (!response.ok) {
      throw new Error('Netzwerk-Antwort war nicht ok');
    }
    // Die Antwort als JSON parsen
    return response.json();
  })
  .then(data => {
    console.log(data); // JSON-Daten der Pflanzen anzeigen
    res.render('adminPlantsView', {title: 'Dashboard', currentUrl: req.originalUrl, userData: userData, plantList: data});
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* REGISTRIERUNG: Zeigt das Registrierungsformular an und verarbeitet die Registrierung */
router.route('/createUser')
.get((req, res) => {
  user = {
    id: "",
    username: "",
    email: "",
    role: ""
  };
  res.render('updateUser', { title: 'Registrierung', currentUrl: req.originalUrl, userData: userData, user: user});
})
.post((req, res) => {
  fetch(url + '/users', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers:{'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    // Neu registrierter Benutzer wird sofort angemeldet
    fillUserData(data);
    // Weiterleiten zum Dashboard
    res.redirect('/dashboard');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* UPDATE USER: Zeigt das Formular zum Bearbeiten eines Benutzers an und verarbeitet die Aktualisierung */
router.route('/updateUser/:id')
.get((req, res) => {
  fetch(url + '/users/' + req.params.id, {
    method: 'GET'
  })
  .then(response => {
    // Überprüfen, ob die Antwort erfolgreich ist
    if (!response.ok) {
      throw new Error('Netzwerk-Antwort war nicht ok');
    }
    // Die Antwort als JSON parsen
    return response.json();
  })
  .then(data => {
    console.log(data); // JSON-Daten des Benutzers anzeigen
    user = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role
    };
    res.render('updateUser', {title: 'Konto Bearbeiten', currentUrl: req.originalUrl, userData: userData, user: user});
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
})
.post((req, res) => {
  const id = 4; // Hier sollte die ID dynamisch ermittelt werden
  fetch(url + '/users/' + id, {
    method: 'PUT',
    body: JSON.stringify(req.body),
    headers:{'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    // Benutzer wird sofort aktualisiert
    if(id == userData.id) fillUserData(data);
    // Weiterleiten zum Dashboard
    res.redirect('/dashboard');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* User löschen: Löscht einen Benutzer */
router.get('/deleteUser/:id', (req, res) => {
  fetch(url + '/users/' + req.params.id, {
    method: 'DELETE',
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    res.redirect('/');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* NEUE PFLANZE ERSTELLEN: Zeigt das Formular zum Erstellen einer neuen Pflanze an und verarbeitet die Erstellung */
router.route('/createPlant')
.get((req, res) => {
  plant = {
    id: "",
    articlenumber: "",
    title: "",
    pic: "",
    description: "",
    count: "",
    userid: ""
  };
  res.render('updatePlant', { title: 'Neue Pflanze erstellen', currentUrl: req.originalUrl, userData: userData, plant: plant});
})
.post((req, res) => {
  fetch(url + '/equipment', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers:{'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Weiterleiten zur Pflanzenliste
    res.redirect('/plantList');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* PFLANZE BEARBEITEN: Zeigt das Formular zum Bearbeiten einer Pflanze an und verarbeitet die Aktualisierung */
router.route('/updatePlant/:id')
.get((req, res) => {
  fetch(url + '/equipment/' + req.params.id, {
    method: 'GET'
  })
  .then(response => {
    // Überprüfen, ob die Antwort erfolgreich ist
    if (!response.ok) {
      throw new Error("Pflanze existiert nicht");
    }
    // Die Antwort als JSON parsen
    return response.json();
  })
  .then(data => {
    console.log(data); // JSON-Daten der Pflanze anzeigen
    res.render('updatePlant', {title: 'Pflanze bearbeiten', userData: userData, currentUrl: req.originalUrl, plant: data});
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send("Pflanze existiert nicht");
  });
})
.post((req, res) => {
  fetch(url + '/equipment/' + req.params.id, {
    method: 'PUT',
    body: JSON.stringify(req.body),
    headers:{'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Weiterleiten zur Pflanzenliste
    res.redirect('/plantList');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* PFLANZE LÖSCHEN: Löscht eine Pflanze */
router.get('/deletePlant/:id', (req, res) => {
  fetch(url + '/equipment/' + req.params.id, {
    method: 'DELETE',
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Weiterleiten zur Pflanzenliste
    res.redirect('/plantList');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* NEUE AUSLEIHE ERSTELLEN: Erstellt eine neue Ausleihe */
router.post('/createBorrow', (req, res) => {
  fetch(url + '/borrow', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers:{'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Weiterleiten zur Pflanzenliste
    res.redirect('/plantList');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* AUSLEIHE BEARBEITEN: Bearbeitet eine bestehende Ausleihe */
router.post('/updateBorrow/:id', (req, res) => {
  fetch(url + '/borrow/' + req.params.id, {
    method: 'PUT',
    body: JSON.stringify(req.body),
    headers:{'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Weiterleiten zum Dashboard
    res.redirect('/dashboard');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});





/* AUSLEIHE LÖSCHEN: Löscht eine Ausleihe */
router.get('/deleteBorrow/:id', (req, res) => {
  fetch(url + '/borrow/' + req.params.id, {
    method: 'DELETE',
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      console.log(response.json().data);
      throw new Error(response);
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Weiterleiten zum Dashboard
    res.redirect('/dashboard');
  })
  .catch(error => {
    console.error('Es gab ein Problem mit der Fetch-Operation:', error);
    res.status(500).send('Server Error');
  });
});

module.exports = router;
