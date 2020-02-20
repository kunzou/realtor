import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { BlogCard } from '../domain/blog-card';
import { BlogCategory } from '../domain/blog-category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  currentCategory;
  page :number = 1
  pageSize :number = 5
  blogList: BlogCard[];
  categories = Object.values(BlogCategory)
  
  displayList: BlogCard[];
  randomPosts: BlogCard[];

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentCategory = this.route.snapshot.paramMap.get('id');
    this.getBlogs(this.currentCategory);
  }

  getBlogs(category: string): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogList = blogs;
      this.displayList = blogs;
      if(this.currentCategory!=null) {
        this.displayList = blogs.filter(post => post.category === category)
      }
      this.getRandomPosts();
    });
  }    

  getCategoryCount(category: BlogCategory) {
    return this.blogList.filter(blog=>blog.category === category).length
  }

  changeCategory(category: BlogCategory) {
    this.currentCategory = category;
    if(this.currentCategory == null) {
      this.displayList = this.blogList;
    } else {
      this.displayList = this.blogList.filter(post => post.category === category)
    }
  }

  resetCategory() {
    this.currentCategory = null;
    this.changeCategory(this.currentCategory);
  }

  getRandomPosts() {
    this.randomPosts = Array.from(this.blogList).sort((one, two) => Math.random()>0.5?-1:1).slice(0, 5);
  }

  getRandomPostsTitle(post: BlogCard) {
    return post.title
  }
}
