import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';

interface WikipediaResponse {
  query: {
    search: {
      title: string
      snippet: string
      pageid: number
    }[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  public search(term: string) {
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {   // returns Observable
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    }).pipe(
      // pluck('query', 'search')  // Use map and optional chaining: pluck('foo', 'bar') is map(x => x?.foo?.bar). Will be removed in v8.
      map(response => response.query),
      map(query => query.search)
    )
  }




  /*
  public search(term: string) {
    return this.http.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    })
  }
  */
}

/* 
// Example
interface Car {
  year: number
  color: string
  running: boolean
  make: {
    name: string
    dateCreated: number
  }
}

const observable = new Observable<Car>((observer) => {
  observer.next({
    year: 2000,
    color: 'red',
    running: true,
    make: {
      name: 'Chevy',
      dateCreated: 1950
    }    
  })
}).pipe(
  pluck('make', 'dateCreated')  
)

observable.subscribe((value) => {
  console.log(value);
})
*/
