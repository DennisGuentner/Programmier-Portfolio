//Die Datei Prog1HA5 gehört zu dieser Klasse

public class Rechteck {

	
	//Attribute:
	
	private int laenge;
	private int hoehe;
	
	//Konstruktor
	public Rechteck(int a,int b) {
		
		//Es wird getestet ob eines der Seiten gleich 0 sind.
		if(a != 0 && b != 0) {
		this.laenge = betrag(a);
		this.hoehe = betrag(b);
		}
		
		else {
			System.out.println("Die Seitenmasse k�nnen bei einem Quadrat nicht 0 sein");	
		}
	}
	
	//Methoden
	
	public int umfang() {
		return 2 * this.laenge + 2 * this.hoehe;
	}
	
	public int flaeche() {
		return this.laenge * this.hoehe;
	}
	
	public void istQuadrat() {
		if(this.laenge == this.hoehe) {
			System.out.println("Es ist ein Quadrat");
		}
		else {
			System.out.println("Es is kein Quadrat");
		}
	}
	

	//Sorgt daf�r dass der Betrag der Zahl zur�ckgegeben wird.
	private static int betrag(int n) {
		if(n < 0) {
			return -n;
		}
		
		else {
			return n;
		}
	}
}
