import { Component, ViewEncapsulation } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { UserService } from '../services/user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent {

  lat = 37;
  lng = -97;
  markers$: Observable<MapMarker[]>;

  constructor(
    public userService: UserService,
    private afs: AngularFirestore
  ) {
    this.markers$ = afs.collection<MapMarker>('hometowns').valueChanges();
  }

  setHometown(event: MouseEvent) {
    if (this.userService.isLoggedIn()) {
      const marker: MapMarker = {
        lat: event.coords.lat,
        lng: event.coords.lng,
        label: this.userService.currentUser.displayName,
        photoUrl: this.userService.currentUser.photoURL
      };
      this.afs.doc(`hometowns/${this.userService.currentUser.uid}`).set(marker);
    }
  }
}

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  photoUrl: string;
}
