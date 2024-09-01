/* Importieren von Dateien*/
const fs = require('fs');
const equipmentController = require('./equipmentController');
const borrowController = require('./borrowController');

/* Deklarieren von Variablen */
let userData
let userList; 

/* Abfrage ob der Ordner models existiert*/
if (!fs.existsSync('./models')) {
    fs.mkdirSync('./models');                                         // Ansonsten wird der Ordner erstellt!
}

/* Versuch die Datei einzulesen */
try {
    userData = fs.readFileSync('./models/userList.json');
} catch (err) {                                                       // Wenn der Versuch fehlschlägt, wird die Datei erstellt
    fs.writeFile('./models/userList.json', '', function (error) {     // userList.json wird erstellt
        if (error) throw error;                                       // Wenn die Json Datei nicht Existiert
        console.log('created file userList.json!');                   // Gibt Nachricht Zurück             
    });

    userData = fs.readFileSync('./models/userList.json');             // Erstelltes leeres userList.json wird eingelesen
}

/* Befüllung des Arrays */
userList = userData.length > 0 ? JSON.parse(userData) : [];

//Von Dennis Güntner verfasst!
/* Prüfung für andere Controller */
const doesUserExist = (userID) => {
    return userList.findIndex(element => element.id == userID) === -1 ?  false : true;
};

//Von Dennis Güntner verfasst!
/* Prüfung der Vollständigkeit für Post */
const postValidation = (post) => {
    let errors = "";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;                       // Prüft ob ein "@" und "." Zeichen vorhanden ist. Ob ein zeichen vor und nach dem "@"" vorhanden ist, und ob ein Zeichen nach dem "." vorhanden ist

    /* Falls ein Wert nicht gesendet wurde, oder leer ist, wird eine Fehlermeldung generiert */
    if(!post.name) errors += "name ist leer oder wurde nicht gesendet\n";
    if(!post.email) errors += "email ist leer oder wurde nicht gesendet\n";
    else if(!isEmail.test(post.email)) errors += "e-mail ist nicht valide. Die Form muss name@domain sein. Beispiel: MaxMustermann@mustermail.com\n";
    if(!post.rolle) errors += "rolle ist leer oder wurde nicht gesendet\n";
    if(!post.passwort) errors += "passwort ist leer oder wurde nicht gesendet\n";

    return errors;
};

//Von Dennis Güntner verfasst!
/* Prüft ob der String eine Zahl ist */
const idValidation = (id) => {
    const isNumber = /^\d+$/;                                           // Ist es eine Zahl 

    return isNumber.test(id) ? true : false;                            // Rückgabe True oder False 
}

//Per ChatGPT erstellt
/* Für das Erstellungsdatum des Users */
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');         // Monat geht von 0 bis 11, deswegen +1
    const day = String(date.getDate()).padStart(2, '0');                // padstart sorgt dafür dass bei 1-9 eine Null davor geschrieben wird. z.B. 08

    return '' + year + '.' + month + '.' + day;
};

/* Gib alle User aus */
const getAllUsers = () => {
    /* Fehlermeldungen */
    let noUsers = 'Es sind keine Benutzer in der Liste eingetragen!';   // Fehlermeldung

    return userList.length > 0 ? userList : noUsers;                    // Rückgabe der User Daten oder einer Fehlermeldung 
};

/* Erstelle einen User */
const createUser = (post) => {
    let newUser;
    let date = getCurrentDate();

    /* Fehlermeldungen */
    let postValidationErrors;

    /* Debug */
    postValidationErrors = postValidation(post);                                // Prüfen ob alle Informationen verhanden sind
    if(postValidationErrors) return postValidationErrors;                       // Wenn nicht. Rückgabe der Fehlermeldung
    
    /* Erstellen eines Eintrags in userList.json */
    newUser = {                                                                 // Variable wir überschrieben
        id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 0,     // id des letzten Elements von userList wird eingelesen und für das hinzuzufügende Element 
        name: post.name,                                                        // Einlesen name
        email: post.email,                                                      // Einlesen mail
        rolle: post.rolle,                                                      // Einlesen rolle
        passwort: post.passwort,                                                // Einlesen passwort
        erstellungsdatum: date                                                  // Einlesen erstellungsdatum
    }

    userList.push(newUser);                                                         // neuer User wird in userList Array gepackt 
    fs.writeFileSync('./models/userList.json', JSON.stringify(userList, null, 2))   // Daten werden in userList.json gespeichert!

    return {'data': newUser} ;                                                  // Rückgabe des neu erstellten Users
}

