//Die Datei Prog1HA4 gehört zu dieser Klasse

public class Obstkorb {
	
	// Attribute
	private int anzahl;
	private int gewicht;
	
	// Konstruktor
	public Obstkorb () {
		this.anzahl = 0;
		this.gewicht = 0;
	}
	
	// Methoden
	
	public void apfelRein(int x){
		if(this.anzahl < 10){
			if(x >= 100){
				if(x <= 200){
				this.anzahl = this.anzahl + 1;
				this.gewicht = this.gewicht + x;	
				}
				else{System.out.println("zu schwer");}
			}
			else {System.out.println("zu leicht");}
		}
		
		else {System.out.println("zu viele Aepfel");}
	}
	
	public int obstGesamt(){
		return this.anzahl;
	}
	
	public int gewichtGesamt(){
		return this.gewicht;
	}
}
