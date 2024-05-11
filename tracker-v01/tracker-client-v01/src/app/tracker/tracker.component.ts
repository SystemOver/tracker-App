import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements OnInit{
  username : string = "";

  ngOnInit(): void {
    var localusername = localStorage.getItem("username") ?? "unknown";

    this.username = localusername;
  }


  protected readonly AppComponent = AppComponent;
}

