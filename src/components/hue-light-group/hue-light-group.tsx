import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'hue-light-group',
  styleUrl: 'hue-light-group.scss'
})
export class HueLightGroup {
  @Prop({mutable: true}) groups: any;

  getGroups() {
    let cards = [];

    console.log('groups in get groups', this.groups);
    
    for (let room in this.groups) {
      let groupedRoom = this.groups[room];
      console.log('group room', this.groups[room]);
      cards.push((
        <hue-row-title
          {...groupedRoom['state']}
          groupData={groupedRoom}
          groupId={groupedRoom.groupId}
          title={room}>
        </hue-row-title>
      ));

      groupedRoom['lights'].forEach((light) => {
        cards.push((
          <hue-card 
            class='danzerpress-col-3'
            {...light.state} 
            lightName={light.name} 
            lightId={light.lightId}>
          </hue-card>
        ));
      });
    }

    return cards;
  }

  render() {
    return (
      <div class="hue-collection danzerpress-flex-row">
        {this.getGroups()}
      </div>
    )
  }
}
