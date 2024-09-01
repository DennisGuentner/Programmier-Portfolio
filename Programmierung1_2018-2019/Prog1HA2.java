// Programmierung 1 Hausaufgabe vom 12.11.2018

class Prog1HA2{
	public static void main(String[] args){
	
	/*Aufgabe 1:
	*
	*Ich brechne erstmal was wallisische Produkt und die Leibniz-Reihe für die jeweiligen Maxima max von 1.000 bis 1.000.000.
	*Dabei kontrolliere ich nach jeder Berechnung um wie viele Kommastellen die Näherung mit Pi übereinstimmt. 
	*Das Ergebnis, um wie viele Kommastellen es übereinstimmt, speicher ich jeweils in "wallis" und "leibniz".
	*Dann vergleiche ich die beiden, und das welches kleiner ist muss von der Näherung kommen das mehr Nachkommastellen hat die mit Pi gleich sind.
	*
	*Ein counter zählt dabei wie oft das wallisische Produkt gewonnen hat. 
	*Ist der Wert positiv, ist das wallisische Produkt schneller.
	*Ist der Wert negativ, ist die Leibniz-Reihe schneller.
	*Ist es neutral sind beide gleich schnell.
	*/
	
	
		
		int counter1 = 0;

		for(double max = 1000.0d; max <= 1000000.0d; max = max * 10){
			
			double  pi = 1.0d;
			double n1 = 1.0d;
			
			double wallis = 0.0d;
			double leibniz = 0.0d;
			
			
			
			//Wallisisches Produkt
			for(double i = 1.0d ; i <= max; i++){
				
				pi = pi * (2*i / (2*i - 1)) * (2*i / (2*i + 1));
			}
			
			
			
			pi = pi * 2;
			
			for(double i = 0.1d; (Math.PI - pi < 0 && Math.PI - pi > -i) || (Math.PI - pi > 0 && Math.PI - pi < i); i = i/10){
				wallis = i/10;
			}
			
			System.out.println("Fuer max = " + max);
			System.out.println("Wallisisches Produkt: " + pi);
			
			
			
			
			
			//Leibnitz Reihe.
			pi = 0.0d;
			
			for(double i = 0.0d; i <= max; i++){
				
				pi = pi + n1 / (2*i + 1);
				n1 = -n1;
			}
			
			
			
			pi = pi * 4;
			
			for(double i = 0.1d; (Math.PI - pi < 0 && Math.PI - pi > -i) || (Math.PI - pi > 0 && Math.PI - pi < i); i = i/10){
				leibniz = i/10;
			}
			
			System.out.println("Leibniz-Reihe: " + pi);
			System.out.println("Pi: " + Math.PI);
			System.out.println("");
			
			
			
			//Kontrolle welche Methode schneller die korrekten Zahlen hinter dem Komma anzeigt:
			if(wallis > leibniz){
				counter1--;	
			}
			else{
				counter1++;
			}
		}
		
		//Kontrolle welche Methode durchschnittlich schneller ist:
		if(counter1 == 0){
			System.out.println("Beide sind gleich schnell");
		}
		else if(counter1 < 0){
			System.out.println("Die Leibniz-Reihe scheint sich Pi schneller anzunaehern");	
		}
		else{
			System.out.println("Das wallisische Produkt scheint sich Pi schneller anzunaehern");
		}
		System.out.println();
		
	


	
		
			
	//Aufgabe 2:
	
		int n2 = 10;
		int counter2 = 1;
		int k = 1;
		int i = 1;
	
	
	
		//Solange die länge nicht gefunden wurde, wird die nächsthöhere Zahl i ausprobiert.
		while( counter2 != n2){		
			
			i++;
			counter2 = 1;
			k = i;
			
			//Hier wird die Kollatzlänge des jeweiligen Zahl i berechnet.
			while(k > 1){
				if((k & 1) == 1){
					k = k * 3 + 1;
				}
				
				else{
					k = k >> 1;
				}
				
				counter2++;
			}
			
			
		}
		
		// Die Zahl i mit der jeweiligen Kollatzlänge n2 wird ausgegeben.
		System.out.println("Die Zahl mit der Kollatzlaenge " + n2 + " ist " + i + " mit:");
		System.out.println(i);
		while(i > 1){
				
			if((i & 1) == 1){
				i = i * 3 + 1;
			}
			
			else{
				i = i >> 1;
			}
			
			System.out.println(i);
		}
		System.out.println();
	
		
		
		
		
		
	//Aufgabe 3:
	
		int n3 = 123456789;
		int ergebnis = 0;
		
		System.out.print("Die Quersumme von " + n3 + " ist: ");
		
		while(n3 != 0){
			
			ergebnis = ergebnis + n3 % 100;
			n3 = n3 / 100;
		}
		
		System.out.println(ergebnis);
		System.out.println();
		
		
		
		
		
		
	//Aufgabe 4:
	
		double n4 = 1.0d;
		double ln2 = 0.0d;
		double j = 1.0d; 
		double counter3 = 0;
		
		
		//Aufgabe 4.a:
		do{
			
			ln2 = ln2 + n4/j;
			
			n4 = -n4;
			j++;
			counter3++;
		} while(Math.log(2) - ln2 < -0.0023 || Math.log(2) - ln2 > 0.0023);
		
		System.out.println("Fuer a braucht man " + counter3 + " Summanden");
		
		
		
		//Aufgabe 4.b:
		
		//ln2 und j und counter3 werden zurück gesetzt.
		ln2 = 0.0d;
		j = 1.0d;
		counter3 = 0;
		
		do{
			ln2 = ln2 + 1/ (j * (j + 1) * (j + 2));
			j = j + 4;
			counter3++;
			
			
		// Kann man mir erklären wie man das wirklich ermitteln kann? Ich weiß es ist falsch.
		} while(Math.log(2) - (4 * ln2) <= -0.0001 || Math.log(2) - (4 * ln2) >= 0.0001);
			
		System.out.println("Fuer b braucht man " + counter3 + " Summanden");
	}
}
