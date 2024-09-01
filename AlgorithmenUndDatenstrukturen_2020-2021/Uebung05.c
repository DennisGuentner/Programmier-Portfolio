/* Algorithmen und Datenstrukturen Uebung 4 vom 24.01.2021
   - Aufgabe 1 implementiert eine Queue auf der Basis eines zyklischen Arrays, waerend die Struktur in Form eines Strukts realisiert wurde.
   - Aufgabe 2 implementiert eine Doppelt verkettete Liste. Dafuer werden 2 Strukturen 'Node' und 'List' definiert.
   - Aufgabe 3 Testet beide versionen und gibt die Loesungen aus.
*/  

#include <stdio.h>
#include <stdlib.h>

#define Stackgroesse 10

//Definition neuer Typen:
    typedef struct {
    int array[Stackgroesse];
    int anfang;
    int ende;
    int counter;
    } Stack;

    typedef struct node {
    int value;
    struct node *prev;
    struct node *nxt;
    } Node;

    typedef struct {
    int counter;
    Node *firstNode;
    Node *lastNode;
    } List;

//Aufgabe 1:
    //Um alle Parameter nicht jedes mal einzeln setzen zu müssen
    void initialiseStack(Stack *stack) {
        stack->anfang = 0;
        stack->ende = 0;
        stack->counter = 0;
    }

    //1.1
    void enqueue(int e, Stack *stack) {
        if(stack->counter == 10) {
            printf("Der Stack ist voll. Der Auftrag %d konnte nicht hinzugefuegt werden.\n", e);
        }
        else if(stack->ende < Stackgroesse){
            stack->array[stack->ende++] = e;
            stack->counter++;
        } else {
            stack->ende = 0;
            stack->array[stack->ende++] = e;
            stack->counter++;
        }
     }

    //1.2
    int dequeue(Stack *stack) {
        int tmp;
        if(stack->counter == 0) {
            printf("Keine Elemente Vorhanden.\n");

            return -1;
        } else if(stack->anfang < Stackgroesse) {
            tmp = stack->array[stack->anfang];
            stack->array[stack->anfang++] = NULL;
            stack->counter--;

            return tmp;
        } else {
            stack->anfang = 0;
            tmp = stack->array[stack->anfang];
            stack->array[stack->anfang++] = NULL;
            stack->counter--;

            return tmp;
        }
    }

    //1.3
    int front(Stack *stack) {
        if(stack->counter == 0) {
            printf("Keine Elemente Vorhanden.\n");

            return -1;
        } else if(stack->anfang < Stackgroesse) {
            return stack->array[stack->anfang];
        } else {
            stack->anfang = 0;
            return stack->array[stack->anfang];
        }
    }

    //1.4
    int size(Stack *stack) {
        return stack->counter;
    }

    //1.5
    int empty(Stack *stack) {
        if(stack->counter == 0) {
            return 1;
        } else {
            return 0;
        }
    }

//Aufgabe 2:
    //2.1
    void enqueueList(int e, List *list) {
        Node *tmpNode = (Node*)malloc(sizeof(Node));

        if(list->counter == 0) {
            list->firstNode = tmpNode;
            list->lastNode = tmpNode;
            tmpNode->value = e;
        } else {
            Node *tmpNode2 = list->lastNode;
            tmpNode2->nxt = tmpNode;
            tmpNode->prev = tmpNode2;
            list->lastNode = tmpNode;
            tmpNode->value = e;
        }

        list->counter++;
    }

    //2.2
    int dequeueList(List *list) {
        if(list->counter == 0) {
            printf("Keine Elemente Vorhanden.\n");

            return -1;
        } else {
            Node *tmpNode = list->firstNode;
            Node *tmpNode2 = tmpNode->nxt;
            int tmp = tmpNode->value;

            list->firstNode = tmpNode2;
            tmpNode2->prev = NULL;
            free(tmpNode);
            list->counter--;

            return tmp;
        }
    }

    //2.3
    int frontList(List *list) {
        Node *tmpNode = list->firstNode;
        return tmpNode->value;
    }

    //2.4
    int sizeList(List *list) {
        return list->counter;
    }





int main() {
    //Aufgabe 3:
    int matrikelnummer[] = {1, 2, 3, 4, 5, 6};

    Stack test1;
    initialiseStack(&test1);
    List test2;
    test2.counter = 0;

    //Test des Stacks mit meiner Matrikelnummer
    printf("Test des Stacks mit der Matrikelnummer: 949736\n");
    for(int i = 0; i < 2; i++){
        for(int j = 0; j < 6; j++) {
            enqueue(matrikelnummer[j], &test1);
        }
    }

    printf("\n");
    for(int i = 0; i < 7; i++){
        printf("%d\n",dequeue(&test1));
    }

    //Test der List mit meiner Matrikelnummer
    printf("\n\nTest der List mit der Matrikelnummer: 949736\n");
    for(int i = 0; i < 2; i++){
        for(int j = 0; j < 6; j++) {
            enqueueList(matrikelnummer[j], &test2);
        }
    }

    for(int i = 0; i < 7; i++){
        printf("%d\n",dequeueList(&test2));
    }

    return 0;
}
