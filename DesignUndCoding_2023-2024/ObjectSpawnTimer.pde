class ObjectSpawnTimer {
  int[] waveTimer;
  int[] stoneTimer;
  int[] stickTimer;
  
  int i;
  int j;
  int k;

  ObjectSpawnTimer(int[] waveTimer, int[] stoneTimer, int[] stickTimer) {
    this.waveTimer = waveTimer;
    this.stoneTimer = stoneTimer;
    this.stickTimer = stickTimer;
  }
  
  boolean countWaveTimer() {
    if(i >= waveTimer.length) return false;
    
    waveTimer[i]--;
    if(waveTimer[i] == 0) {
      i++;
      return true;
    }
    
    return false;
  }
  
  boolean countStoneTimer() {
    if(j >= stoneTimer.length) return false;
    
    stoneTimer[j]--;
    if(stoneTimer[j] == 0) {
      j++;
      return true;
    }
    
    return false;
  }
  
  boolean countStickTimer() {
    if(k >= stickTimer.length) return false;
    
    stickTimer[k]--;
    if(stickTimer[k] == 0) {
      k++;
      return true;
    }
    
    return false;
  }
}
