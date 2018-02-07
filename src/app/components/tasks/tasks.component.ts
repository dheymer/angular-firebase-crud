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
 * Class to represent the tasks list component, defining the methods for Read, Update and Delete
 * @export
 * @class TasksComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: Task[];                                        // The tasks list obtained from DB
  taskToEdit: Task;                                     // The task to edit
  editState: boolean = false;                           // Flag that indicates if the task is being edited

  constructor(public taskService: TaskService) { }      // Sending the task service as parameter in the constructor method

  /**
   * Initialization method
   */
  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {    // Obtain the tasks list from the service as an observable
      this.tasks = tasks;
    });
  }

  /**
   * Delete a task from the tasks list (and from the DB)
   * @param event The event that triggers the method
   * @param task The task to delete
   */
  deleteTask(event, task) {
    const response = confirm('Are you sure you want to delete?'); // Confirm the deletion of the task
    if (response) {                                               // If deletion is confirmed...
      this.taskService.deleteTask(task);                          // ...send the task to the delete method of the service
    }
    return;                                                       // ...finish the method
  }

  /**
   * Set a task to edit mode
   * @param event The event that triggers the method
   * @param task The task to edit
   */
  editTask(event, task) {
    this.editState = !this.editState;                             // Toggle the "edit mode" flag to true
    this.taskToEdit = task;                                       // Assign the task to the one to edit
  }

  /**
   * Update the task in the DB
   * @param task The task to update
   */
  updateTask(task) {
    this.taskService.updateTask(task);                            // Send the task to the update method of the service
    this.editState = false;                                       // Toggle the "edit mode" flag to false
    this.taskToEdit = null;                                       // and clear the task to edit
  }

}
