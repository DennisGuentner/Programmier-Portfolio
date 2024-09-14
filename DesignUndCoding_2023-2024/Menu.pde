class Menu {
  boolean restartStatus;
  
  int centerX;
  int centerY;
  int menuWidth;
  int menuHeight;
  int menuPosY;
  
  color titleStartGame;
  color titleGameOver;
  color boxInactive;
  color textInactive;
  color boxActive;
  color textActive;
  int titleTextSize;
  int optionTextSize;
  
  int optionBoxWidth;
  int optionBoxHeight;
  int optionBoxLeftBorder;
  int optionBoxRightBorder;
  
  color titleCurrent;
  int titlePosY;
  
  color option1Current;
  color optionBox1Current;
  int option1PosY;
  int optionBox1PosY;
  int optionBox1TopBorder;
  int optionBox1BottomBorder;
  
  color option2Current;
  color optionBox2Current;
  int option2PosY;
  int optionBox2PosY;
  int optionBox2TopBorder;
  int optionBox2BottomBorder;
  
  color option3Current;
  color optionBox3Current;
  int option3PosY;
  int optionBox3PosY;
  int optionBox3TopBorder;
  int optionBox3BottomBorder;
  
  //Custom MausAnzeige;
  int mouseCursorSize;
  int mouseBorderLeft;
  int mouseBorderRight;
  PImage customMouseImg;
  
  
  

  Menu (int centerX, int centerY, int waterfallWidth, int waterfallHeight, PImage customMouseImg) {
    this.restartStatus = false;
    
    this.centerX = centerX;
    this.centerY = centerY;
    this.menuWidth = waterfallWidth;
    this.menuHeight = waterfallHeight / 5;
    this.menuPosY = centerY + centerY / 20;
    
    this.titleStartGame = color(255,200,100);
    this.titleGameOver = color(255, 0, 0);
    this.boxInactive = color(100 ,100 ,100);
    this.textInactive = color(200 ,200 ,200);
    this.boxActive =  color(255 ,255 ,255);
    this.textActive = color(255 ,255 ,255);
    this.titleTextSize = waterfallHeight / 20;
    this.optionTextSize = titleTextSize / 2;
    
    this.optionBoxWidth = menuWidth * 2 / 6;
    this.optionBoxHeight = optionTextSize + optionTextSize / 20;
    this.optionBoxLeftBorder = this.centerX - this.optionBoxWidth / 2;
    this.optionBoxRightBorder = this.centerX + this.optionBoxWidth / 2;
    
    this.titleCurrent = this.titleStartGame;
    this.titlePosY = centerY;
    
    this.option1Current = this.textInactive ;
    this.optionBox1Current = this.boxInactive;
    this.option1PosY = titlePosY + titleTextSize;
    this.optionBox1PosY = option1PosY - option1PosY / 60;
    this.optionBox1TopBorder = optionBox1PosY - optionBoxHeight / 2;
    this.optionBox1BottomBorder = optionBox1PosY + optionBoxHeight / 2;
    
    this.option2Current = this.textInactive ;
    this.optionBox2Current = this.boxInactive;
    this.option2PosY = option1PosY + optionTextSize * 5 / 3;
    this.optionBox2PosY = option2PosY - option1PosY / 60;
    this.optionBox2TopBorder = optionBox2PosY - optionBoxHeight / 2;
    this.optionBox2BottomBorder = optionBox2PosY + optionBoxHeight / 2;
    
    this.option3Current = this.textInactive ;
    this.optionBox3Current = this.boxInactive;
    this.option3PosY = option2PosY + optionTextSize;
    this.optionBox3PosY = option3PosY - option1PosY / 60;
    this.optionBox3TopBorder = optionBox3PosY - optionBoxHeight / 2;
    this.optionBox3BottomBorder = optionBox3PosY + optionBoxHeight / 2;
    
    this.mouseCursorSize = waterfallHeight / 30;
    this.mouseBorderLeft = centerX - (waterfallWidth / 2);
    this.mouseBorderRight = centerX + (waterfallWidth / 2) - mouseCursorSize;
    this.customMouseImg = customMouseImg;
    
  }
  void renderCustomMouse(int mousePosX, int mousePosY) {
    rectMode(CORNER);
    fill(255,0,0);
    image(customMouseImg, constrain(mousePosX, this.mouseBorderLeft, this.mouseBorderRight), mousePosY, mouseCursorSize, mouseCursorSize);
    //rect(constrain(mousePosX, this.mouseBorderLeft, this.mouseBorderRight), mousePosY, mouseCursorSize, mouseCursorSize);
    rectMode(CENTER);
  }
  
  /*
  void renderStart() {
    fill(0,0,0,150);
    rect(centerX, centerY, menuWidth, menuHeight);
  }
  
  void renderPause() {
    fill(0,0,0,150);
    rect(centerX, centerY, menuWidth, menuHeight);
  }
  */
  void renderGameOver() {
    textAlign(CENTER);
    fill(0,0,0,230);
    rect(centerX, menuPosY, menuWidth, menuHeight);
    
    //Title
    textSize(titleTextSize);
    fill(titleCurrent);
    text("Game Over", this.centerX, this.titlePosY);
    
    //Optionen
    textSize(this.optionTextSize);
    strokeWeight(1);
    
    //Option1
    fill(0,0,0,0);
    stroke(optionBox1Current);
    rect(this.centerX, this.optionBox1PosY, this.optionBoxWidth, this.optionBoxHeight);
    fill(option1Current);
    text("Neuer Versuch", this.centerX, this.option1PosY);
    
    //Option2
    fill(0,0,0,0);
    stroke(optionBox2Current);
    rect(this.centerX, this.optionBox2PosY, this.optionBoxWidth, this.optionBoxHeight);
    fill(option2Current);
    text("Spiel beenden", this.centerX, this.option2PosY);
    
    //Optionen Ende
    stroke(0,0,0);
    strokeWeight(1);
    
    
  }
  
  void GameOver(int mousePosX, int mousePosY) {
    this.titleCurrent = this.titleGameOver;
    
    if(mouseX > this.optionBoxLeftBorder && mouseX < this.optionBoxRightBorder && mouseY > this.optionBox1TopBorder && mouseY < this.optionBox1BottomBorder) {
      this.optionBox1Current = this.boxActive;
      this.option1Current = this.textActive;
      
      if(mousePressed == true && mouseButton == LEFT) {
        this.restartStatus = true;
      }
    } else {
      this.optionBox1Current = this.boxInactive;
      this.option1Current = this.textInactive;
    }
    
    if(mouseX > this.optionBoxLeftBorder && mouseX < this.optionBoxRightBorder && mouseY > this.optionBox2TopBorder && mouseY < this.optionBox2BottomBorder) {
      this.optionBox2Current = this.boxActive;
      this.option2Current = this.textActive;
      
      if(mousePressed == true && mouseButton == LEFT) {
        exit(); 
      }
    } else {
      this.optionBox2Current = this.boxInactive;
      this.option2Current = this.textInactive;
    }
    
    renderGameOver();
    renderCustomMouse(mousePosX, mousePosY);
  }
}
