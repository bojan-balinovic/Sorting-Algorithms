import { Component, OnInit } from '@angular/core';
import { ToneContext } from 'src/app/models/tone-context';
import { getScaledValue } from 'src/app/utils/get-scaled-value';
import * as Tone from 'tone';

@Component({
  selector: 'app-volume-adjuster',
  templateUrl: './volume-adjuster.component.html',
  styleUrls: ['./volume-adjuster.component.scss'],
})
export class VolumeAdjusterComponent implements OnInit {
  volume: number = 100; // from 0 to 100
  toneContext: Tone.Synth;

  private minDecibels = -80;
  private maxDecibels = -20;

  constructor() {
    this.toneContext = ToneContext.getInstance();
  }

  ngOnInit(): void {
    this.toneContext.volume.value = getScaledValue(
      this.volume,
      0,
      100,
      this.minDecibels,
      this.maxDecibels
    );
  }

  onVolumeChanged(e?: Event) {
    this.toneContext.volume.value = getScaledValue(
      this.volume,
      0,
      100,
      this.minDecibels,
      this.maxDecibels
    );
  }

  toggleMute() {
    if (this.volume === 0) {
      this.volume = 50;
    } else if (this.volume > 0) {
      this.volume = 0;
    }
    this.onVolumeChanged();
  }
}
