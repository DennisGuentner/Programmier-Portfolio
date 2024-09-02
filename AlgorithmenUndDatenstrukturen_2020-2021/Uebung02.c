/* Algorithmen und Datenstrukturen Uebung 2 vom 22.11.2020
   - In Aufgabe 1 wird die Rasterung eines Kreises ausgefuehrt und im Terminal ausgegeben.
   - In Aufgabe 2 wird das Display als abstrakter Datentyp und die Berechnung des Kreises als Makro 'Cricle' definiert
*/ 

#include <stdio.h>
#include <stdlib.h>

#define CIRCLE ((x - mittelpunktX) * (x - mittelpunktX) + (y - mittelpunktY) * (y - mittelpunktY) - radius * radius)

typedef char Display[25][25];

//Anfang Aufgabe 1
void aufgabe1 () {
    printf("Aufgabe 1:\n");

    char zeichenFeld[25][25];
    int mittelpunktX = 12;
    int mittelpunktY = 12;
    int radius = 10;
    int temp;

    for(int y = 0; y < 25; y++){
        for(int x = 0; x < 25; x++){
            temp = ((x - mittelpunktX) * (x - mittelpunktX) + (y - mittelpunktY) * (y - mittelpunktY) - radius * radius);
            if(temp > -10 && temp < 10){
                zeichenFeld[y][x] = '#';
            } else {
                 zeichenFeld[y][x] = '-';
            }
        }
    }

    ausgabeKreis(zeichenFeld);
}

void ausgabeKreis(char zeichenFeld[25][25]) {
    for(int y = 0; y < 25; y++){
        for(int x = 0; x < 25; x++){
            if(x == 24 && y < 24) {
                printf("%c\n", zeichenFeld[y][x]);
            } else {
                printf("%c ", zeichenFeld[y][x]);
            }
        }
    }
}

//Anfang Aufgabe 2:
void aufgabe2() {
    printf("Aufgabe 2:\n");
    Display zeichenFeld;
    int mittelpunktX = 12;
    int mittelpunktY = 12;
    int radius = 10;
    int temp;

    for(int y = 0; y < 25; y++){
        for(int x = 0; x < 25; x++){
            temp = CIRCLE;
            if(temp > -10 && temp < 10){
                zeichenFeld[y][x] = '#';
            } else {
                zeichenFeld[y][x] = '-';
            }
        }
    }

    ausgabeKreis2(zeichenFeld);
}

void ausgabeKreis2(Display zeichenFeld) {
    for(int y = 0; y < 25; y++){
        for(int x = 0; x < 25; x++){
            if(x == 24 && y < 24) {
                printf("%c\n", zeichenFeld[y][x]);
            } else {
                printf("%c ", zeichenFeld[y][x]);
            }
        }
    }
}



//Auswahl der Aufgaben
int main(){
    char auswahl;

    printf("Geben sie \"a\" ein um die Aufgabe 1 zu starten, ansonsten jedes beliebige Zeichen fuer Aufgabe 2:");
    scanf("%c", &auswahl);

    if(auswahl == 'a'){
        aufgabe1();
    } else {
        aufgabe2();
    }

    return 0;
}