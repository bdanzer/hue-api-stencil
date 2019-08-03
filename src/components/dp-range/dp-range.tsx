import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dp-range',
  styleUrl: 'dp-range.scss'
})
export class Range {
  @Prop({mutable: true}) rangeValue: string;
  @Prop() min: string;
  @Prop() max: string;
  @Prop() data: any;
  @Prop() ariaLabel: string;
  @Prop() ariaValueNow: number;
  @Prop() disabled: boolean = false;

  @Event() rangeChagned: EventEmitter;
  @Event() inputChanged: EventEmitter;

  render() {
    return (
      <input 
        type="range" 
        class="range"
        id="start" 
        name="volume"
        min={this.min} 
        max={this.max} 
        onChange={(e) => {this.rangeChagned.emit({'data': this.data, 'event': e})}} 
        onInput={(e) => {this.inputChanged.emit({'event': e})}} 
        value={this.rangeValue} 
        aria-label={this.ariaLabel}
        aria-valuenow={`${this.ariaValueNow} percent`}
        aria-valuetext={`${this.ariaValueNow} percent`}
        step="1"
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        tabIndex={(this.disabled ? -1 : 0)}
        disabled={this.disabled}/>
    );
  }
}
