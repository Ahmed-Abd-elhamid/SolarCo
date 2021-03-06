import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { OfferReviewService } from 'src/app/shared/services/offer-review.service';
import { TutorialService } from 'src/app/shared/services/tutorial.service';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/shared/services/share.service';

@Component({
  selector: 'app-get-comments',
  templateUrl: './get-comments.component.html',
  styleUrls: ['./get-comments.component.scss']
})
export class GetCommentsComponent implements OnInit {

  @Input() contractor_id: number;
  @Input() tutorial_id: number;
  comments = new Array;
  users: number = 0;
  p: number = 1;
  error: string;

  constructor(private __service: OfferReviewService,
    private router: Router,
    private __tutService: TutorialService,
    private shareService: ShareService) { }

  ngOnInit(): void {
    if (this.router.url.includes('blog')) {
      this.__tutService.getTutorialComments(this.tutorial_id).subscribe(
        (response) => {
          if (response) {
            this.setCommentDetails(response);
            this.addComment();
          }
        },
        (error) => {
          this.error = error.error.error;
        })
    } else {
      this.__service.getReviews(this.contractor_id).subscribe(
        (response) => {
          if (response) {
            this.setCommentDetails(response);
          }
        },
        (error) => {
          this.error = error.error.error;
        })
    }
  }

  setCommentDetails(reviews) {
    for (let review of reviews) {
      if (review['user']) {
        this.comments.push({ "id": review['id'], "comment": review['review'], "user": review['user']['name'], "date": review['updated_at'] });
      } else {
        this.comments.push({ "id": review['id'], "comment": review['review'], "date": review['updated_at'] });
      }
    }
    if (this.comments && this.comments.length) this.users = this.comments.length;
  }

  addComment() {
    this.shareService.Data.subscribe((data) => {
      if (data && data['user']) {
        if (!this.comments.includes(data['id'])) {
          this.comments.unshift({ "id": data['id'], "comment": data['review'], "user": data['user']['name'], "date": data['updated_at'] });
          this.users++;
        }
      }
    });
  }

  //scroll up whenever you change the page on pagination
  pageChanged(event) {
    this.p = event;
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 30); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 8);
  }
}
