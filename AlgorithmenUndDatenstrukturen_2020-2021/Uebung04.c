/* Algorithmen und Datenstrukturen Uebung 4 vom 20.12.2020
   - Aufgabe 1 misst die Zeit die der Computer beim ausfuehren der linearen und binaeren Suche benoetigt.
   - Aufgabe 2 misst die durchschnittliche Zeit der Suchalgorithmen aus Aufgabe 1.
   - Aufgabe 3 misst die Zeit von einem im Aufgabenblatt beschriebenen Sortieralgorithmus und Quiksort und vergleicht die Zeiten.
*/ 

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

double cpu_time_used;
clock_t end;
clock_t start;

//Lineare Suche eines Integers:
int linSuche(int arr[], int size, int x) {
    for(int i = 0; i < size; i++) {
        if(arr[i] == x) {
            return i;
        }
    }

    return -1;
}

//Binäre Suche eines Integers:
int binSuche(int arr[], int size, int x) {

    int middle;
    int left = 0;
    int right = size;

    while(left < right) {
        middle = (left + right) / 2;

        if(arr[middle] == x) {
            return middle;
        }
        else if(arr[middle] > x) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return -1;
}

//Quiksort
void quicksort(int arr[], int l, int r) {
    int i = l;
    int j = r;
    int x = arr[(l + r) / 2];

    do {
        while(arr[i] < x) i++;
        while(x < arr[j]) j--;

        if(i <= j) {
            int tmp =  arr[j];
            arr[j] = arr[i];
            arr[i] = tmp;
            i++;
            j--;
        }
    } while(i <= j);

    if(l < j) quicksort(arr, l, j);
    if(i < r) quicksort(arr, i, r);
}


//Aufgabe 3 Unknown Sort
void unknownSort(int *arr, int size) {
    int i = 1;

    while(i < size) {
        if( i == 0) {
            printf("Schritt rechts\n");
            i++;
        }
        else if(arr[i] < arr[i - 1]) {
            printf("Tausch\n");
            arr[i] ^= arr[i - 1];
            arr[i - 1] ^= arr[i];
            arr[i] ^= arr[i - 1];

            printf("Schritt links\n");
            i--;
        } else {
            printf("Schritt rechts\n");
            i++;
        }
    }
}




//Main Funktion:
int main()
{
    /*Initialisierung der Variablen und des Such keys*/
    srand(time(NULL));
    int key = rand();
    int key2[10000];
    int size = 10000;

    int testArr[size];
    int testSize = size;
    int testSorted = 0;

    int test2Arr[size];
    int test2Size = size;
    int test2Sorted = 0;


    int linCounter = 0;
    int binCounter = 0;

    //Anmerkung. Ich wusste nicht wie ich int werte größer als ungefähr 32.000 erzeugen kann.

    /*10.000 key-Werte werden definiert*/
    srand(time(NULL));
    for(int i = 0; i < 10000; i++) {
        key2[i] = rand();
    }


    /*Die Arrays werden gefüllt*/
    srand(time(NULL) + 1);
    for(int i = 0; i < testSize; i++) {
        testArr[i] = rand();
    }

    srand(time(NULL) + 1);
    for(int i = 0; i < test2Size; i++) {
        test2Arr[i] = rand();
    }

    /*Aufgabe 1:*/
    printf("Aufgabe 1 start:\n\n");

    //Lineare Suche:
    start = clock();
    printf("Die lineare Suche fand den int %d in der Position %d\n", key, linSuche(testArr, testSize, key));
    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Die lineare Suche benoetigte %fsec zum suchen\n", cpu_time_used);

    //Binaere Suche:
    start = clock();

    if(testSorted == 0) {
        quicksort(testArr, 0, testSize);
        testSorted = 1;
    }

    printf("Die binaere Suche fand den int %d in der Position %d\n", key, binSuche(testArr, testSize, key));
    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Die bineare Suche benoetigte %fsec zum suchen\n", cpu_time_used);



    /*Aufgabe 2:*/
    printf("\nAufgabe 2 start:\n\n");

    //Lineare  Suche:
    start = clock();
     for(int i = 0; i < test2Size; i++) {
        if(linSuche(test2Arr, test2Size, key2[i]) > -1) {
            linCounter++;
        }
    }
    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Die lineare Suche benoetigte %fsec zum suchen\n", cpu_time_used);
    printf("Die lineare Suche fand den key %d mal.\n", linCounter);

    //Binaere Suche:
    start = clock();
    if(test2Sorted == 0) {
        quicksort(test2Arr, 0, test2Size);
        test2Sorted = 1;
    }

    for(int i = 0; i < test2Size; i++) {
        if(binSuche(test2Arr, test2Size, key2[i]) > -1) {
            binCounter++;
        }
    }
    end = clock();
    cpu_time_used = ((double)(end - start)) / CLOCKS_PER_SEC;

    printf("Die bineare Suche benoetigte %fsec zum suchen\n", cpu_time_used);
    printf("Die binaere Suche fand den key %d mal.\n", binCounter);



    /*Aufgabe 3*/
    printf("\nAufgabe 3 start:\n\n");
    int test3[5];
    srand(time(NULL));
    for (int i = 0; i < 5; i++) {
        test3[i] = rand() % 30 + 1;
    }

    unknownSort(test3, 5);
    printf("\nSortierter Array der Aufgabe 3:\n");
    for(int i = 0; i < 5; i++) {
        printf("%d\n", test3[i]);
    }

    return 0;
}