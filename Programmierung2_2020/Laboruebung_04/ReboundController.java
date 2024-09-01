/* Programmierung 2 Laboruebung vom 29.05.2020
- Ziel der Uebung war das Verhalten der RectObjects so zu modifizieren, dass diese nicht sich nicht ueber den Levelrand hinaus bewegen.
*/

package controller;

public class ReboundController extends ObjectController{

public ReboundController() {
super();
}
  
  @Override
  public void updateObject() {
    if (gameObject.getX() < 30 || gameObject.getX() > 670) {
    	gameObject.setVX(gameObject.getVX() * -1);
	}
	    
	if (gameObject.getY() < 30 || gameObject.getY() > 670) {
		gameObject.setVY(gameObject.getVY() * -1);
	}
	 applySpeedVector();
  }
}

 