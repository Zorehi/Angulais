import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {QuizComponent} from "./pages/quiz/quiz.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Angulais - Home' },
  { path: 'about-us', component: AboutUsComponent, title: 'Angulais - A Propos' },
  { path: 'quiz', component: QuizComponent, title: 'Angulais - A Propos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
