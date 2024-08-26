//Programmierung 1 Hausaufgabe vom 28.10.2018
//Der Code ist völlig selber erstellt worden!

class Prog1HA1{
	public static void main(String[] args){
	
		int a = 8;
		int b = 5;
		int c = 13;
		int n = 15;
		
	//Aufgabe 1:
		
		if (a + b == c || a + c == b || c + b == a) {
			System.out.println("twoInLove");
		}
		else {
			System.out.println("noLove");
		}
			
	//Aufgabe 2:
		
		//p für Produkt
		int p = 1;

		// Das "&& p > 0" um Ergebnisse größer als Int abzufangen.
		for (int i = 3; (i <= n) && p > 0; i = i + 3) {
			p = p * i;
			System.out.println(p);
		}
		
	// Aufgabe 3:

		if (n % 3 == 0 && n % 5 == 0) {
			System.out.println("FizzBuzz");
		}
		else if (n % 3 == 0) {
			System.out.println("Fizz");
		}
		else if (n % 5 == 0) {
			System.out.println("Buzz");
		}
		else {
			System.out.println(n);
		}
		
	// Aufgabe 4:
		
		//Wenn genug große Schokoriegel vorhanden sind, so dass das Gewicht mindestens gleich n ist, wird geprüft ob die Kleinen reichen um genau das geforderte Gewicht zu erreichen.
		//Die Zahl der Kleinen braucht dabei nicht höher als 4 zu betragen.
		if (5*b >= n && (n/5) * 5 + a >= n ) {
			System.out.println(n - (n/5) * 5);
		}
		
		//Da nicht genug Große vorhanden sind, wird geprüft ob es überhaupt möglich ist, die geforderte Menge zu erreichen.
		else if (a + 5*b >= n) {
			System.out.println(n - 5*b);
		}
		
		else {System.out.println("-1");
		}
		
	// Aufgabe 5:
		
		//q für Quersumme
		int q = 1;
		
		for (int i = n; i > 0; i = i / 10) {
			q = q * (i % 10);
		}
		System.out.println(q);
		
	//Aufgabe 6:
	
		//t für Teiler
		int t = 3;
		
		while (t < n){
			t  = t + 3;
		}
		
		if (n == t){
			System.out.println("Durch3");
		}
		
		else{
			System.out.println("no3");
		}
	} 
}
