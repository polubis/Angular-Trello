import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { of } from 'rxjs';
import { from } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Observable } from "rxjs/internal/Observable";
import { ProjectsService } from "src/app/services/projects.service";
import { Input } from "@angular/core";
import { OperationsService } from "src/app/services/operations.service";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"]
})
export class SearcherComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private operationsService: OperationsService
  ) {}

  @Input() projectId: number;
  @Input() personsAlreadyInProject: any[];
  @Output() onSelectingRole = new EventEmitter<any>();
  @Output() onCloseSearcher = new EventEmitter<void>();
  isSearching: boolean = false;
  inputValue = new Subject();
  subscription: Subscription;
  results: any[] = [];

  currentAssigningPerson: number = -1;
  selectRoleNavigationOpenedIn: number = -1;
  roles: any[] = [
    { icon: "", name: "Project Leader", id: 2 },
    { icon: "", name: "Project Collaborator", id: 3 }
  ];
  ngOnInit() {
    this.subscription = this.getResults().subscribe(items => {
      const itemsWithoutPersonsInProject = [];

      items.forEach(item => {
        let shouldAdd = true;
        this.personsAlreadyInProject.forEach(person => {
          if (person === item.id) shouldAdd = false;
        });
        if (shouldAdd) itemsWithoutPersonsInProject.push(item);
      });

      this.results = itemsWithoutPersonsInProject;
      this.isSearching = false;
    });
  }
  closeSearcher(){
    this.onCloseSearcher.emit();
  }
  sendRequestForUsers(term: string) {
    this.isSearching = true;
    let promise = this.usersService
      .getUsersByQuery(term)
      .then(response => response)
      .catch(error => error);

    return from(promise);
  }

  assignTaskToPerson(roleData: any, item: any, index: number) {
    this.selectRoleNavigationOpenedIn = -1;
    this.currentAssigningPerson = index;
    const payload = {
      userId: item.id,
      projectId: this.projectId,
      roleId: roleData.id
    };
    this.projectsService
      .addPersonToProject(payload)
      .then(response => {
        this.currentAssigningPerson = -1;
        this.results.splice(index, 1);
        this.onSelectingRole.emit(item);
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.currentAssigningPerson = -1));
  }

  togleSelectRole(item: any, index: number) {
    this.selectRoleNavigationOpenedIn = this.selectRoleNavigationOpenedIn
      ? -1
      : index;
  }

  getResults() {
    return this.inputValue
      .debounceTime(250)
      .distinctUntilChanged()
      .map((value: string) => value.trim())
      .filter(value => value.length > 2)
      .switchMap(value => (value ? this.sendRequestForUsers(value) : of([])))
      .catch(error => of([]));
  }

  handleType(e: any) {
    this.inputValue.next(e.target.value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
