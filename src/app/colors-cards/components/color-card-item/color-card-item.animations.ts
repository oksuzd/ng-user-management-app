import {
  trigger,
  style,
  animate,
  transition,
  query,
  animateChild, state, group,
} from '@angular/animations';

const duration = '0.4s';

export const Position = trigger('position', [
  state('default', style({marginTop: 0, marginBottom: 0, boxShadow: 'none'})),
  state('changed', style({
    marginTop: '15px', marginBottom: '15px',
    boxShadow: '0 7px 12px -3px rgba(192,111,199,0.75)'
  })),
  transition('* <=> *',
    [group([
      query('@*', animateChild(), {optional: true}),
      animate(`${duration} ease-in-out`),
    ])])
]);

export const TitleBorder = trigger('titleBorder', [
  state('default', style({borderRadius: '5px'})),
  state('changed', style({borderRadius: '5px 5px 0 0'})),
  transition('* <=> *', [animate(`${duration} ease-in-out`)]),
]);

export const AngleRotate = trigger('angleRotate', [
  state('default', style({transform: 'rotate(0deg)'})),
  state('changed', style({transform: 'rotate(180deg)'})),
  transition('* <=> *', [animate(`${duration} ease-in-out`)]),
]);

export const Expand = [
  trigger('expand', [
    transition(':enter', [
      style({opacity: 0, marginBottom: 0, height: '30px'}),
      animate(
        `${duration} ease-out`,
        style({
          opacity: 1, marginBottom: '15px', height: '78px'
        })
      ),
    ]),
    transition(':leave', [
      animate(
        `${duration} ease-in`,
        style({opacity: 0, marginBottom: 0, height: '30px'})
      ),
    ]),
  ]),
];
