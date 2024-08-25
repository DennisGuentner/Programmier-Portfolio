// Programmierung 1 Laboruebung vom 17.02.2019
// Der Code ist völlig selber erstellt worden!
// Die Datei Palindrom.java gehört dazu.

public class Main {

    public static void main(String[] args) {
        Palindrom p1 = new Palindrom();
        Palindrom p2 = new Palindrom();
        p1.setPali("AnnA");
        System.out.println(p1.getPali() + ": " + p1.isPali());
        p1.add("J");
        System.out.println(p1.getPali() + ": " + p1.isPali());
        p2.setPali("abcdedcba");
        System.out.println(p2.getPali() + ": " + p2.isPali());
        p1.makePali();
        p2.makePali();
        System.out.println(p1.getPali());
        System.out.println(p2.getPali());
    }
   

}
