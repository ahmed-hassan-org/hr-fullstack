import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SharedWapelModule } from '../../SharedWapel.module';

@Component({
  standalone: true,
  selector: 'wapel-erp-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [CommonModule, SharedWapelModule],
})
@UntilDestroy({ checkProperties: true })
export class WapelBreadcrumbComponent implements OnInit {
  /** this input is used to show path variable from url */
  @Input({ required: false }) showPathVariable = false;
  /** an array of string of data after the end of origian routing crumb */
  @Input({ required: false }) addTextInLast: string[] = [];

  currentUrl: string | string[] = '';
  urlArr: string[] = [];
  translateUrlArr: any[] = [];
  incomeUrl!: string;
  fullChildUrl = '';
  url = 'home';

  /** get translation Array length */
  trandlsateArrLenght: number = this.translateUrlArr.length - 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  // readonly home = { icon: "fa fa-home", url: "home" };
  menuItems = [];

  ngOnInit() {
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);

    this.translateService.onLangChange
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.createBreadcrumbs(this.activatedRoute.root);
      });

    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        this.createBreadcrumbs(this.activatedRoute.root);
      }
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url = 'home',
    breadcrumbs: any[] = [],
  ): any {
    const children: ActivatedRoute[] = route.children;

    // if there is no children
    if (children.length === 0) {
      return breadcrumbs.shift();
    }

    /** if the current router has at least one child
     */
    for (const child of children) {
      if (!child.snapshot.url) {
        return;
      }
      const routeURL: string = child.snapshot?.url
        ? child.snapshot?.url[0]?.path
        : '';

      if (routeURL !== '' && routeURL) {
        url += `/${routeURL}`;
      }

      const label =
        child.snapshot.data[WapelBreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (label !== null || label !== undefined) {
        breadcrumbs.push(this.getUrlTranslation(url));
        /// << check if child have data and path variable input is true >> //
        if (this.showPathVariable) {
          if (Object.values(child.snapshot.data).length > 0) {
            const paramData = {
              urlTranslated: Object.values(child.snapshot.params)[0],
              realUrl: null,
              icon: 'add',
            };
            this.translateUrlArr.push(paramData as any);
          }
        }
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  // *********************************************************
  /** get translation for url */
  getUrlTranslation(url: string, child?: any): string {
    let currUrl: any;
    if (url === 'home') {
      this.urlArr = ['/'];
    } else {
      this.urlArr = [];
      this.urlArr = url.split('/');
    }
    this.translateUrlArr = this.urlArr.map((ele) => {
      if (ele === 'home' || ele === null || ele === '/') {
        const urlTranslated =
          this.translateService.instant('URL-TRANSLATE.home');
        return { urlTranslated: urlTranslated, realUrl: '/', icon: 'home' };
      } else {
        // << get the url before the query parameter (?) >> //
        const urlTranslated = this.translateService.instant(
          'URL-TRANSLATE.' +
            ele.substring(
              0,
              ele.indexOf('?', 1) !== -1 ? ele.indexOf('?', 1) : ele.length,
            ),
        );
        return { urlTranslated: urlTranslated, realUrl: ele, icon: 'add' };
      }
    });

    if (this.translateUrlArr.length === 1) {
      currUrl = this.translateUrlArr;
    } else {
      currUrl = this.translateUrlArr;
    }
    this.currentUrl = currUrl;
    return currUrl;
  }

  /** navigate to clciked router if it defined in routes */
  goLink(item: any, idx?: number) {
    const arrLenght = this.translateUrlArr.length;
    if ((idx as number) + 1 < arrLenght) {
      this.router.navigateByUrl(item);
    }
  }
}
