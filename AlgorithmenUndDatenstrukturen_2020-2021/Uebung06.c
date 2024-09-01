/* Algorithmen und Datenstrukturen Uebung 4 vom 07.02.2021
   - DIe Aufgabe implementiert einen Binaerbaum.
*/ 

#include <stdio.h>
#include <stdlib.h>

#define MAX_ZEICHEN 6

typedef struct node {
int value;
struct node *left;
struct node *right;
} Node;


//Vorgegebene Funktionen
    Node* create(int tmpInt){
        Node *node = (Node*) malloc(sizeof(Node));
        node->value = tmpInt;
        node->left = NULL;
        node->right = NULL;


        return node;
    }

    Node* insert(Node *node, int tmpInt) {
        if(node == NULL) {
            node = create(tmpInt);
        }
        else if(tmpInt < node->value) {
            node->left = insert(node->left, tmpInt);
        } else {
            node->right = insert(node->right, tmpInt);
        }

        return node;
    }

    Node* search(Node *node, int searcher) {
        if(node == NULL) {
            return NULL;
        }
        else if(searcher == node->value){
            return node;
        }
        else if(searcher < node->value ) {
            search(node->left, searcher);
        } else {
            search(node->right, searcher);
        }
    }

    void print(Node *node) {
        if(node != NULL) {
            print(node->left);

            printf("%d\n", node->value);

            print(node->right);
        }
    }

//Selbsterstellte Funktionen
    //Ließt die Datei zeilenweise ein und füllt den Baum mit diesen.
    Node* fillTreeBinary(Node *node, FILE *datei) {
        char tmpChar[MAX_ZEICHEN];

        while(fgets(tmpChar, MAX_ZEICHEN, datei)){
            node = insert(node, atoi(&tmpChar));
        }

        return node;
    }

    //Hier sollen alle Testfälle abgehackt werden.
    void testTree(Node *node, int test[], int max) {
        printf("Teste print():\n");
        print(node);

        printf("\nTeste Search():\n");
        for(int i = 0; i < max; i++) {
            if(search(node, test[i]) != NULL && search(node, test[i])->value == test[i]) {
                printf("Die Zahl %i wurde gefunden.\n", test[i]);
            } else {
                printf("Die Zahl %i wurde nicht gefunden.\n", test[i]);
            }
        }
    }

//Main Methode
int main() {
    FILE *datei = NULL;
    datei = fopen("Baum.txt", "r");

    if(datei == NULL) {
        printf("Die Datei konnte nicht gefunden werden");
    } else {
        Node *BinaerBaumA = NULL;
        int test[] = {50, 31, 1, 51, 16, 8, 25};
        int max = (sizeof(test) / sizeof(int));

        BinaerBaumA = fillTreeBinary(BinaerBaumA, datei);
        testTree(BinaerBaumA, test, max);
    }

    fclose(datei);


    return 0;
}
