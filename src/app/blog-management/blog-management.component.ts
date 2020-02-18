import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { BlogService } from '../service/blog.service';
import { BlogCard } from '../domain/blog-card';
import { Blog } from '../domain/blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs: BlogCard[];
  
  constructor(
    private blogService: BlogService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getBlogs();
  }

  gotoLink(blog: Blog) {
    this.router.navigate(['/editBlog', blog.id]);    
  }

  add(): void {
    this.blogService.addBlog({} as Blog)
      .subscribe(blog => {
        this.blogService.clearCache();
        this.router.navigate(['/editBlog', blog.id]);
      })
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
    });
  }  
}