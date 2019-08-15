import { Component, h, Event, Prop, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'dp-switch',
  styleUrl: 'dp-switch.scss'
})
export class Switch {
  @Event() switchClicked: EventEmitter;
  @Prop() isChecked: boolean;
  @Prop() data: any;
  @Prop() label: string;
  @Prop() ariaLabel: string;
  @Prop() callback: Function;
  @Prop() disabled: boolean = false;

  @Listen('keydown')
  handleKeys(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      this.callback(ev, this.data);
    }
  }

  render() {
    return (
      <label htmlFor="checkbox" class="switch">
        <h4>{this.label}</h4>
        <input 
          name="checkbox" 
          type="checkbox"  
          checked={this.isChecked}
          disabled={this.disabled}/>
        <span 
          tabIndex={(this.disabled) ? -1 : 0} 
          onClick={(e) => this.callback(e)} 
          aria-label={`Turn off ${this.ariaLabel} light`}>
        </span>
      </label>
    );
  }
}
