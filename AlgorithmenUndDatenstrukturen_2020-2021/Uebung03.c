/* Algorithmen und Datenstrukturen Uebung 3 vom 10.12.2020
   - Aufgabe 1 implementiert Bubblesort und Quiksort.
   - AUfgabe 2 implementiert Linesearch und Binarysearch.
*/ 

#include <stdio.h>
#include <stdlib.h>

//Aufgabe 1.1
void bubbleSort(char arr[]) {
    int  max = strlen(arr);
    for(int i = 0; i < max; i++){
        for(int j = max - 2; j >= i; j--){
            if(arr[j] < arr[j + 1]) {
                arr[j] ^= arr[j + 1];
                arr[j + 1] ^= arr[j];
                arr[j] ^= arr[j + 1];
            }
        }
    }
}


//Aufgabe 1.2
void quikSort(char arr[], int l, int r) {
    int i = l;
    int j = r - 1;
    char x = arr[(l + r - 1) / 2];

    do {
        while (arr[i] < x) i++;
        while (x < arr[j]) j--;
        if(i <= j) {
            char h = arr[i];
            arr[i] = arr[j];
            arr[j] = h;

            i++;
            j--;
        }
    } while(i<=j);

    if(l < j) {quikSort(arr, l, j);}
    if(i < r) {quikSort(arr, i, r);}
}

//Aufgabe 2.1
int linearSearch(char arr[], char x) {
    for(int i = 0; i < 11; i++) {
        if(arr[i] == x) {
            return i;
        }
    }

    return -1;
}

//Aufgabe 2.2
int binarySearch(char arr[], char x) {
    int max = strlen(arr);

    if(arr[max / 2] == x) {
        return max / 2;
    }

    else if(max > 0 ){
        char newarr[max / 2];
        strncpy(newarr, arr, max / 2);
        binarySearch(newarr, x);
    }


    return -1;
}

int main()
{
    char test1[] = "Hello World";
    char test2[] = "Hello World";
    char test3[] = "Hello World";

    //Aufgabe 1.1
    printf("%s\n", test1);
    bubbleSort(test1);
    printf("%s\n", test1);

    //Aufgabe 1.2
    printf("%s\n", test2);
    quikSort(test2, 0, strlen(test2));
    printf("%s\n", test2);

    //Aufgabe 2.1
    int a = linearSearch(test3, 'W');
    int b = linearSearch(test3, 'w');
    printf("%d\n", a);
    printf("%d\n", b);

    //Aufgabe2.2
    int c = binarySearch(test3, 'd');
    int d = binarySearch(test3, 'e');
    printf("%d\n", c);
    printf("%d\n", d);

   return 0;
}
