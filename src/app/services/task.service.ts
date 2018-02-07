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

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Task } from '../models/task';

import { Observable } from 'rxjs/Observable';

/**
 * Class service for the CRUD operations
 */
@Injectable()
export class TaskService {
  tasksCollection: AngularFirestoreCollection<Task>;    // Tasks collection from Firebase
  tasks: Observable<Task[]>;                            // Tasks list as observable for the tasks component
  taskDoc: AngularFirestoreDocument<Task>;              // One single task object from Firebase

  constructor(public afs: AngularFirestore) {             // Use the connection to Firebase as parameter in constructor
    this.tasksCollection = this.afs.collection('tasks');  // Open the tasks collection from Firebase
    this.tasks = this.tasksCollection.snapshotChanges().map(changes => { // Constantly check for changes in the collection
      return changes.map(a => {                           // from firebase and send those changes to the tasks list to keep
        const data = a.payload.doc.data() as Task;        // them updated in the application with each excecuted method.
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * The CREATE method, adding a new task to the tasks list and to the collection in Firebase
   * @param task The task to be added
   */
  addTask(task: Task) {
    this.tasksCollection.add(task);                       // Add the new task to the tasks collection in Firebase
  }

  /**
   * The READ method, obtaining the tasks list
   */
  getTasks() {
    return this.tasks;                                    // Return the tasks list
  }

  /**
   * The UPDATE method, editing a task in the collection and tasks list.
   * @param task The task to update
   */
  updateTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);      // Obtain the single task from Firebase with the task ID...
    this.taskDoc.update(task);                            // ...and update directly in the Firebase collection
  }

  /**
   * The DELETE method, removing a task from the collection in Firebase and the tasks list
   * @param task The task to be deleted
   */
  deleteTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);      // Obtain the single task from Firebase with the task ID...
    this.taskDoc.delete();                                // ...and delete it from the Firebase collection
  }
}
