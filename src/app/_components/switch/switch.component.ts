import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {
  @Output()
  changed = new EventEmitter<boolean>();

  onChanged(event) {
    this.changed.emit(event.target.checked);
  }
}
