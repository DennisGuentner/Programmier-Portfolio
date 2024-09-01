/* Programmierung 2 Laboruebung vom 19.06.2020 
 - Ziel war es eine neue Klasse die von einer abstrakten Klasse erbt zu erstellen und die Methoden mit vorgegebenen Funktionen zu füllen.
 - Es sollte Brick-Pong implementiert werden.
*/

package playground;

import java.awt.Color;

import collider.RectCollider;
import controller.EgoController;
import controller.ReboundController;
import gameobjects.FallingStar;
import gameobjects.GameObject;
import gameobjects.RectObject;

public class BreakoutLevel1 extends BreakoutLevelBase {

	@Override
	protected GameObject createEgoObject() {
		//Creates the Ego Object that represents the player and adds an controller and collider.
		
		RectObject Ego = new RectObject ("ego1", this, (double)350, (double)550, (double)0,
		        (double)0, (double)80, (double)10, Color.WHITE);
		
		EgoController controller_ego = new EgoController((double)50); 
		RectCollider collider_ego = new RectCollider("ego_collider", Ego, (double)80, (double)0);
		
		Ego.addController(controller_ego);
		Ego.addCollider(collider_ego); 
		
		this.ego = Ego;
		return this.ego;
	}

	@Override
	protected GameObject createBall() {
		//Creates the Ball Object that will be used to destroy the Brick Objects and adds an controller.
		FallingStar Ball = new FallingStar("ball", this, (double)350, (double)350, (double)170, (double)170, Color.RED, (double)5 );
		
		ReboundController controller_ball = new ReboundController();
		Ball.addController(controller_ball);
		
		this.ball = Ball;
		return this.ball;
	}

	@Override
	protected GameObject createBrick(int row, int column) {
		// Creates a Brick object in regular distance from each other and adds an collider to the object.
		double distance = 1;
		RectObject brick = new RectObject ("brick" + row + column, this, (double)40 + column * (60 + distance),
		 (double)40 + row   * (30 + distance), (double)0, (double)0, (double)60, (double)30, Color.GREEN);
		
		RectCollider collider_brick = new RectCollider("brick_collider" + row + column, brick,(double)60, (double)30);
		brick.addCollider(collider_brick);
		
		return brick;
	}

	@Override
	protected void actionIfBallHitsBrick(GameObject ball, GameObject brick) {
		ball.setVX(ball.getVX() * -1);
		ball.setVY(ball.getVY() * -1);
		
		deleteObject(brick.id);
	}

	@Override
	protected void actionIfBallHitsEgo(GameObject ball, GameObject ego) {
		ball.setVY(ball.getVY() * -1);
	}

	@Override
	public void prepareLevel(String level) {
		// TODO Auto-generated method stub
	    
		int row_max = 3;
		int column_max = 10;
		createEgoObject();
		createBall();

		
		for(int row = 0; row <= row_max; row++ ) {
			for(int column = 0; column <= column_max; column++) {
			addObject(createBrick(row, column));
			}
		}
		
		addObject(this.ego);
		addObject(this.ball);	
	}
}
