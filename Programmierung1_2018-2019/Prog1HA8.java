// Programmierung 1 Hausaufgabe vom 16.02.2019
// Die Dateien Dreieck2.java, Konto.java, Land.java, Quadrat.java und StdDraw.java gehören dazu.
public class Prog1HA8 {

    public static void main(String[] args) {

        // Aufgabe 1
        Quadrat q = new Quadrat(0.5,0.5,0.4);
        q.zeichne();

        // Aufgabe 2
        Konto k1 = new Konto(1000);
        Konto k2 = new Konto();
        k2.abheben(1000);
        k1.einzahlen(100);
        k1.abheben(1000);
        System.out.println(k1.abfragen() + " " + k2.abfragen());
        
        // Aufgabe 3
        Land ger = new Land("Deutschland", 80000000, 357365);
        Land usa = new Land("USA", 322000000, 9826675);
        Land fra = new Land("Frankreich", 66000000, 643801);
        System.out.println(ger.dichte() + " " + usa.dichte()+ " " + fra.dichte());
        System.out.println(ger.toString());
        System.out.println(usa.toString());
        System.out.println(fra.toString());
        System.out.println("Max Einwohner:" + Land.maxEinwohner());

        // Aufgabe 4
        Dreieck a, b, c, d; 
        a = new Dreieck( 3,  4,  5); 
        b = new Dreieck( 0,  0, -1); 
        c = new Dreieck( 6,  6,  6); 
        d = new Dreieck( 8,  4,  8); 
        System.out.println(a + " gleichschenklig? " + a.gleichschenklig());
        System.out.println(a + " rechtwinklig? " + a.rechtwinklig());
        System.out.println(c + " gleichseitig? " + c.gleichseitig());
        System.out.println(d + " gleichschenklig? " + d.gleichschenklig());
        a.zeichne();
        StdDraw.setPenColor(StdDraw.BLUE);
        c.zeichne();
        StdDraw.setPenColor(StdDraw.MAGENTA);
        d.zeichne();
        
    }

}
