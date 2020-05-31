import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/shared/services/offer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  errorMessage = '';

  offer = {
    proposal: '',
    price: 0,
    post_id: ''
  }
  
  private _routeSubscription: Subscription;

  constructor(private offerService: OfferService,
    private router: Router, private _actvaedRoutes: ActivatedRoute) { }

    ngOnInit(): void {
  
      this._routeSubscription = this._actvaedRoutes.paramMap.subscribe((paramMap) => {
        console.log(paramMap);
        if (paramMap.has('id')) {
          this.offer.post_id = paramMap.get('id');    
        }
      })
    }
  
    ngOnDestroy(): void {
      this._routeSubscription.unsubscribe();
    }

  onSubmit() {
    this.offerService.createOffer(this.offer).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['post']);
      },
      error => {
        console.log(error);
        // this.errorMessage =error.error.errors[0];
      }
    );
  }
}
