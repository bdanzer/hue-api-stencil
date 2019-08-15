import { Component, Prop, Host, h, Event, EventEmitter } from '@stencil/core';
import HueApi from '../../api/api';

@Component({
  tag: 'hue-row-title',
  styleUrl: 'hue-row-title.scss'
})
export class HueRowTitle {
  @Prop() title: string;
  @Prop() groupId: string;
  @Prop() reachable: any;
  @Prop({mutable: true}) any_on: boolean;
  @Prop() groupData: any;
  
  @Event({bubbles: false, composed: false}) GroupOff: EventEmitter;

  handleSwitch(_e) {
    if (this.groupId && this.groupData) {
      HueApi.setGroupState(this.groupId, {'on': !this.any_on});
      
      this.groupData['lights'].forEach(light => {
        this.GroupOff.emit(light.lightId);
      });

      this.toggle();
    }
  }

  toggle() {
    this.any_on = !this.any_on;
  }

  render() {
    return (
      <Host class="danzerpress-col-1">
        <h2>{this.title}</h2>
        <dp-switch
          isChecked={this.any_on}
          callback={this.handleSwitch.bind(this)}>
        </dp-switch>
      </Host>
    );
  }
}
