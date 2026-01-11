import { Routes } from '@angular/router';
import { Hero } from '../Components/Auth/hero/hero';
import { Home } from '../Components/Main/home/home';
export const routes: Routes = [
    {
        path: "hero",
        component: Hero
    },
    {
        path: "",
        component: Home
    }
];
