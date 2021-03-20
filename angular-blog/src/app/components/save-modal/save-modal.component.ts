import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements OnInit {
  title: string = '';
  description: string = '';
  error: string;

  constructor(
    public dialogRef: MatDialogRef<SaveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post) {}

  ngOnInit(): void {
    console.log(this.post)
    if (!!this.post) {
      this.title = this.post.title;
      this.description = this.post.description;
    }
  }

  createEditText() {
    return !!this.post ? 'Edit' : 'Create';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitSave() {
    this.error = '';
    if (this.title.length < 5) {
        this.error = 'Title min length is 5 symbols';
        return;
    }

    const post: Post = {
        title: this.title,
        description: this.description,
        createdAt: new Date(),
        likes: 0
    };

    if (!!this.post) {
        post.likes = this.post.likes;
        post.id = this.post.id; 
    }

    this.dialogRef.close(post);
  };
}
