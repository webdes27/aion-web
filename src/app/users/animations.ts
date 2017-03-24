import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';


export const fadeInItems: AnimationTriggerMetadata = trigger('fadeInItems', [
  state('showing', style({opacity: 1})),
  transition('void => *', [
    style({opacity: 0}),
    animate(`200ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
  ])
]);

export const flyInOut: AnimationTriggerMetadata = trigger('flyInOut', [
  state('in', style({opacity: 1, transform: 'translateX(0)'})),
  transition('void => *', [
      style({
          opacity: 0,
          transform: 'translateX(-100%)'
      }),
      animate('0.5s ease-in')
  ]),
  transition('* => void', [
      animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
      }))
  ])
]);
