import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  ReloadCurrentRoute() {
    debugger;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
