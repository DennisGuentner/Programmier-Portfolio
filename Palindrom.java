//Die Datei Prog1Laboruebung8 gehört zu dieser Klasse

public class Palindrom {

    private String pali;
    private static int methodenAufrufe;
    
    public Palindrom() {
    	this.pali = null;
    }
    
    public void setPali(String s) {
    	methodenAufrufe++;
    	this.pali = s;
    }

    public String getPali() {
    	methodenAufrufe++;
    	return this.pali;
    }

    public void add(String s) {
    	methodenAufrufe++;
    	this.pali = this.pali + s;
    	}
    
    public boolean isPali() {
    	methodenAufrufe++;
    	
    	boolean flag = true;
    	
    	for(int i = 0; i < pali.length()/2 && flag == true; i++) {
    		if(!pali.substring(i, i + 1).equals(pali.substring(pali.length() - 1 - i,pali.length() - i))){
    			flag = false;
    		}
    	}
    	return flag;
    }

    public void makePali() {
    	methodenAufrufe++;
    	
    	for(int i = pali.length() - 1; i >= 0; i--) {
    		pali = pali + pali.substring(i, i + 1);
    	}
    }

    public int getMethodenAufrufe() {
    	
    	return methodenAufrufe;
    }
    
}

