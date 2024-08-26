//Die Datei Prog1HA5 gehört zu dieser Klasse

public class Dreieck {

	//Atribute
	
	private float seite1;
	private float seite2;
	private float seite3;
	
	//Kontruktor
	
	public Dreieck(int a,int b,int c) {
			
		//Es wird getestet ob es M�glich ist ein Dreieck zu konstruhieren.
		if(betrag(c) < betrag(a) + betrag (b) && betrag(c) > betrag(betrag(a) - betrag(b))) {
			this.seite1 = betrag(a);
			this.seite2 = betrag(b);
			this.seite3 = betrag(c);
		}
		
		else {
			this.seite1 = 3;
			this.seite2 = 4;
			this.seite3 = 5;	
		}
	}
	
	//Methoden
	
	public void gleichschenklig() {
		
		if(this.seite1 == this.seite2 || this.seite1 == this.seite3 || this.seite2 == this.seite3) {
			System.out.println("Das Dreieck ist gleichschenklig");
		}
		
		else {
			System.out.println("Das Dreieck ist nicht gleichschenklig");
		}
	}
	
	public void gleichseitig() {
		if(this.seite1 == this.seite2 && this.seite2 == this.seite3) {
			System.out.println("Das Dreieck ist gleichseitig");
		}
		
		else {
			System.out.println("Das Dreieck ist nicht gleichseitig");
		}
	}
	
	public void rechtwinklig() {
		if(this.seite1 < this.seite3 && this.seite2 < this.seite3) {
			
			rechtwinkligTest(this.seite1,this.seite2,this.seite3);
		}
		
		else if(this.seite1 < this.seite2 && this.seite3 < this.seite2) {
			
			rechtwinkligTest(this.seite1,this.seite3,this.seite2);
		}
		
		else if(this.seite2 < this.seite1 && this.seite3 < this.seite1) {
			
			rechtwinkligTest(this.seite2,this.seite3,this.seite1);
		}
		
		else {
			rechtwinkligTest(this.seite1,this.seite2,this.seite3);
		}
	}
	
	//Sorgt daf�r dass der Betrag der Zahl zur�ckgegeben wird.
	private static float betrag(float n) {
		if(n < 0) {
			return -n;
		}
		
		else {
			return n;
		}
	}
	
	//Berechnet ob das Dreieck einen rechten Winkel hat und gibt das Ergebniss aus!
	private static void rechtwinkligTest(float a,float b,float c) {
		
		if(a * a + b * b == c * c) {
			System.out.println("Das Dreieck ist Rechtwinklig");
		}
		
		else {
			System.out.println("Das Dreieck ist nicht Rechtwinklig");
		}
	}
}

