import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../auth/services/user.service';
import { Router } from '@angular/router';
import { SharedStateService } from '../_Services/shared-state.service';
import { combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RoleService } from '../_Services/roles.service';
import { menuList } from 'src/assets/constants/constants';
import { roles } from '../_Interfaces/dashboard';
import { LogoComponent } from '../cropscan/logo/logo.component';
import { NgClass, AsyncPipe } from '@angular/common';


