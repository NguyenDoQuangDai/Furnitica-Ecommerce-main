import { Component, Input, OnInit } from '@angular/core';
import { IWishlist } from 'src/app/Models/iwishlist';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist-heart',
  templateUrl: './wishlist-heart.component.html',
  styleUrls: ['./wishlist-heart.component.css']
})
export class WishlistHeartComponent implements OnInit {
  @Input() productId?: number = 0;
  wishlist: IWishlist[] = [];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    // Only call wishlist API if user is logged in
    if (localStorage.getItem("access-token")) {
      this.wishlistService.getWishList().subscribe({
        next: (wishlist) => {
          this.wishlist = wishlist;
        },
        error: (error) => {
          // Handle 401 error silently - user not logged in
          if (error.status === 401) {
            this.wishlist = [];
          } else {
            console.error('Wishlist error:', error);
          }
        }
      });
    }
  }

  InWishlist(): boolean {
    return this.wishlist.find(w => w.productId == this.productId) == null ? false : true;
  }

  RemoveFromWishList() {
    if (this.productId && localStorage.getItem("access-token")) {
      this.wishlistService.RemoveFromWishlist(this.productId).subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Remove from wishlist error:', error);
        }
      });
    }
  }

  AddToWishList() {
    if (this.productId && localStorage.getItem("access-token")) {
      this.wishlistService.AddToWishlist(this.productId).subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Add to wishlist error:', error);
        }
      });
    }
  }
}
