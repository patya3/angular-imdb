import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ImdbService} from '../services/imdb.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  categoryName: Observable<string>;

  displayedColumns = ['poster', 'title', 'rating', 'release_date'];
  dataSource = new MatTableDataSource<{poster: string, title: string, rating: number, release_date: string}>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private imdbService: ImdbService) { }

  ngOnInit() {
    this.dataSource.data = this.route.snapshot.data.movies;
    this.categoryName = this.imdbService.fetchCategoryName(this.route.snapshot.params.id);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dataSource.data = this.route.snapshot.data.movies;
        this.categoryName = this.imdbService.fetchCategoryName(this.route.snapshot.params.id);
      }
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


