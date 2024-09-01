/* Programmierung 2 Laboruebung vom 09.07.2020,
- Ziel der Uebung war, eine neue GUI Klasse zu erstellen und diese zu erweitern
*/
package ui;

import java.awt.event.ActionEvent;
import javax.swing.JMenuItem;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class GameUIWithLogin extends GameUI {
	//Logger und ein neues Men�Item werden deklariert
	private static final Logger logger = LogManager.getLogger(GameUIWithLogin.class);
	protected JMenuItem loginItem;
	LoginWindow loginWindow;
	
	//Konstruktor
	public GameUIWithLogin(int sizeX, int sizeY) {
		super(sizeX, sizeY);
		logger.info("wird konstruiert");
		
		//Neues MenuItem wird hinzugef�gt und eine Aktion vergeben
		this.loginItem = new JMenuItem("Login...");
		this.loginItem.addActionListener(this);
		this.gameMenu.add(loginItem, 0);
	}
	
	public void actionPerformed(ActionEvent ae) {
		super.actionPerformed(ae);
		if(ae.getSource() == this.loginItem) {
			loginWindow = new LoginWindow();
			logger.info("Login activated!");
		}
	}

}
