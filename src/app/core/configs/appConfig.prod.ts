import { Injectable } from '@angular/core';
import { AppConfig } from './appConfig.model';
import { RunMode } from '../core.enum';

@Injectable()
export class AppConfigProd implements AppConfig {
  BASE_URL = 'http://xxx';
  RunMode: RunMode = RunMode.Prod;
}
