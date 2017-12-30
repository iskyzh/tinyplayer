import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/timer";

import * as _ from 'lodash';
import { Howl } from 'howler';
import { PlayerlistService } from './playerlist.service';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlayerlistService]
})
export class AppComponent {
  title = 'app';

  private playerList$: Observable<any>;
  private playerList: Array<any>;
  private sounds: Array<Howl>;
  private scheduler: Array<number>;

  private __current = 0;
  private __total = 0;

  private __currentTime = Date.now();
  private __played = 0;

  constructor(private playerListService: PlayerlistService) {
    this.playerList$ = playerListService.getList();
    this.playerList$.subscribe(list => {
      let __loading = _.size(list);
      this.sounds = _.map(list, sound => new Howl({
        src: [sound.url],
        autoplay: false,
        loop: false,
        preload: true,
        volume: 1,
        onload: () => this.bootstrap(--__loading)
      }));
      this.playerList = list;
      Observable.timer(0, 300).subscribe(() => {
        this.__currentTime = Date.now();
        if (this.sounds[this.__current].duration()) {
          let __pos = <number>this.sounds[this.__current].seek();
          this.__played =  __pos / this.sounds[this.__current].duration();
        }
      });
    });
  }
  
  schedule() {
    this.scheduler = [Date.now()];
    for (let __index = 1; __index < this.playerList.length; __index++) {
      this.scheduler.push(_.last(this.scheduler) + this.sounds[__index - 1].duration() * 1000);
    }
  }

  bootstrap(loading) {
    if (loading == 0) {

      this.__total = _.size(this.playerList);
      this.schedule();
      this.sounds[0].play();
      this.sounds[0].once('end', () => this.onend());
    }
  }

  onend() {
    this.__current++;
    if (this.__current >= this.__total) {
      this.__current = 0;
    }
    this.sounds[this.__current].play();
    this.sounds[this.__current].once('end', () => this.onend());
    this.schedule();
  }
}
