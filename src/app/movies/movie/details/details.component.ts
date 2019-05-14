import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() details: any;

  trailer: string;
  safeVideoUrl: any;
  math: Math;

  constructor(public sanitizer: DomSanitizer) {
    this.math = Math;
  }

  imgUrl(image: string, size: string): string {
    return 'http://image.tmdb.org/t/p/' + size + '/' + image;
  }

  safeUrl(url: string) {
    return (url);
  }

  ngOnInit() {
    if (this.details.trailer != null) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + this.details.trailer.key
      );
    }

  }

}
