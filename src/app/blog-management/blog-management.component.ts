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
  countries = COUNTRIES;

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

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];
