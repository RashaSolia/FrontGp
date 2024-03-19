import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AddOrderComponent } from './component/add-order/add-order.component';
 import { DealsComponent } from './component/deals/deals.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HomeComponent } from './component/home/home.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SigninComponent } from './component/signin/signin.component';
import { NotificationComponent } from './notification/notification.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'Deals', canActivate:[AuthGuard],component: DealsComponent },
  { path: 'Orders', canActivate:[AuthGuard],component: OrdersComponent  },
  { path: 'home',  canActivate:[AuthGuard],component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'addOrder',  canActivate:[AuthGuard],component: AddOrderComponent },
  { path: 'notification', canActivate:[AuthGuard], component:NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
