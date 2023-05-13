import { Subject } from 'rxjs';
import { ToneContext } from './tone-context';
import * as Tone from 'tone';

export class Node {
  id: number = 0;
  value: number = 0;
  public shouldHighlightInNextFrame: boolean = false;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
  }
  playFrequencySound() {
    ToneContext.playSound(this.value);
  }
  highlightSwap() {
    this.playFrequencySound();
    this.shouldHighlightInNextFrame = true;
  }
}
