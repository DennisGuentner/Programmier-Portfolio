// Programmierung 1 Hausaufgabe vom 01.12.2018
// Der Code ist völlig selber erstellt worden!
// Die Dateien Dreieck.java und Rechteck.java gehören dazu.


public class Prog1HA5 {
	
	private static void rechteckTest() {
		//Nicht moegliche Rechtecke da mindestens eine Seitenlaenge gleich 0 ist
		Rechteck a = new Rechteck(0,0);
		Rechteck b = new Rechteck(2,0);
		Rechteck c = new Rechteck(0,4);
		
		//Moegliche Rechtecke		
		Rechteck d = new Rechteck(2,4);
		Rechteck e = new Rechteck(-2,4);
		Rechteck f = new Rechteck(2,-4);
		Rechteck g = new Rechteck(-2,-4);
		Rechteck h = new Rechteck(2,2);
		
		//Moegliche Rechtecke werden getestet
		System.out.println("Rechteck d");
		System.out.println(d.umfang());
		System.out.println(d.flaeche());
		d.istQuadrat();
		System.out.println();
		
		System.out.println("Rechteck e");
		System.out.println(e.umfang());
		System.out.println(e.flaeche());
		e.istQuadrat();
		System.out.println();
		
		System.out.println("Rechteck f");
		System.out.println(f.umfang());
		System.out.println(f.flaeche());
		f.istQuadrat();
		System.out.println();
		
		System.out.println("Rechteck g");
		System.out.println(g.umfang());
		System.out.println(g.flaeche());
		g.istQuadrat();
		System.out.println();
	
		System.out.println("Rechteck h");
		System.out.println(h.umfang());
		System.out.println(h.flaeche());
		h.istQuadrat();
		System.out.println();
	}
	
	private static void dreieckTest() {

		//Nicht moegliche Dreiecke da es von den Seitenlaengen nicht konstruiert werden kann
		Dreieck a = new Dreieck(2,4,6);
		Dreieck b = new Dreieck(6,4,2);
		Dreieck c = new Dreieck(2,6,4);
		
		//Moegliche Dreiecke
		Dreieck d = new Dreieck(-3,4,5);
		Dreieck e = new Dreieck(3,-4,5);
		Dreieck f = new Dreieck(3,4,-5);
		Dreieck g = new Dreieck(2,2,1);
		Dreieck h = new Dreieck(2,2,2);
		
		
		//Moegliche Dreiecke und die Dreiecke die automatisch gewaehlt werden wenn das angegebene nicht konstruhiert wird werden getestet
		System.out.println("Dreieck a");
		a.gleichschenklig();
		a.gleichseitig();
		a.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck b");
		b.gleichschenklig();
		b.gleichseitig();
		b.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck c");
		c.gleichschenklig();
		c.gleichseitig();
		c.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck d");
		d.gleichschenklig();
		d.gleichseitig();
		d.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck e");
		e.gleichschenklig();
		e.gleichseitig();
		e.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck f");
		f.gleichschenklig();
		f.gleichseitig();
		f.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck g");
		g.gleichschenklig();
		g.gleichseitig();
		g.rechtwinklig();
		System.out.println();
		
		System.out.println("Dreieck h");
		h.gleichschenklig();
		h.gleichseitig();
		h.rechtwinklig();
		System.out.println();
		
		
	}
	
	public static void main(String[] args) {
		
		rechteckTest();
		dreieckTest();
	}
}
