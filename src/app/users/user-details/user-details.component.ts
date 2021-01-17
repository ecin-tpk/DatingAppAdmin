import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserDetails } from '../../_models';
import { UserService } from '../../_services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  selectedDetail: string;
  headings = UserDetails;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userService.getById(paramMap.get('id')).subscribe(
        (res) => {
          console.log(res);
          this.user = res;
          this.route.queryParams.subscribe((params) => {
            if (params['view'] && this.headings.includes(params['view'])) {
              this.selectedDetail = params['view'];
            } else {
              this.router.navigate(['../details'], {
                relativeTo: this.route,
                queryParams: { view: 'overview' },
              });
            }
          });
        },
        () => {
          this.router.navigate(['/not-found']);
        }
      );
    });
  }
}
