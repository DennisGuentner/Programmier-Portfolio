/*In dieser Aufgabe wird die Verschluesselung Ceasers Cipher implementiert */

const express = require('express');
const router = express.Router();

const CeasarCipher = {

    //Methode zum ermitteln des Schluessels:
    getKey: function(input) {
        //Countertafel für jeden einzelnen Buchstaben erzeugen
        let temp;
        let mostFrequentLetter;
        let alphabetCounter = new Array(26).fill(0);

        //Die Menge wie oft ein Buchstabe im Text verkommt wird ermittelt. Groß- und Kleinschreibung werden dabei berücksichtigt!
        for(let i = 0; i < input.length; i++) {
            temp = input.charCodeAt(i)

            if(temp >= 97 && temp <= 122) alphabetCounter[temp - 97]++;
            else if(temp >= 65 && temp <= 90) alphabetCounter[temp - 65]++;
        }

        /*Der häufigste Buchstabe im Text wird ermittelt!
        "..." Ist der spread Operator und sorgt dafür dass der Array in individuelle Argumente ingeteilt wird.*/
        mostFrequentLetter = alphabetCounter.indexOf(Math.max(...alphabetCounter));

        /*for(var i = 0; i < alphabetCounter.length; i++) {     * Code bevor ich per ChatGPT optimierte.
            if(highestCount < alphabetCounter[i]){
                highestCount = alphabetCounter[i];
                mostFrequentLetter = i;
            }
        }*/


        /*Verschiebung wird berechnet:
            - Es wird davon ausgegangen dass es sich um einen Deutschen Text handelt
            - Demnach ist der am warscheinlich häufigste Buchstabe das e
            - Weswegen man den ermittelten häufigsten Buchstaben nun nach e verschieben soll
            - e ist die position 5 im Alphabet.
            - in diesen Fall 4 im Array!
            - da ich nach vorne schiebe um per % auf 26 begrenze ist die Verschiebung: (mostFrequentLetter - 4 + 26) % 26
            - oder: */
        return (mostFrequentLetter + 22) % 26 //key muss im Beispiel 10 sein!!!!!!
    },

    

    //Methode zum neu zuordnen der Buchstaben mit dem Schluessel:
    //Das verschieben funktioniert da mit %26 dafür gesorgt wird dass der ASCII code innerhalb von den 26 gewünschten Zeichen bleibt. 
    //* Dafür muss man jedoch vorhin das Zeichen abziehen, wo der ASCII Code beginnt und danach wieder hinzufügen!
    relabelLetter: function(input, key) {
        var temp;
        var output = "";

        for(var i = 0; i < input.length; i++) {
            temp = input.charCodeAt(i);

            if(temp >= 97 && temp <= 122) temp = (temp - 97 + key) % 26 + 97;

                /*temp -= key;         * Code bevor ich per ChatGPT optimierte.

                if(temp < 97) temporary += 26; */
            
            else if(temp>= 65 && temp <= 90) temp = (temp - 65 + key) % 26 + 65;
                /*temp -= key;         *Wie im if darüber!

                if(temp < 65) temp += 26;*/
            
            output += String.fromCharCode(temp);
        }

        return output;
    }
  };



router.route('/')
    .get((req, res) => {
        res.render('ceasarCipher', {title:"Ceasars Cipher"});
    })
    .post((req, res) => {
        //Inhalte aus dem Body entnehmen:
        let input = req.body.input;
        var key = req.body.key;
        var button = req.body.button;
        var output; //Als Ergebniss zu befüllenden String definieren

        if(button === "encrypt") {
            if(key == "") {
                output = "Es wurde kein Schluessel eingegeben mit dem man den Text verschluesseln kann.\nBitte gebe einen Schluessel ein!";
            } else {
                key = parseInt(key);
                output = CeasarCipher.relabelLetter(input, key);
            }  
        } else { 
            //Falls kein Schluessel genannt wurde, wird er ermittelt.
            key = key == "" ? CeasarCipher.getKey(input) : parseInt(key);

            //Die Buchstaben werden mit dem Schluessel hier neu zugeordnet!!!
            output = CeasarCipher.relabelLetter(input, 26 - key);
        }

        res.render('ceasarCipher', {title:"Ceasars Cipher", output:output, calculatedKey:key})
    });

module.exports = router;