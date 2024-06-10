import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcessModule } from './component/acess/component/acess.module';
import { HomeComponent } from './component/home/home.component';
import { ListEpisodeModule } from './component/episode/list-episode.module';
import { SearchComponent } from './component/search/component/search.component';
import { SearchService } from './component/search/search.service';
import { CharacterModule } from './component/character/character.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AcessModule,
    ListEpisodeModule,
    CharacterModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent],
  // Não é necessário exportar a diretiva a partir de AppModule
})
export class AppModule { }