/* Suche einen User */
const getUserById = (id) => {
    let user;

    /* Fehlermeldungen */
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist  = 'Es ist kein Benutzer mit der ID: ' + id + ' in der Liste eingetragen.';
    
    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    user = userList.find(element => element.id == id);                          // userList array wird nach id abgesucht
    
    return user ? user : idDoesntExist ;                                        // Rückgabe des users oder der Fehlermeldung
}

/* Aktualisiere einen User */
const updateUser = (id, post) => {
    let userToChange;
    let index;

    /* Fehlermeldungen */
    let postValidationErrors;
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist kein Benutzer mit der ID: ' + id + ' in der Liste eingetragen.';

    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    /* Debug */
    postValidationErrors = postValidation(post);                                // Prüfen ob alle Informationen verhanden sind
    if(postValidationErrors != "") return postValidationErrors;                 // Rückgabe der Fehlermeldung
    
    /* Existiert der User? */
    index = userList.findIndex(element => element.id == id);                    // Existiert ein User mit der ID 
    if(index === -1 ) return idDoesntExist                                      // Rückgabe Fehlermeldung

    /* Ansonsten verändere den vorhandenen User aktualisiert*/
     userToChange = {
        id: id,                                                                 // Einlesen id 
        name: post.name,                                                        // Einlesen name
        email: post.email,                                                      // Einlesen mail
        rolle: post.rolle,                                                      // Einlesen rolle
        passwort: post.passwort,                                                // Einlesen passwort
        erstellungsdatum: userList[index].erstellungsdatum                      // Einlesen datum
    }
    
    userList[index] = userToChange;                                                 // An der stelle des Index Array wird geupdatet
    fs.writeFileSync('./models/userList.json', JSON.stringify(userList, null, 2))   // Definition wohin mit den Daten und welche Darstellung diese haben sollen

    return{'update': userToChange};                                             // Rückgabe des geupdatet User 
}

/* Lösche einen Benutzer */
const deleteUser = (id) => { 
    let index;

    /* Fehlermeldungen */
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist kein Benutzer mit der ID: ' + id + ' in der Liste eingetragen.';
    let userStillHolds = 'Der Nutzer mit der ID: ' + id + ' gehört oder verwaltet immer noch einen Artikel. Löschen nicht möglich!';
    let userStillBorrows = 'Der Nutzer mit der ID: ' + id + ' hat einen Artikel ausgeliehen. Löschen nicht möglich!';
    
    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    /* Existiert ein User mit der ID?  */
    index = userList.findIndex(element => element.id === id);
    if(index === -1) return idDoesntExist;

    /* Besitzt oder verwaltet der Nutzer noch einen Artikel? */
    if(equipmentController.doesUserOwnEquipment(id)) return userStillHolds;

    /* Hat der Nutzer noch einen Artikel ausgeliehen? */
    if(borrowController.hasUserBorrowed(id)) return userStillBorrows;
    
    /* Ansonsten wird der Nutzer gelöscht */
    userList.splice(index, 1);                                                  // User wird mit der ID gelöscht 

    fs.writeFileSync('./models/userList.json', JSON.stringify(userList, null, 2)) // Definition wohin mit den Daten und welche Darstellung diese haben sollen
    console.log("Löschen erfolgreich");

    return {'data': userList}                                                   // Rückgabe der Werte von userList
}

/* Exports */
module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    doesUserExist
}