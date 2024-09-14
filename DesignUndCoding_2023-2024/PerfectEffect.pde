class PerfectEffect {
  int radius;
  int radiusMax;
  int posY;
  int animationSpeed;
  int fade;
  
  PerfectEffect (int radiusMax, int posY, int animationSpeed) {
    this.radius = 0;
    this.radiusMax = radiusMax;
    this.posY = posY;
    this.animationSpeed = animationSpeed;
    this.fade = 255;
  }
  
  void render(float fishPosX) {
    this.radius += this.animationSpeed;
    fill(0,0,0,0);
    stroke(255, 255, 185, fade);
    if(radius >= radiusMax / 2)     this.fade -= 255 * animationSpeed * 2 / radiusMax;
    strokeWeight(10);
    circle(fishPosX , posY, radius);
    stroke(0, 0, 0);
    strokeWeight(1);
  }
  
  boolean renderFinished() {
    if(radius >= radiusMax) return true;
    
    return false;
  }
}
