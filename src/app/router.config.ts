import { Home } from './home';
import {IndexComponent} from './index/index.component';
import {PlayersComponent} from './players/players.component';
import {AbyssComponent} from './abyss/abyss.component';
import {LegionsComponent} from './legions/legions.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ContactComponent} from './contact/contact.component';
import {AccountComponent} from './account/account.component';
import {AccountDetailComponent} from './account/account-detail.component';
import {CharComponent} from './char/char.component';
import {CharDetailComponent} from './char/char-detail.component';

export const ROUTES = [
  {
    path: '/index',
    name: 'Index',
    component: IndexComponent,
    useAsDefault: true
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupComponent
  },
  {
    path: '/players',
    name: 'Players',
    component: PlayersComponent
  },
  {
    path: '/abyss',
    name: 'Abyss',
    component: AbyssComponent
  },
  {
    path: '/legions',
    name: 'Legions',
    component: LegionsComponent
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactComponent
  },
  { path: '/account',  name: 'Item',  component: AccountComponent },
  { path: '/account/detail/:id', name: 'AccountDetail', component: AccountDetailComponent },
  { path: '/char',  name: 'Char',  component: CharComponent },
  { path: '/char/detail/:id', name: 'CharDetail', component: CharDetailComponent },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
];
