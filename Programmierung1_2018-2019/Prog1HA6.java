// Programmierung 1 Hausaufgabe vom 08.12.2018
// Der Code ist völlig selber erstellt worden!

public class Prog1HA6 {
	public static String[] boomBang(int start, int end) {
	
		String [] a = new String[end - start];
		for(int i = 0; start < end; i++) {
			if(start % 3 == 0 && start % 5 == 0) {
				a[i] = "BoomBang";
			}
		
			else if(start % 3 == 0) {
				a[i] = "Boom";
			}
			
			else if(start % 5 == 0) {
				a[i] = "Bang";
			}
			
			else {
				a[i] = String.valueOf(start);
			}
			
			start++;
		}	
        return a;
    }

	public static void tausche(int[] arr, int i, int j) {
		int a = arr[i];
		
		arr[i] = arr[j];
		arr[j] = a;
    }

    public static void alleTauschen(int[] arr) {
		
		for (int i = 0; i <= arr.length - 2; i++){
			if (arr[i] > arr[i + 1]){
			tausche(arr,i,i + 1);
			}
		}
    }

    public static void vertauscheN(int[] arr) {
		
		for (int i = 1; i <= arr.length; i++){
			alleTauschen(arr);
		}
    }

    public static int klumpen(int[] nums) {
    	
    	int counter = 0;
    	boolean temp = false;
    	
    	if(nums.length != 0){
    	
    	
	    	for(int i = 1; i < nums.length; i++){
	    		if(nums[i] == nums[i - 1] && temp == false){
	    		counter++;
	    		temp = true;
	    		}
	    		
	    		else if(nums[i] != nums[i - 1]){
	    			temp = false;
	    		}
	    	}
    	}
 
        return counter;
    }

    /////////////
    // VORGABE //
    /////////////
    
    private static void print(int[] arr) {
        for (int i=0; i<arr.length ; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    private static void print(String[] arr) {
        for (int i=0; i<arr.length ; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {

        int[] c = {};
        int[] d = {8,9,10,11,-1};
        int[] f = {5,5,2,2,2,3};
        int[] g = {0, 0, 0, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2};

        System.out.println("\nAufgabe 1");
        print(boomBang(1,16));
        print(boomBang(15,15));
        print(boomBang(30,31));

        System.out.println("\nAufgabe 2");       
        tausche(d, 2, 3);
        print(d);
        alleTauschen(f);
        print(f);
        vertauscheN(g);
        print(g);

        System.out.println("\nAufgabe 3");       
        // Ergebnis: 5 2 0 0
        
        //Sollten es nicht 3 1 0 0 sein da g und f in Aufgabe 2 zu {0,0,0,1,1,1,1,1,2,2,2,2,2} und {5,2,2,2,3,5} ver�ndert wurden? 
        System.out.println(klumpen(g) + " " +klumpen(f) + " " +
                           klumpen(c) + " " + klumpen(d));

    }


}
