import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { musalaAnimations } from 'src/animations';
import { CredentialsService } from '@app/core';
import { Credentials } from '../core/authentication/credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: musalaAnimations
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  searchInput: any;
  credential: Credentials;
  constructor(private credentialService: CredentialsService, private router: Router) {
    this.searchInput = new FormControl('');
  }

  ngOnInit() {
    this.credential = this.credentialService.credentials;
  }

  search() {
    this.router.navigate(['/projects'], { queryParams: { q: this.searchInput.value } });
  }
}
