import { Component, OnInit } from '@angular/core';
import { initialFilters, VISIBILITY_FILTER } from '../../models/filter';
import { Todo } from '../../models/todo';
import { TodosQuery } from '../../states/todo/todo.query';
import { TodosService } from '../../states/todo/todo.service';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  todos$: Observable<Todo[]>;
  activeFilter$: Observable<VISIBILITY_FILTER>;
  filters = initialFilters;

  constructor(private todosQuery: TodosQuery,
              private todosService: TodosService) {
  }

  ngOnInit() {
    this.todos$ = this.todosQuery.selectVisibleTodos$;
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
  }


  add(input: HTMLInputElement) {
    this.todosService.add(input.value);
    input.value = '';
  }

  complete(todo: Todo) {
    this.todosService.complete(todo);
  }

  delete(id: ID) {
    this.todosService.delete(id);
  }

  changeFilter(filter: VISIBILITY_FILTER) {
    this.todosService.updateFilter(filter);
  }

}
