/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Observable } from 'rxjs';

import { LoggerFactory } from '../logging';
import { HttpConfig } from './http_config';
import { HttpService, HttpServiceStart } from './http_service';
import { Router } from './router';

export { Router, KibanaRequest } from './router';
export { HttpService, HttpServiceStart };
export { HttpServerInfo } from './http_server';
export { BasePathProxyServer } from './base_path_proxy_server';

export { HttpConfig };

export class HttpModule {
  public readonly service: HttpService;

  constructor(readonly config$: Observable<HttpConfig>, logger: LoggerFactory) {
    this.service = new HttpService(this.config$, logger);

    const router = new Router('/core');
    router.get({ path: '/', validate: false }, async (req, res) => res.ok({ version: '0.0.1' }));
    this.service.registerRouter(router);
  }
}
