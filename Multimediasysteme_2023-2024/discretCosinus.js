/*In dieser Aufgabe wird die Diskrete COosinus Transformation implementiert */

const express = require('express');
const router = express.Router();

//Methoden zum berechnen des DCT
var DCT = {
    compute: function(dctInput) {
        let cU, cV, sum;
        let dctOutput = "";
        const OneOversqrt2 = 1 / Math.sqrt(2); //Stand vorher in der for Schleife. wurde mithilfe von chatGPT optimiert.
        const PiOver16 = Math.PI / 16; //Genau wie OneOversqrt2
        const DctMatrix = dctInput.trim().split(/\,/).map(Number);
        
        
        for(let u = 0; u < 8; u++){
            for(let v = 0; v < 8; v++){
                //C(u) und C(v) werden ermittelt
                cU = u == 0 ? OneOversqrt2 : 1;
                cV = v == 0 ? OneOversqrt2 : 1;
                
                sum = 0;
                for(let j = 0; j < 8; j++) {
                    for(let k = 0; k < 8; k++) {
                        sum =   sum 
                            +   DctMatrix[8 * j + k]
                            *   Math.cos((2 * j + 1) * u * PiOver16)
                            *   Math.cos((2 * k + 1) * v * PiOver16);
                    }
                }

                //Das Ergebnis wird direkt in einem String zur Ausgabe gespeichert!
                dctOutput += Math.round(cU * cV * sum / 4) + ", ";
            }

            dctOutput += '\n';
        }

        return dctOutput;
    }
}

router.route('/')
    .get((req, res) => {
        res.render('discretCosinus', {title:"Diskrete Cosinus Transformation"});
    })
    .post((req, res) => {
        var dctInput = req.body.input;
        var dctOutput;

        dctOutput = DCT.compute(dctInput);

        res.render('discretCosinus',{title:"Diskrete Cosinus Transformation", dctOutput:dctOutput});
    })

module.exports = router;