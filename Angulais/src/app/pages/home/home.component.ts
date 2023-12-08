import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('scroll') scroll!: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    const boxes = document.querySelectorAll('.box');

    const checkScroll = () => {
      let height = 0;
      boxes.forEach((box) => {
        height += box.clientHeight;
        var boxPosition = height - boxes[0].clientHeight - 700;
        var screenHeight = this.scroll.nativeElement.scrollTop;
        if (boxPosition <= screenHeight) {
          box.classList.add('visible');
        }
      });
    }
    checkScroll();
    // Écoutez l'événement de défilement et vérifiez les boîtes visibles
    this.scroll.nativeElement.addEventListener('scroll', checkScroll);
  }

}
