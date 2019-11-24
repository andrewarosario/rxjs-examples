import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, toArray, delay, tap } from 'rxjs/operators';

interface User {
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  private options$: Observable<string[]>;
  private user$: Observable<User>;

  constructor() { }

  ngOnInit() {
    this.options$ = Observable.create(
      (observer) => {
        for (let i = 0; i < 10; i++) {
          observer.next(`This is my ${i}th option` );
        }
        observer.complete();
      }
    )
    .pipe(
      map(s => s + '!'),
      // tap(s => console.log('antes: ', s)),
      toArray(),
      // tap(s => console.log('depois: ', s)),
      delay(1000)
    );
    // this.options$.subscribe(s=>console.log(s));

    this.user$ = new Observable<User>((observer) => {
      const names  = ["Mr. James", "Mr. John", "Mr. Ray", "Ms. Angel"];
      const logins = ["james", "john", 'ray', 'angel'];
      let i = 0;
      console.log('Here in user$')
      setInterval(() => {
        if (i === 4) {
          observer.complete();
        } else {
          observer.next({login: logins[i], name: names[i]});
        }
        i++;
      }, 3000);
    });
    // this.user$.subscribe(s=>console.log(s));

  }

}
