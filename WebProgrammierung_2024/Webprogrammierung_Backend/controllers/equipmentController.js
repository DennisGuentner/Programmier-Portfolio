/* Importieren von Dateien*/
const fs = require('fs');
let userController = require('./userController');
let borrowController = require('./borrowController');

/* Deklarieren von Variablen */
let equipmentData; 
let equipmentList;

/* Abfrage ob der Ordner models existiert*/
if (!fs.existsSync('./models')) {
    fs.mkdirSync('./models');                                                // Ansonsten wird der Ordner erstellt!
}

/* Versuch die Datei einzulesen */
try {
    equipmentData = fs.readFileSync('./models/equipmentList.json');          // Wenn der Versuch fehlschlägt, wird die Datei erstellt
} catch (err) {
    fs.writeFileSync('./models/equipmentList.json', '', function (error) {   // equipmentList.json wird erstellt
        if (error) throw error;                                              // Wenn die Json Datei nicht Existiert
        console.log('created file equipmentList.json!');                     // Gibt Nachricht Zurück             
    });

    equipmentData = fs.readFileSync('./models/equipmentList.json');          // Erstellt leeres equipmentList,json wird eingelesen 
}

/* Befüllung des Arrays */
equipmentList = equipmentData.length > 0 ? JSON.parse(equipmentData) : [];

//Von Dennis Güntner verfasst!
/* Prüfung für andere Controller */
const doesEquipmentExist = (equipmentID) => {
    return equipmentList.findIndex(element => element.id == equipmentID) === -1 ? false : true;
};

//Von Dennis Güntner verfasst!
/* Prüfung ob User was Ausgeliehen hat */
const doesUserOwnEquipment = (userID) => {
    return equipmentList.findIndex(element => element.benutzerID == userID) === -1 ? false : true;
}

//Von Dennis Güntner verfasst!
/* Prüfung der Vollständigkeit für Post */
const postValidation = (post) => {
    let errors = "";
    const isNumber = /^\d+$/;                                               // Prüft ob es eine Zahl ist 

    /* Falls ein Wert nicht gesendet wurde, oder leer ist, wird eine Fehlermeldung generiert */
    if (!post.artikelnummer) errors += "artikelnummer ist leer oder wurde nicht gesendet\n";
    else if(!isNumber.test(post.artikelnummer)) errors += "artikelnummer muss eine Zahl sein\n";
    if (!post.titel) errors += "titel ist leer oder wurde nicht gesendet\n";
    if (!post.bild) errors += "bild ist leer oder wurde nicht gesendet\n";
    if (!post.beschreibung) errors += "beschreibung ist leer oder wurde nicht gesendet\n";
    if (!post.anzahl) errors += "anzahl ist leer oder wurde nicht gesendet\n";
    else if(!isNumber.test(post.anzahl)) errors += "anzahl muss eine Zahl sein\n";
    if(!post.benutzerID) errors += "benutzerID ist leer oder wurde nicht gesendet\n";
    else if(!isNumber.test(post.benutzerID)) errors += "benutzerID muss eine Zahl sein\n";

    return errors;
};

//Von Dennis Güntner verfasst!
/* Prüft ob der String eine Zahl ist */
const idValidation = (id) => {
    const isNumber = /^\d+$/;                                                // Ist es eine Zahl 

    return isNumber.test(id) ? true : false;                                 // Rückgabe True oder False 
}

/* Gib ganzes Equipment aus */
const getAllEquipment = () => {
    /* Fehlermeldungen */
    let noEquipment = 'Es sind keine Artikel in der Liste eingetragen!';     // Fehlermeldung

    return equipmentList.length > 0 ? equipmentList : noEquipment;           // Rückgabe der Equipment Daten oder einer Fehlermeldung 
};

/* Erstelle ein Equipment */
const createEquipment = (post) => {
    let newEquipment;
    let userID;

    /* Fehlermeldungen */
    let postValidationErrors;
    let userDoesNotExist ='Der Benutzer der den Artikel gehört oder verwaltet exisitert nicht!'

    /* Debug */
    postValidationErrors = postValidation(post);                            // Prüfen ob alle Informationen verhanden sind
    if (postValidationErrors) return postValidationErrors;                  // Wenn nicht. Rückgabe der Fehlermeldung

    /* Existiert der Benutzer der den Artikel gehören soll? */
    userID = parseInt(post.benutzerID, 10);
    //if(!userController.doesUserExist(userID)) return userDoesNotExist;

    /* Erstellen eines Eintrags in equipmentList.json */
    newEquipment = {
        id: equipmentList.length > 0 ? equipmentList[equipmentList.length - 1].id + 1 : 0,  // id des letzten Elements von equipmentList wird eingelesen und für das hinzuzufügende Element 
        artikelnummer: post.artikelnummer,                                                  // Einlesen artikelnummer
        titel: post.titel,                                                                  // Einlesen Titel
        bild: post.bild,                                                                    // Einlesen bild
        beschreibung: post.beschreibung,                                                    // Einlesen beschreibung
        anzahl: parseInt(post.anzahl, 10),                                                  // Einlesen anzahl 
        benutzerID: userID                                                                  // Einlesen userID
    };

    equipmentList.push(newEquipment);                                                           // neuer User wird in equipmentList Array gepackt 
    fs.writeFileSync('./models/equipmentList.json', JSON.stringify(equipmentList, null, 2));    // Daten werden in equipmentList.json gespeichert!

    return { equipmentData: newEquipment };                                                     // Rückgabe des neu erstellten Equipments 
};

