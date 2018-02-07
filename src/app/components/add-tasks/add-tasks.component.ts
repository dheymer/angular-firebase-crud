/**
 * @name: "Angular-Firestore"
 * @description: Task list made in Angular 5 with Firebase
 * @version: 1.0
 * @author: Dheymer Leon
 *          Phone     : +593-98-7982998
 *          Email     : dheymer@gmail.com
 *          IG/TW     : @dheymer
 *          Facebook  : @dheymerleonweb
 *          Skype     : dheymer
 *          LinkedIn  : linkedin.com/in/dheymer
 *          DeviantArt: dheymer.deviantart.com
 *          Website   : dheymer.000webhostapp.com
 */
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

/**
 * Class to represent the Creation of a new task and it's insertion to the tasks list
 * @export
 * @class AddTasksComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})

export class AddTasksComponent implements OnInit {
  task: Task = {                                        // The definition of the task as a JSON object
    title: '',                                          // The task name
    description: ''                                     // The task description
  };

  constructor(public taskService: TaskService) { }      // Sending the task service as parameter in the constructor method

  ngOnInit() {
  }

  /**
   * Method for the submitting of the new task form (Add task)
   */
  onSubmit() {
    if (this.task.title != '' && this.task.description != '') { // If the task has no empty fields...
      this.taskService.addTask(this.task);              // ...send the task to the add method of the service
      this.task.title = '';                             // after adding the task, clear the form's task title...
      this.task.description = '';                       // ... and also clear the description
    }
  }
}
