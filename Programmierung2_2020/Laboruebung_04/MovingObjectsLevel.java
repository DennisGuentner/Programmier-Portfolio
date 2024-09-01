/* Programmierung 2 Laboruebung vom 29.05.2020
- Ziel der Uebung war ein neues RectObject zu erstellen und die Werte Position, X- und Y-Geschwindigkeit, Höhe, Breite sowie Farbe anzupassen.
  sowie den ReboundController für weitere Funktionen zu implementieren.
*/

package playground;

import java.awt.Color;
import controller.ReboundController;
import gameobjects.RectObject;


// FIXME JavaDoc
public class MovingObjectsLevel extends SpaceInvadersLevel {

  
  // FIXME implement prepareLevel() method
  @Override
  public void prepareLevel (String id) {
    super.prepareLevel (id);
    Playground neuesLevel = new MovingObjectsLevel();
    RectObject Test = new RectObject(id, neuesLevel, (double)300, (double)300, 
    (double)170.0, (double)70.0, (double)30, (double)30, Color.BLUE );
    
    Test.addController(new ReboundController());
    addObject(Test);
  }
  
  

  /** "Moving Objects Level!" is the message.
   * 
   * @return String "Moving Objects Level!"
   */
  @Override
  protected String getStartupMessage() {
    return "Moving Objects Level!";
  }
}
