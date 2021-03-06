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
  btnFirst = false;
  btnLast = false;

  @Input() productsTotal: number;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.page = queryParams['page'];
      }
    )
    if (this.page <= 1) {
      this.btnFirst = true;
    }
    if (this.page >= this.paginasTotal()) {
      this.btnLast = true;
    }
  }

  paginas() {
    const current = Number(this.page);
    const range = 5;
    const total = this.paginasTotal();
    const pagesArray = [];

    for (let i = 1; i <= total; i++) {
      pagesArray.push(i);
    }
    pagesArray.splice(0, current - range);
    pagesArray.splice(range, total);
    return pagesArray;
  }

  paginasTotal() {
    const total = this.productsTotal / this.produtosPorPagina;
    return total !== Infinity ? Math.ceil(total) : 0;
  }

  nextPage(page, type: string = null) {
    if (type != null) {
      page = type === 'subt' ? --page : ++page;
    }
    this.btnFirst = false;
    this.btnLast = false;
    if (page > 0 && page <= this.paginasTotal()) {
      this.router.navigate([`/products/${this.route.snapshot.params['slug']}`], { queryParams: { 'page': page } })
    }
    if (page <= 1) {
      this.btnFirst = true;
    }
    if (page >= this.paginasTotal()) {
      this.btnLast = true;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
