import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  sub: Subscription;
  page: number;
  produtosPorPagina: number = 20;

  @Input() productsTotal: number;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.page = queryParams['page'];
      }
    )
  }

  paginas() {
    const current = Number(this.page);//7
    const range = 9;
    const offset = Math.ceil(range / 2);
    console.log('offset', offset)
    const total = this.paginasTotal();
    console.log('total', total)
    const pagesArray = [];

    for (let i = 1; i <= total; i++) {
      pagesArray.push(i);
    }

    pagesArray.splice(0, current - offset);
    pagesArray.splice(range, total);

    console.log('pagesArray', pagesArray)
    return pagesArray;
  }

  paginasTotal() {
    const total = this.productsTotal / this.produtosPorPagina;
    return total !== Infinity ? Math.ceil(total) : 0;
  }

  nextPage(page) {
    this.router.navigate([`/products/${this.route.snapshot.params['slug']}`], { queryParams: { 'page': page } })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
