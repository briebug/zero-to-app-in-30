import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MapMarker } from '../map/map.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hometown',
  templateUrl: './hometown.component.html',
  styleUrls: ['./hometown.component.scss']
})
export class HometownComponent {

  userMarker$: Observable<MapMarker>;

  constructor(private userService: UserService, private afs: AngularFirestore) {
    // get the user's marker from the "hometowns" collection
    // valueChanges() gets us an observable that gives us a "live" reference to the document.
    this.userMarker$ = this.afs.doc<MapMarker>(`hometowns/${this.userService.currentUser.uid}`).valueChanges();
  }

}
