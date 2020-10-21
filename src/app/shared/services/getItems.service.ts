import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServerItem } from "../models/serverItem";
import { catchError, map, tap } from "rxjs/operators";
import { Item } from "../models/item";
import { url } from "../models/url";

@Injectable({ providedIn: "root" })
export class GetItemsService {
  hostingItems: Array<Item> = [];
  result: Item;
  serverItem: ServerItem;
  constructor(private http: HttpClient) {}

  pullItems(): Observable<ServerItem> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get<any>(`${url}/todos/1`);
    /*.subscribe(data => {
      console.log("***", data);
      this.serverItem = data
    });*/
  }

  getItems() {
    return this.serverItem;
  }
}
