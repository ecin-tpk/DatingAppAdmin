import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  tabId: number;

  @ViewChild('statusTabs', { static: true })
  statusTabs: TabsetComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    const tabHeading = this.router.url.split('/').pop();
    this.selectTab(tabHeading);
  }

  onSelectTab(data: TabDirective) {
    this.router.navigate(['/account/settings/' + data.heading]);
  }

  selectTab(tabHeading: string) {
    switch (tabHeading) {
      case 'general':
        this.statusTabs.tabs[0].active = true;
        break;
      case 'billing':
        this.statusTabs.tabs[1].active = true;
        break;
      case 'members':
        this.statusTabs.tabs[2].active = true;
        break;
      case 'security':
        this.statusTabs.tabs[3].active = true;
        break;
      case 'notifications':
        this.statusTabs.tabs[4].active = true;
        break;
    }
  }
}
