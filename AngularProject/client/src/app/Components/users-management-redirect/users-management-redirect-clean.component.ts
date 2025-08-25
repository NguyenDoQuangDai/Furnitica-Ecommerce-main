import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-management-redirect',
  template: `
    <div class="container text-center mt-5">
      <h3>Đang chuyển hướng đến Users Management...</h3>
      <p>Nếu không tự động chuyển hướng, <a [href]="redirectUrl" target="_blank">click vào đây</a></p>
    </div>
  `
})
export class UsersManagementRedirectComponent implements OnInit {

  redirectUrl: string = 'http://localhost:5173/';

  constructor() { }

  ngOnInit(): void {
    // Redirect trực tiếp đến React app không cần authentication
    console.log('🔄 Redirecting to React Users Management...');
    
    this.redirectUrl = 'http://localhost:5173/';
    
    setTimeout(() => {
      window.open(this.redirectUrl, '_blank');
    }, 1000);
  }
}
