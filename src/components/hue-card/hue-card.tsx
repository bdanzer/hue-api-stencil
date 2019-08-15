import { Component, h, Prop, Listen } from '@stencil/core';
import HueApi from '../../api/api';

@Component({
  tag: 'hue-card',
  styleUrl: 'hue-card.scss',
  shadow: false
})
export class HueCard {
  @Prop({mutable: true}) bri: any;
  @Prop({mutable: true}) on: boolean;
  @Prop() mode: string;
  @Prop() alert: string;
  @Prop() reachable: boolean;
  @Prop() lightName: string;
  @Prop() lightId: string;

  @Listen('rangeChagned')
  rangeChagned(data) {
    if (data.detail.data.lightId && this.reachable) {
      var value = parseInt((data.detail.event.target as HTMLInputElement).value);
      HueApi.setLightState(data.detail.data.lightId, {'bri': value});
    }
    this.bri = parseInt((data.detail.event.target as HTMLInputElement).value);
  }

  @Listen('GroupOff')
  handleLightOff(lightId) {
    console.log(lightId);
    if (parseInt(this.lightId) === parseInt(lightId)) {
      this.toggle();
    }
  }

  // @Listen('inputChanged')
  // inputChanged(data) {
  //   if (this.reachable) {
      
  //   }
  // }

  toggle() {
    this.on = !this.on;
  }

  getPercentage(number) {
    let percentage = ((254 - parseInt(number)) / 254 * 100) - 100
    let positiveNumber = Math.abs(percentage)
    return Math.floor(positiveNumber);
  }

  switchClicked(_e) {
    if (this.lightId && this.reachable) {
      HueApi.setLightState(this.lightId, {'on': !this.on});
      this.toggle();
    }
  }

  render() {
    return [
      (!this.reachable) ? <div class="not-reachable-alert danzerpress-shadow-1">Not Reachable</div> : '',
      <div class={`card-wrap danzerpress-box danzerpress-shadow-2 light-${(this.on) ? 'on': 'off'} light-reachable-${this.reachable}`}>
        <h2 class="light-title">{this.lightName}</h2>
        <div class="danzerpress-flex-row">
          <div class="danzerpress-col-2">
            <img class="lightbulb" src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Lighting_and_Fans/standard-light-bulb.png"/>
          </div>
          <div class="danzerpress-col-2">
            <p>
              <dp-switch
                label={`Light status: ${(this.on) ? 'On': 'Off'}`}
                isChecked={this.on}
                ariaLabel={this.lightName}
                callback={this.switchClicked.bind(this)}
                disabled={!this.reachable}>
              </dp-switch>
            </p>

            <h4>Light Brightness: {this.getPercentage(this.bri)}%</h4>
            <dp-range
              min="1"
              max="254"
              rangeValue={this.bri}
              data={{'lightId': this.lightId}}
              ariaLabel={`Control the light brightness of ${this.lightName}`}
              ariaValueNow={this.getPercentage(this.bri)}
              disabled={!this.reachable}>
            </dp-range>
          </div>
        </div>
      </div>
    ];
  }
}