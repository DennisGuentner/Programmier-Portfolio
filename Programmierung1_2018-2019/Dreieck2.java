//Die Datei Prog1HA8 gehört zu dieser Klasse

public class Dreieck2 {
    private int seiteA, seiteB, seiteC;

    Dreieck (int a, int b, int c) { // Konstruktor 
    } // negative Zahlen und Laenge 0 ist hier ok
      // wird aber durch istDreieck abgefangen
    
    public String toString() {
        // Beispielausgabe: "DREIECK(1,3,3)"
        return "Dreieck:";
    }
  
    public boolean istDreieck () {
        int max = Math.max(Math.max(seiteA, seiteB), seiteC); 
        return seiteA > 0 && seiteB > 0 && seiteC > 0 &&
            (max < seiteA + seiteB + seiteC - max); 
    }
    
    public boolean rechtwinklig() {
        return false;
    } 

    public boolean gleichseitig() {
        return false;
    }
    
    public boolean gleichschenklig() {
        return false;
    }

    public void zeichne () { }
}
