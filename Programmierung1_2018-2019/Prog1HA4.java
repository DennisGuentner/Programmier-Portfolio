// Programmierung 1 Hausaufgabe vom 25.11.2018
// Der Code ist völlig selber erstellt worden!
// Die Datei Obstkorb.java gehört dazu.

public class Prog1HA4 {
    
    public static void main(String[] args) {
        Obstkorb k = new Obstkorb();
        k.apfelRein(150);  // 150gr Apfel reinlegen
        k.apfelRein(99);   // kein Apfel rein
                           // auf der Konsole: "zu leicht"
        k.apfelRein(201);  // kein Apfel rein
                           // auf der Konsole: "zu schwer"
        k.apfelRein(200);
        System.out.println(k.obstGesamt());     // Ausgabe: 2
        System.out.println(k.gewichtGesamt());  // Ausgabe: 350
        for (int i=1; i <= 9; i++) {
            k.apfelRein(100);
        }
        // Ausgabe: "zu viele Aepfel"
        System.out.println(k.obstGesamt());     // Ausgabe: 10
        System.out.println(k.gewichtGesamt());  // Ausgabe: 1150
    }
}
