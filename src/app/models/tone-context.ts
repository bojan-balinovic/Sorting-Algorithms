import * as Tone from 'tone';

export class ToneContext {
  private static instance: Tone.Synth;
  private static gainNode: GainNode;
  private static previousSoundStartTime: number = 0;

  public static getInstance(): Tone.Synth {
    if (!this.instance) {
      this.instance = new Tone.Synth().toDestination();
      this.instance.volume.value = -20;
    }
    return this.instance;
  }

  public static playSound(frequency: number) {
    let instance = this.getInstance();
    let time = Tone.now();
    if (time <= this.previousSoundStartTime) {
      time = this.previousSoundStartTime + 0.0001;
    }
    instance.triggerAttackRelease(frequency, '8n', time);
    this.previousSoundStartTime = time;
  }
}
