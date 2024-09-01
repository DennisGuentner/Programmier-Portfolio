/* Importieren von Dateien*/
const fs = require('fs');
const userController = require('./userController');
const equipmentController = require('./equipmentController');

/* Deklarieren von Variablen */
let borrowData;
let borrowList;

/* Abfrage ob der Ordner models existiert*/
if (!fs.existsSync('./models')) {
    fs.mkdirSync('./models');
}

/* Versuch die Datei einzulesen */
try {
    borrowData = fs.readFileSync('./models/borrowList.json');  
} catch (err) {                                                             // Wenn der Versuch fehlschlägt, wird die Datei erstellt          
    fs.writeFileSync('./models/borrowList.json', '', function(error) {      // borrowList.json wird erstellt
        if (error) throw error;                                             // Wenn die Json Datei nicht Existiert
        comsole.log('create file borrowList.json!');                        // Gibt Nachricht Zurück
    });      
    borrowData = fs.readFileSync('./models/borrowList.json');               // Erstelltes leeres borrowList.json wird eingelesen
}

//Von Dennis Güntner verfasst!
/* Befüllung des Arrays */
borrowList = borrowData.length === 0 ? [] : JSON.parse(borrowData);  

//Von Dennis Güntner verfasst!
/* Prüfung für andere Controller */
const isEquipmentBorrowed = (equipmentID) => {
    return borrowList.findIndex(element => element.ausleihartikelID == equipmentID ) === -1 ? false : true;
}

//Von Dennis Güntner verfasst!
/* Prüfen ob User etwas Ausgeleihen hat */
const hasUserBorrowed = (userID) => {
    return borrowList.findIndex(element => element.benutzerID == userID) === -1 ? false : true;
}

//Von Dennis Güntner verfasst!
/* Debug */
const postValidation = (post) => {
    let errors = "";
    const isNumber = /^\d+$/;                                                           // Prüfen ob es eine Zahl ist 
    const isValidDate =  /^(19|20)\d\d\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/;    // Prüfen ob es ein Datum ist 

    /* Falls ein Wert nicht gesendet wurde, oder leer ist, wird eine Fehlermeldung generiert */
    //if (!post.startdatum) errors += "startdatum ist leer\n";
    if (!post.enddatum) errors += "enddatum ist leer oder wurde nicht gesendet\n";
    else if(!isValidDate.test(post.enddatum)) errors += "Datumsformat ist nicht valide. Beispiel für korrektes Format: 2024.06.12\n";
    if (!post.benutzerID) errors += "benutzerID ist leer oder wurde nicht gesendet\n";
    else if(!isNumber.test(post.benutzerID)) errors += "benutzerID muss eine Zahl sein\n";
    if (!post.ausleihartikelID) errors += "ausleihartikel ist leer oder wurde nicht gesendet\n";
    else if(!isNumber.test(post.ausleihartikelID)) errors += "ausleihartikelID muss eine Zahl sein\n";

    return errors;
};

//Von Dennis Güntner verfasst!
/* Prüft ob der String eine Zahl ist */
const idValidation = (id) => {
    const isNumber = /^\d+$/;                                                // Ist es eine Zahl 

    return isNumber.test(id) ? true : false;                                 // Rückgabe True oder False 
}

// Per ChatGPT erstellt!
/* Für das Startdatum*/
const getCurrentDatePlusTerm = () => {
    let date = new Date();
   // date.setDate(date.getDate() + borrowTime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');             // Monat geht von 0 bis 11, deswegen +1
    const day = String(date.getDate()).padStart(2, '0');                    // padstart sorgt dafür dass bei 1-9 eine Null davor geschrieben wird. z.B. 08

    return '' + year + '.' + month + '.' + day;
};

/* Gib ganzes Equipment aus */
const getAllBorrow = () => {
    /* Fehlermeldungen */
    let nothingBorrowed = 'Es sind keine Ausleihen in der Liste eingetragen!'; // Fehlermeldung

    return borrowList.length > 0 ? borrowList : nothingBorrowed;            // Rückgabe der Borrow Daten oder einer Fehlermeldung 
};

