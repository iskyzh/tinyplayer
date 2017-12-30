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
  private duration: Array<number> = [];

  private __current = 0;
  private __total = 0;

  private __currentTime = Date.now();
  private __played = 0;
  private __end_time = Date.now();

  private __upcoming_card = _.range(5);

  constructor(private playerListService: PlayerlistService) {
    this.playerList$ = playerListService.getList();
    this.playerList$.subscribe(list => {
      this.sounds = _.map(list, sound => new Howl({
        src: [sound.url],
        autoplay: false,
        loop: false,
        preload: false,
        html5: true,
        volume: 1
      }));
      this.playerList = list;
      this.bootstrap(0);
      Observable.timer(0, 200).subscribe(() => {
        this.__currentTime = Date.now();
        if (this.sounds[this.__current].state() == 'loaded') {
          let __pos = <number>this.sounds[this.__current].seek();
          this.__played =  __pos / this.duration[this.__current];
        }
      });
    });
  }
  
  schedule() {
    this.__end_time = Date.now() + this.duration[this.__current] * 1000;
    this.scheduler = _.times(this.__current + 1, _.constant(Date.now()));
    for (let __index = this.__current + 1; __index < _.size(this.playerList); __index++) {
      this.scheduler.push(_.last(this.scheduler) + this.duration[__index - 1] * 1000);
    }
  }

  bootstrap(loading) {
    if (loading == _.size(this.playerList)) {
      this.sounds[0].once('load', () => {
        this.__total = _.size(this.playerList);
        this.schedule();
        this.sounds[0].play();
        this.sounds[0].once('end', () => this.onend());
      });
      this.sounds[0].load();
    } else {
      this.sounds[loading].once('load', () => {
        this.duration.push(this.sounds[loading].duration());
        this.sounds[loading].unload();
        this.bootstrap(loading + 1);
      });
      this.sounds[loading].load();
      
    }
  }

  onend() {
    this.sounds[this.__current].stop();
    this.sounds[this.__current].unload();
    this.__current++;
    if (this.__current >= this.__total) {
      this.__current = 0;
    }
    this.sounds[this.__current].once('load', () => {
      this.schedule();
      this.sounds[this.__current].play();
      this.sounds[this.__current].once('end', () => this.onend());
    });
    this.sounds[this.__current].load();
  }
}
