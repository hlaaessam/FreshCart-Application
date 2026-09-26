import { TranslationService } from './../../core/services/translation.service';
import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, NgClass],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent {
  readonly _AuthService = inject(AuthService);
  readonly _TranslateService = inject(TranslateService);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _CartService = inject(CartService);

  countNumber: Signal<number> = computed(() => this._CartService.cartNumber());

  private readonly LG_BREAKPOINT = 992;

  ngOnInit(): void {
    this._CartService.getCartProudcts().subscribe({
      next: (res) => {
        // BehaviorSubject
        // this._CartService.cartNumber.next(res.numOfCartItems);
        // signal
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
    // BehaviorSubject
    // this._CartService.cartNumber.subscribe({
    //   next: (value) => {
    //     this.countNumber = value;
    //   },
    // }); // instead make countNumber depends on cartNumber
  }

  change(lang: string): void {
    this._TranslationService.changeLang(lang);
  }

  closeNavbar(): void {
    if (window.innerWidth >= this.LG_BREAKPOINT) return;

    const menu = document.getElementById('navbarNav');
    const toggler = document.querySelector(
      '.navbar-toggler',
    ) as HTMLElement | null;

    if (menu?.classList.contains('show')) {
      menu.classList.remove('show');
    }
    toggler?.setAttribute('aria-expanded', 'false');
  }
}
