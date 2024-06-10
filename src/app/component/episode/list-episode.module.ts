import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEpisodeComponent } from './component/list-episode/list-episode.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailEpisodeComponent } from './component/detail-episode/detail-episode.component';
import { BrowserModule } from '@angular/platform-browser';
import { EpisodeService } from './services/episode.service';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    BrowserModule
  ],
  declarations: [ListEpisodeComponent, DetailEpisodeComponent],
  exports: [ListEpisodeComponent],
  providers: [EpisodeService],

})
export class ListEpisodeModule { }
