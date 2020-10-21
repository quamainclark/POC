import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServerItem } from "../models/serverItem";
import { catchError, map, tap } from "rxjs/operators";
import { url } from "../models/url";

@Injectable({ providedIn: "root" })
export class RoleService {
  currentRole: string = "";

  constructor(private http: HttpClient) {}

  createHostRole() {
    console.log("is this called?");
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    console.log("create service");

    return this.http
      .post<any>(`${url}/todos/role`, null, options)
      .subscribe(data => {
        console.log("createHostRole==> ", data);
      });
  }

  getCurrentRole() {
    console.log("----- getCurrentRole");
    return this.http.get<any>(`${url}/todos/role`).subscribe(data => {
      console.log("++++++", data);
      this.currentRole = data.content;
    });
  }

  getRole() {
    console.log("get current role", this.currentRole);
    return this.currentRole;
  }

  setRole(role: string) {
    this.currentRole = role;
  }
}
