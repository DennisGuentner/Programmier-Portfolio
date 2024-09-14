class Wave {
  int wavePosX;
  int wavePosY;
  int waveWidth;
  int waveHeight;
  int waveSpeed;
  
  //Kollisionsprüfdaten
  int waveBorderdistanceFromItsCenterY;
  
  //Bild
  PImage waveImage;
  PImage currentImage;
  
  
  Wave(int centerX, int waterfallWidth, int waterfallHeight, int speed, PImage waveImage) {
    this.waveWidth = waterfallWidth;
    this.waveHeight = waterfallHeight / 30;
    this.wavePosX = centerX;
    this.wavePosY = -this.waveHeight;
    this.waveSpeed = speed;
    
    this.waveBorderdistanceFromItsCenterY = this.waveHeight / 2;
    
    this.waveImage = waveImage;
  }
  
  void render(){
    //fill(255,255,255);
    //rect(this.wavePosX, this.wavePosY, this.waveWidth, this.waveHeight);
    currentImage = waveImage.get(0,frameCount / 4 % 4 * 8, 135, 8);
    image(currentImage, this.wavePosX, this.wavePosY, this.waveWidth, this.waveHeight);
    
    this.wavePosY += this.waveSpeed;
  }
}
