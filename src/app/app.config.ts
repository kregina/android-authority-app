import { InjectionToken } from '@angular/core';

export const FEED_URL = new InjectionToken('FEED_URL');

export function getFeedUrl(): string {
    if(document.URL.startsWith('file:///')){
      console.log('live reload');
      return 'http://www.androidauthority.com/feed/';
    }else{
      console.log('no live reload');
      return '/feed';
    }
  }
  