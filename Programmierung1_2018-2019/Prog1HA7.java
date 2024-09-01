// Programmierung 1 Hausaufgabe vom 09.02.2019

import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;

public class Prog1HA7 {

//Aufgabe 1	
	private static boolean anagramm(String s1,String s2) {
			
		if(s1.length() == s2.length()) {	
			for(int i = 0 ; i < s2.length() && s1.length() != 0; i++) {
				
				if(s1.charAt(0) == (s2.charAt(i))) {
					
					s1 = s1.substring(1, s1.length());
					i = 0;
				}
			}
		}
		
		else return false;
		
		if(s1.length() == 0) {
			return true;
		}
			
		return false;
	}

//Aufgabe 2
	
	public static int spannbreite() {
		File f = new File("C:/Users/DundG/Desktop/HS-Fulda_Archiv/Semester_1/Prog1_Archiv/Woche8_HA7/Hausaufgabe7/spannbreite.txt");
		Scanner sc = null;
		try {
			 sc = new Scanner(f);
		} catch (FileNotFoundException e) {
			System.out.println("Datei" + f + "nicht gefunden");
		}
		
		int [] zahl = new int[10000];
		
		for(int i = 0;i < zahl.length;i++){
			
			zahl [i] = sc.nextInt();
		}
		
		int max = 0;
		
		for(int i = 0; i < zahl.length; i++) {
			int first = i;
			int last = i;
			int num = zahl[i];
			
			if(zahl[i] != 0) {
				for(int j = i+1; j < zahl.length; j++) {
					if(zahl[j] == num) {
						last = j;
						zahl[j] = 0;
					}
				}
			}
			
			if( 1 + last - first > max) {
				max = 1 + last - first;
			}
		}
		return max;
	}
	
//Aufgabe 3
	public static int sechssieben() {
		File g = new File("C:/Users/DundG/Desktop/HS-Fulda_Archiv/Semester_1/Prog1_Archiv/Woche8_HA7/Hausaufgabe7/67.txt");
		
		Scanner sc = null;
		
		try {
			sc = new Scanner(g);
			}
		catch(FileNotFoundException e) {
			System.out.println("Datei" + g + "nicht gefunden");
		}
		
		int [] zahlen = new int[1000];
		int summe = 0;
		boolean flag = true;
		
		for(int i = 0; i < zahlen.length; i++) {
			zahlen [i] = sc.nextInt();
			if(flag && zahlen[i] != 6) {summe += zahlen [i];}
			if(zahlen [i] == 6) {flag = false;}
			else if(zahlen [i] == 7){flag = true;}
		}
		
		
		return summe;
	}
	
	
//Test	
	public static void main(String[] args) {
		
		System.out.println(anagramm("kreiker","kreiker"));
		System.out.println(anagramm("kreiker","kekrier"));
		System.out.println(anagramm("krei","kreiker"));
		System.out.println(anagramm("kreiker","ker"));
		System.out.println(anagramm("kreiker",""));
		System.out.println(anagramm("","kreiker"));
		System.out.println(anagramm("",""));
		
		
		System.out.println(spannbreite());
		
		System.out.println(sechssieben());
	}

}
