import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'dp-alert',
  styleUrl: 'dp-alert.scss'
})
export class DpAlert {
  @Prop({mutable: true}) alerted: boolean;
  @Prop({mutable: true}) text: string;
  @Prop({mutable: true}) ms: number;

  @Method()
  async toasty(text, alert, ms) {
    this.alerted = alert;
    this.text = text;
    this.ms = ms;

    if (alert && ms) {
      setTimeout(() => {
        this.alerted = !this.alerted
      }, ms);
    }
  }

  render() {
    return (
      <div class={`dp-alert ${this.alerted ? 'on' : 'off'}`}>
        {!this.ms ? (
          <span class="close-x" onClick={() => {this.alerted = false}}>x</span>
        ) : ''}
        <slot>{this.text}</slot>
      </div>
    );
  }
}