/* Suche einen Artikel */
const getEquipmentById = (id) => {
    let equipment;

    /* Fehlermeldungen */
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist  = 'Es ist kein Artikel mit der ID: ' + id + ' in der Liste eingetragen.';
    
    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    equipment = equipmentList.find(element => element.id == id);                                // equipmentList array wird nach id abgesucht
    
    return equipment ? equipment : idDoesntExist;                                               // Rückgabe des users oder der Fehlermeldung
};

/* Aktualisiere einen Artikel */
const updateEquipment = (id, post) => {
    let equipmentToChange;
    let index;
    let userID;

    /* Fehlermeldungen */
    let postValidationErrors;
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist kein Artikel mit der ID: ' + id + ' in der Liste eingetragen.';

    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

    /* Debug */
    postValidationErrors = postValidation(post);                                                // Prüfen ob alle Informationen verhanden sind
    if (postValidationErrors) return postValidationErrors;                                      // Rückgabe der Fehlermeldung

    /* Existiert der Artikel? */
    index = equipmentList.findIndex(element => element.id == id);                               // Existiert der Artikel mit der ID 
    if (index === -1) return idDoesntExist;                                                     // Rückgabe Fehlermeldung

    /*Existiert der User? */
    userID = parseInt(post.benutzerID, 10);
    //if(!userController.doesUserExist(userID)) return userDoesNotExist;

    /* Ansonsten verändere den vorhandenen User aktualisiert */
    equipmentToChange = {
        id: id,                                                                                 // Einlesen id
        artikelnummer: post.artikelnummer,                                                      // Einlesen artikelnummer
        titel: post.titel,                                                                      // Einlesen titel
        bild: post.bild,                                                                        // Einlsesn bild
        beschreibung: post.beschreibung,                                                        // Einlesen beschreibung
        anzahl: parseInt(post.anzahl, 10),                                                      // Einlesung anzahl
        benutzerID: userID                                                                      // Einlesung userID
    };
    
    equipmentList[index] = equipmentToChange;                                                   // An der stelle des Index Array wird geupdatet
    fs.writeFileSync('./models/equipmentList.json', JSON.stringify(equipmentList, null, 2));    // Definition wohin mit den Daten und welche Darstellung diese haben sollen

    return { update: equipmentToChange };                                                       // Rückgabe des geupdatet Artikel
};

/* Lösche einen Artikel */
const deleteEquipment = (id) => {
    let index;

    /* Fehlermeldungen */
    let idIsNotANumber = "id muss eine Zahl sein!";
    let idDoesntExist = 'Es ist kein Artikel mit der ID: ' + id + ' in der Liste eingetragen.';
    let userStillBorrows = 'Der Artikel mit der ID: ' + id + ' ist von einem User ausgeliehen. Löschen nicht möglich!';

    /* Ist die ID eine Zahl? */
    if(!idValidation(id)) return idIsNotANumber;

     /* Existiert ein Artikel mit der ID?  */
    index = equipmentList.findIndex(element => element.id === id);
    if (index === -1) return idDoesntExist;

    /* Ist der Artikel noch von einem User ausgeliehen? */
    //if(borrowController.isEquipmentBorrowed(index)) return userStillBorrows;
    
    /* Ansonsten wird der Nutzer gelöscht */
    equipmentList.splice(index, 1);                                                             // Equipment wird mit der ID gelöscht 

    fs.writeFileSync('./models/equipmentList.json', JSON.stringify(equipmentList, null, 2));    // Definition wohin mit den Daten und welche Darstellung diese haben sollen
    console.log("Löschen erfolgreich");

    return { equipmentData: equipmentList };                                                    // Rückgabe der Werte von equipmentList
};

/* Exports */
module.exports = {
    getAllEquipment,
    createEquipment,
    getEquipmentById,
    updateEquipment,
    deleteEquipment,
    doesEquipmentExist,
    doesUserOwnEquipment
};