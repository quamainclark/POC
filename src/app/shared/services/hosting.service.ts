import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Item } from "../models/item";
import { url } from "../models/url";

@Injectable({ providedIn: "root" })
export class HostingService {
  hostingItems: Array<Item> = [];
  result: Item;
  constructor(private http: HttpClient) {}

  insertToHosting(item: Item) {
    this.hostingItems.push(item);
  }

  hostItems() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    console.log("hosting .... ", this.hostingItems, options);

    return this.http
      .post<any>(`${url}/todos`, this.hostingItems, options)
      .subscribe(data => {
        console.log(data);
      });
  }

  getHostedItems() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    return this.http.get<any>(`${url}/todos`, options).subscribe(data => {
      console.log(data);
    });
  }
}
