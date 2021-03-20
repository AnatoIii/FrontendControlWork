import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { FakeDataService } from 'src/app/services/fake-data-service.service';
import { SaveModalComponent } from '../save-modal/save-modal.component';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  user: User;
  posts: Post[];
  
  constructor(
    private fakeDataService: FakeDataService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  private loadPosts() {
    this.fakeDataService.getPosts()
      .subscribe(res => {
        this.posts = res;
      });
  }

  ngOnInit(): void {
    this.fakeDataService.getUser()
      .subscribe(res => {
        this.user = res[0];
      });
    this.loadPosts();
  }
  
  formatDate(date: Date) {
    const momentDate = moment(date);
    return momentDate.format('DD MMMM YYYY'); 
  }

  onCreate() {
    const dialogRef = this.dialog.open(SaveModalComponent, {
      width: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.fakeDataService.addPost(result)
           .subscribe(_ => {
             this.loadPosts();
             this.toastr.success('Post successfully created!');
         });
      }
    });
  }

  onDelete(post: Post) {
    this.fakeDataService.deletePost(post.id)
       .subscribe(_ => {
         this.loadPosts();
         this.toastr.info(`Post ${post.title} was successfully deleted!`);
     });
  }
  
  onEdit(post: Post) {
    const dialogRef = this.dialog.open(SaveModalComponent, {
      width: '370px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.fakeDataService.updatePost(result)
           .subscribe(_ => {
             this.loadPosts();
             this.toastr.success('Post successfully updated!');
         });
      }
    });
  }
  
  onSave = (post: Post) => {
    // if (!!editedPost) {
    //   this.fakeDataService.updatePost(post)
    //     .then(_ => {
    //       this.loadPosts();
    //       toast.success('Post successfully updated');
    //     });

    //   return;
    // }

    // this.fakeDataService.addPost(post)
    //   .then(_ => {
    //     this.loadPosts();
    //     toast.success('Post successfully created');
    //   });
  }
}
