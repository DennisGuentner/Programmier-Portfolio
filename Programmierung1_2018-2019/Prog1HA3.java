// Programmierung 1 Hausaufgabe vom 16.11.2018

public class Prog1HA3 {

    public static int ggt(int a, int b) {
        
		//Methode aus der Vorlesung 1!
		while(a != b){
			if(a > b){
				a = a - b;
			}
			else b = b - a;
		}
		return a;
    }

    public static int kgv(int a, int b) {
	
		a = (a * b) / ggt(a,b);
		return a;
    }

    public static void kuerzen(int zaehler, int nenner) {

		int t = ggt(zaehler,nenner);
	
	
	// wenn der ggt = zaehler ist wird nur der nenner ausgegeben
		if(nenner / t == 1){
		System.out.println(zaehler / t);
		}
	// Sonst beides. 
		else{
			zaehler = zaehler / t;
			nenner = nenner / t;
			System.out.println(zaehler + "/" + nenner);
		}
    }

    public static void bruchprodukt(int zaehler1, int nenner1, int zaehler2, int nenner2) {
	
	zaehler1 = zaehler1 * zaehler2;
	nenner1 = nenner1 * nenner2;
	
	kuerzen(zaehler1,nenner1);
    }

    public static void bruchsumme(int zaehler1, int nenner1, int zaehler2, int nenner2) {
	
	zaehler1 = zaehler1 * (kgv(nenner1,nenner2) / nenner1) + zaehler2 * (kgv(nenner1,nenner2) / nenner2);
	nenner1 = kgv(nenner1,nenner2);
	
	kuerzen(zaehler1,nenner1);
    }

    public static void main(String[] args) {
	System.out.println(kgv(48,30));
	System.out.println(kgv(17,51));
	System.out.println(kgv(11,11));
	System.out.println("\n");
	kuerzen(121,11);
	kuerzen(12,72);
	kuerzen(34,51);
	System.out.println("\n");
	bruchprodukt(1,2,2,5);
	bruchprodukt(2,17,3,15);
	bruchsumme(1,2,1,3);
	bruchsumme(2,17,3,15);
	bruchsumme(12,3,57,19);
	System.out.println("\n");
    }
}
