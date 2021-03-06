import { Injectable } from '@angular/core';
import { AppConfig } from './appConfig.model';
import { RunMode } from '../core.enum';

@Injectable()
export class AppConfigDev implements AppConfig {
  BASE_URL = 'https://localhost:44336';
  RunMode: RunMode = RunMode.Dev;
}
