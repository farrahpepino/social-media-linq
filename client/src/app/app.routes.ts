import { Routes } from '@angular/router';
import { Hero } from '../Components/Auth/hero/hero';
import { Home } from '../Components/Main/home/home';
import { authGuard } from '../Guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        component: Hero
    },
    {
        path: "home",
        component: Home,
        canActivate: [authGuard]
    }
];
