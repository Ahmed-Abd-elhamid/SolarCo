import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { SinglePostComponent } from './single-post/single-post.component';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { FormsModule } from '@angular/forms';
import { UpdatePostFormComponent } from './update-post-form/update-post-form.component';

@NgModule({
  declarations: [HomepageComponent,SinglePostComponent, CreatePostFormComponent, UpdatePostFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class PostModule { }