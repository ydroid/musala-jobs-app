import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AdminGuard } from './core/guards/admin.guard';
import { extract } from './core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      data: { title: extract('Profile') }
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      data: { title: extract('Dashboard') }
    },
    {
      path: 'admin-panel',
      loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
      canActivate: [AdminGuard]
    },
    { path: 'all-projects', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) }
  ]),
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