/* Erstelle einer Ausleihe */
const createBorrow = (post) => {
    let newBorrow;
    let userID;
    let equipmentID;
    let borrowStartDate = getCurrentDatePlusTerm(); 

    /* Fehlermeldungen */
    let postValidationErrors;
    let userDoesNotExist ='Der Benutzer der den Artikel ausleihen will exisitert nicht!';
    let equipmentDoesNotExist ='Der Artikel der vom User ausgeliehen werden soll exisitiert nicht!';

    /* Debug */
    postValidationErrors = postValidation(post);                        // Prüfen ob alle Informationen verhanden sind
    if (postValidationErrors) return postValidationErrors;              // Wenn nicht. Rückgabe der Fehlermeldung

    /* Existiert der Benutzer der den Artikel ausleihen will? */
    userID = parseInt(post.benutzerID, 10);
    //if(!userController.doesUserExist(userID)) return userDoesNotExist;

    /* Existiert der Artikel der ausgeliehen werden soll? */
    equipmentID = parseInt(post.ausleihartikelID, 10);
    //if(!equipmentController.doesEquipmentExist(equipmentID)) return equipmentDoesNotExist;

    /* Erstellen eines Eintrags in borrowList.json */
    newBorrow = {
        id: borrowList.length > 0 ? borrowList[borrowList.length - 1].id + 1 : 0,           // Einlesen id
        benutzerID: userID,                                                                 // Einlesen userID
        startdatum: borrowStartDate,                                                        // Einlesen startdatum
        enddatum: post.enddatum,                                                            // Einlesen enddatum
        ausleihartikelID: equipmentID                                                       // Einlesen equipmentID 
    };

    borrowList.push(newBorrow); // neuer Borrow wird in userList Array gepackt 
    fs.writeFileSync('./models/borrowList.json', JSON.stringify(borrowList, null, 2));      // Daten werden in borrowList.json gespeichert!

    return { data: newBorrow };                                                             // Rückgabe des neu erstellten Borrow
};

/* Suche eine Ausleihe */
const getBorrowById = (id) => {
    let borrow;

    /* Fehlermeldungen */
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist keine Ausleihe mit der ID: ' + id + ' in der Liste eingetragen.';
    
    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    borrow = borrowList.find(element => element.id == id);                                  // borrowList array wird nach id abgesucht

    return borrow ? borrow : idDoesntExist;                                                 // Rückgabe des borrow oder der Fehlermeldung
};

/* Aktualisiere einer Ausleihe */
const updateBorrow = (id, post) => {
    let index;
    let userID;
    let equipmentID;

    /* Fehlermeldungen */
    let postValidationErrors;
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist keine Ausleihe mit der ID: ' + id + ' in der Liste eingetragen.';
    let userDoesNotExist ='Der Benutzer der den Artikel ausleihen will exisitert nicht!';
    let equipmentDoesNotExist ='Der Artikel der vom User ausgeliehen werden soll exisitiert nicht!';

    /* Debug */
    postValidationErrors = postValidation(post);                                        // Prüfen ob alle Informationen verhanden sind
    if (postValidationErrors) return postValidationErrors;                              // Rückgabe der Fehlermeldung

    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    /* Existiert eine Ausleihe mit der ID */
    index = borrowList.findIndex(element => element.id == id);                          // Existiert ein User mit der ID
    if (index === -1) return idDoesntExist;                                             // Rückgabe Fehlermeldung

    /* Existiert der Benutzer der den Artikel ausleihen will? */
    userID = parseInt(post.benutzerID, 10);
    //if(!userController.doesUserExist(userID)) return userDoesNotExist;

    /* Existiert der Artikel der ausgeliehen werden soll? */
    equipmentID = parseInt(post.ausleihartikelID, 10);
    //if(!equipmentController.doesEquipmentExist(equipmentID)) return equipmentDoesNotExist;

    /* Erstellen eines Eintrags in borrowList.json */
    let borrowToChange = {
        id: id,                                                                         // Einlesen id 
        benutzerID: userID,                                                             // Einlesen userID
        startdatum: borrowList[index].startdatum,                                       // Einlesen startdatum 
        enddatum: post.enddatum,                                                        // Einlesen Enddatum 
        ausleihartikelID: equipmentID                                                   // Einlesung equipmentID
    };

    borrowList[index] = borrowToChange;                                                 // An der stelle des Index Array wird geupdatet
    fs.writeFileSync('./models/borrowList.json', JSON.stringify(borrowList, null, 2));  // Definition wohin mit den Daten und welche Darstellung diese haben sollen

    return { update: borrowToChange };                                                  // Rückgabe des geupdatet borrow
};

const deleteBorrow = (id) => {
    let index;

    /* Fehlermeldungen */
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist keine Ausleihe mit der ID: ' + id + ' in der Liste eingetragen.';

    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    /* Existiert eine Ausleihe mit der ID */
    index = borrowList.findIndex(element => element.id === id);
    if (index === -1) return idDoesntExist;

    /* Ansonsten wird der borrow gelöscht */
    borrowList.splice(index, 1);                                                        // borrow wird mit der ID gelöscht 

    fs.writeFileSync('./models/borrowList.json', JSON.stringify(borrowList, null, 2));  // Definition wohin mit den Daten und welche Darstellung diese haben sollen
    console.log("Löschen erfolgreich");

    return { data: borrowList };                                                        // Rückgabe der Werte von borrowList
};

/* Exports */
module.exports = {
    getAllBorrow,
    createBorrow,
    getBorrowById,
    updateBorrow,
    deleteBorrow,
    isEquipmentBorrowed,
    hasUserBorrowed
};