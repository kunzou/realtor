import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlogService } from '../service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../domain/blog';
import { BlogCard } from '../domain/blog-card';
import { BlogCategory } from '../domain/blog-category';
import { Description } from '../domain/description';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog;
  safeURL: SafeResourceUrl;
  blogList: BlogCard[];
  randomPosts: BlogCard[];
  categories = Object.values(BlogCategory);
  constructor(
    private blogService: BlogService,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getBlog(id);
    this.getBlogs();
  }

  getBlog(id: string): void {
    this.blogService.getBlog(id)
      .subscribe(blog => {
        this.blog = blog;
        if(blog.videoLink != null) {
          this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(blog.videoLink.replace("watch?v=", "embed/"));
        }

      });
  }  

  getBlogs(): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogList = blogs;
      this.getRandomPosts();
    });
  }      

  getRandomPosts() {
    this.randomPosts = Array.from(this.blogList).sort((one, two) => Math.random()>0.5?-1:1).slice(0, 5);
  }  

  getCategoryCount(category: BlogCategory) {
    return this.blogList.filter(blog=>blog.category === category).length
  }  

  redirect(post: BlogCard) {
    this.router.navigate(['/post', post.id]);
  }
  
}
