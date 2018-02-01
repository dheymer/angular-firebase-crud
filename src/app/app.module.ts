import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddTasksComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-fs')
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
