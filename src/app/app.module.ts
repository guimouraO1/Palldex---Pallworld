import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from "./components/nav/nav.component"; // Adicione esta linha


@NgModule({
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        // Pages
        NavComponent,
        LoginComponent,
        // Obrigatórios
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSlideToggleModule,
        AppRoutingModule,
        NavComponent
    ]
})
export class AppModule {}
