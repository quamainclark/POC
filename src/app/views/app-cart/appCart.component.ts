import { Component, OnInit, OnChanges, Input, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { Item } from "../../shared/models/item";
import { Items } from "../../shared/models/mock-items";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { IsShownItemService } from "../../shared/services/isShownItem.service";
import { GetItemsService } from "../../shared/services/getItems.service";
import { ServerItem } from "../../shared/models/serverItem";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import $ from "jquery";
import { AttendeeActions } from "../../shared/services/attendeeAction.service";

@Component({
  selector: "app-cart",
  templateUrl: "./appCart.component.html",
  styleUrls: ["./appCart.component.css"]
})
export class AppCartComponent implements OnInit {
  @Input() items: Array<Item>;

  isCartShowed: boolean;
  searched_items: Array<Item>;
  search_word: string;
  searchWordUpdate = new Subject<string>();
  height: number;
  isItemShown: object = { key: "value" };
  http: HttpClient;
  // serverItems: ServerItem
  attendeeStep: number = 0;
  clickedItem: Item = null;

  constructor(
    public isShownItemService: IsShownItemService,
    public getItemsService: GetItemsService,
    public attendeeAction: AttendeeActions
  ) {
    this.searchWordUpdate
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.search_word = value;
        if (this.items && this.items.length > 0) {
          this.searched_items = this.items.filter(item =>
            item.name
              .toLocaleLowerCase()
              .includes(this.search_word.toLocaleLowerCase())
          );
        }
      });
  }

  ngOnInit() {
    this.isCartShowed = true;
    this.search_word = "";

    // this.items.map((item) => {
    //   this.isItemShown[item.id] = false;
    // });
    // TODO init isItemshown
    this.isShownItemService.init(this.items);
    this.searched_items = this.items;
  }

  ngOnChanges() {
    console.log("change???? ", this.items);
  }

  onShift(): void {
    this.isCartShowed = !this.isCartShowed;
  }

  testFunc(): void {
    console.log("This is test Func##############");
  }

  onClickAttendeeItem(): void {
    console.log("attendee button ########");
    this.clickedItem = this.attendeeAction.getClickedItem();
    this.attendeeStep = 1;
  }

  hostItem(e): void {
    // if(this.isItemShown[e.target.className]) return;
    // TODO check
    this.isShownItemService.check(e.target.className);
    var self = this;

    $(document).ready(function() {
      // self.isItemShown[e.target.className] = true;
      self.isShownItemService.setShowed(e.target.className);
      const hideClassName = `.hide__${e.target.className}`;
      const imgSelector = `${hideClassName} .hosted_product`;
      $(hideClassName).removeAttr("style");
      $(hideClassName).css({
        transform: `translate(${e.x - e.offsetX}px, ${e.y - e.offsetY}px)`
      });
      $(imgSelector).attr("src", e.target.src);
    });

    // this.isItemShown = self.isItemShown;
  }
}
