/* Programmierung 2 Laboruebung vom 09.07.2020,
- Ziel der Uebung war es ein Loginfenster zu erstellen!
*/

package ui;

import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.WindowConstants;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoginWindow implements ActionListener{
	// Logger
	private static final Logger logger = LogManager.getLogger(LoginWindow.class);
	
	// Allgemeines Fenster
	/** the JFrame instance used in this window */
	protected JFrame frame = null;
	/** the panel holding all components, uses {@link BoxLayout} Y-Direction */
	protected JPanel panel = null;
	/** the instance of {@link GamePanel} for Playgrounds to paint and refresh their level elements. It is added as first component of {@link #panel} */
	private GamePanel canvas = null;
	/** the button panel holding buttons, set on {@link #panel} at last, uses {@link BoxLayout} X-Direction */
	protected JPanel buttonPanel = null;
	
	//Alle �berschriften, Buttons und Texteingabefelder
	protected JLabel name;
	protected JTextField nameEingabe;
	protected JLabel passwort;
	protected JTextField passwortEingabe;
	protected JButton bestaetigung;
	
	//Die beiden m�glichen Boxen die nach der �berpr�fung des Nutzernamens und Passworts angezeigt werden.
	protected JOptionPane richtig;
	protected JOptionPane falsch;
	
	protected int sizeX = 250;
	protected int sizeY = 300;
	
	LoginWindow() {
		// create a canvas on which the levels (Playgrounds) will be painted later when loaded and started.
	    canvas = new GamePanel(sizeX, sizeY);
	    canvas.setVisible(true);

	    // create contentPane
	    panel = new JPanel();
	    panel.setLayout(new BoxLayout(this.panel, BoxLayout.Y_AXIS));


	    // panel.setLayout(new FlowLayout());
	    // panel.setLayout(new GridBagLayout());
	    // panel.setLayout(new SpringLayout());
	    panel.add(canvas);

	    // create main window
	    frame = new JFrame("Einloggen");
	    frame.setContentPane(panel);
	    
	    //Items im Men�
	    this.name = new JLabel("Login:");
	    this.name.setAlignmentX(Component.CENTER_ALIGNMENT);
	    this.nameEingabe = new JTextField("Max_Musterman", 30);
	    this.nameEingabe.setAlignmentX(Component.CENTER_ALIGNMENT);
	    this.passwort = new JLabel("Password");
	    this.passwort.setAlignmentX(Component.CENTER_ALIGNMENT);
	    this.passwortEingabe = new JTextField("", 30);
	    this.passwortEingabe.setAlignmentX(Component.CENTER_ALIGNMENT);
	    this.bestaetigung = new JButton("Login");
	    this.bestaetigung.setAlignmentX(Component.CENTER_ALIGNMENT);
	    this.bestaetigung.addActionListener(this);
	    
	    this.panel.setLayout(new BoxLayout(this.panel, BoxLayout.Y_AXIS));
	    this.panel.add(this.name);
	    this.panel.add(this.nameEingabe);
	    this.panel.add(this.passwort);
	    this.panel.add(this.passwortEingabe);
	    this.panel.add(this.bestaetigung);
	    
	 // make it visible (render window)
	    frame.pack();
	    frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
	    frame.setSize(sizeX, sizeY + 20);
	    frame.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getSource() == this.bestaetigung && this.nameEingabe.getText().equals("testuser") && this.passwortEingabe.getText().equals("1234")) {
			logger.info("Login richtig!");
			
			JOptionPane.showMessageDialog(frame, "Sie wurden Erfolgreich engemeldet.", "Login Erfolgreich", 1);
			frame.dispose();
		} else {
			JOptionPane.showMessageDialog(frame, "Falscher Nutzername oder falsches Passwort.", "Login fehlgeschlagen",0);
		}
	}
}