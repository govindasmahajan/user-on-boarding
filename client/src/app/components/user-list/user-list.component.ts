import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userList: any = [{ full_name: 'Govinda Mahajan', id: 1 }];
  public selectedUser: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    return this.userService.getUserList().subscribe((res) => {
      if (res && res.response && res.response.length) {
        this.userList = res.response;
        console.log(' user list ', res.response);
      } else {
        console.log(' user list empty ', res);
      }
    })
  }
}
