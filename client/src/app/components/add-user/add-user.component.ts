import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  userArr: any = [];

  constructor(
    public _fb: FormBuilder,
    public userService: UserService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm() {
    this.userForm = this._fb.group({
      full_name: ['', Validators.required],
      id: ['', Validators.required]
    })
  }

  addUser() {
    console.log(this.userForm.value)
    this.userService.createUser(this.userForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/list'))
    },
      err => console.error(err));
  }
}
