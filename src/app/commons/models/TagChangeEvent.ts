import {ContactTag} from './ContactTag';

export class TagChangeEvent {
  type: string;
  tag: ContactTag;
  contact: ContactTag;
}
