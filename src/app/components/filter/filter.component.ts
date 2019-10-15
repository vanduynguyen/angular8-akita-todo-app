import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoFilter, VISIBILITY_FILTER} from '../../models/filter';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  @Input() active: VISIBILITY_FILTER;
  @Input() filters: TodoFilter[];
  @Output() update = new EventEmitter<VISIBILITY_FILTER>();

  control: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.control = new FormControl(this.active);

    this.control.valueChanges.subscribe(c => {
      this.update.emit(c);
    });
  }
}
