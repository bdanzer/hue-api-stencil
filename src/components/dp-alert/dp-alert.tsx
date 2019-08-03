import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'dp-alert',
  styleUrl: 'dp-alert.scss'
})
export class DpAlert {
  @Prop({mutable: true}) alerted: boolean;
  @Prop({mutable: true}) text: string;
  @Prop({mutable: true}) ms: number;

  componentDidLoad() {
  }

  componentWillUpdate() {
    console.log('alerted', this.alerted);
  }

  @Method()
  async test() {
    console.log('works');
  }

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
    console.log('this alerted render', this.alerted, this.text);
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