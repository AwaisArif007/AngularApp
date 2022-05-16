import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/Core/Services/Client/token-storage.service';



@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
 
 isLoggedIn = false;
 username?: string;
 usernameFirstChar='';
 email?: string;
 nameList: any = [];
  constructor(private router: Router,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.userName;
      this.nameList = user.userName.split(" ");
      for(let i=0; i <2;i++)
      {
        var firstChar=this.nameList[i].charAt(0);
        this.usernameFirstChar= this.usernameFirstChar+firstChar;
      }
      
      this.email = user.email;
      
    }
    else
    {
      this.router.navigate(['/client/login']);
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/client/login']);
    window.location.reload();
  } 

}
