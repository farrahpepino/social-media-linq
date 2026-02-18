import { Routes } from '@angular/router';
import { Hero } from '../Components/Auth/hero/hero';
import { Home } from '../Components/Main/home/home';
import { authGuard } from '../Guards/auth-guard';
import { unauthGuard } from '../Guards/unauth-guard';
import { Profile } from '../Components/Main/profile/profile';

export const routes: Routes = [
    {
        path: "",
        component: Hero,
        canActivate: [unauthGuard]
    },
    {
        path: "home",
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: "user/:username",
        component: Profile,
        canActivate: [authGuard]
    },

];
