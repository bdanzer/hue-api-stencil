import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'hue-collection',
  styleUrl: 'hue-collection.scss',
  shadow: false
})
export class HueCollection {
  @Prop() loading = false;
  @Prop() lights: any;
  @Prop() group: boolean;
  @Prop() groups: object;

  getCards() {
    let cards = [];

    for (let lightId in this.lights) {
      if (lightId == '0') {
        return (<div>No Lights Found</div>);
      }

      var light = this.lights[lightId];
      cards.push((
        <hue-card 
          class='danzerpress-col-3'
          {...light.state} 
          lightName={light.name} 
          lightId={lightId}>
        </hue-card>
      ));
    }

    return cards;
  }

  render() {
    return this.loading ? (
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    ) : (
      <div class="hue-collection danzerpress-flex-row">
        {(this.group) ? 
          <hue-light-group
            groups={this.groups}>
          </hue-light-group> : 
          this.getCards()
        }
      </div>
    );
  }
}
