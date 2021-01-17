import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('token')) {
        this.accountService.verifyEmail(paramMap.get('token')).subscribe();
      }
      // this.accountService.verifyEmail(paramMap.get('token')).subscribe(
      //   () => {
      //     console.log();
      //   },
      //   () => {
      //     this.router.navigate(['/not-found']);
      //   }
      // );
    });
  }
}
