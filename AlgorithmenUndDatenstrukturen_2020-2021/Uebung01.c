/* Algorithmen und Datenstrukturen Uebung 1 vom 08.11.2020
  - In Aufgabe 1 wird die Flaeche eines Kreises und Volumen einer Kugel zu berechnet.
  - In Aufgabe 2 wird durch meiner Matrikelnummer die einzelnen char meines Namens berechnet und ausgegeben.
*/ 

#include <stdio.h>
#include <stdlib.h>

//Berechnung der Flaeche:
float berechneA(float r, float pi){
return r * r * pi;
}

//Berechnung des Volumens:
float berechneV(float r, float pi) {
return r * r * r * pi * 4 / 3;
}

//Aufgabe 3:
void meinName(int a) {
char D;
char E;
char N;
char I;
char S;

E = a % 10 * 10 + a / 100000 ;
D = E - a / a;
N = E + a / 100000 ;
I = E + a /10000 % 10;
S = I + a / a * 10;

printf("%c%c%c%c%c%c", D, E, N, N, I, S);
}

//Main Funktion
int main() {
    float r;
    float pi = 3.14;


    //Abfrage
    printf("bitte Radius angeben: ");
    scanf("%f", &r);

    //Drucken der Ergebnisse
    printf("Flaeche: %.2f\n", berechneA(r, pi));
    printf("Volumen: %.2f\n", berechneV(r, pi));

    //Tipp: Meine Matr.Nr. ist 949736
    int matrNr;
    printf("\nGebe bitte die Matrikelnummer von Dennis ein: ");
    scanf("%d", &matrNr);
    meinName(matrNr);

    return 0;
}
