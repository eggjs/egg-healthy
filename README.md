# egg-healthy

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-healthy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-healthy
[travis-image]: https://img.shields.io/travis/eggjs/egg-healthy.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-healthy
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-healthy.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-healthy?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-healthy.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-healthy
[snyk-image]: https://snyk.io/test/npm/egg-healthy/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-healthy
[download-image]: https://img.shields.io/npm/dm/egg-healthy.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-healthy

Liveness and Readiness health check for egg application

Health Status Code | Readiness Status Code | Liveness Status Code | Description
-- | -- | -- | --
STARTING | 503 UNAVAILABLE | 200 OK
UP | 200 OK | 200 OK
DOWN | 503 UNAVAILABLE | 503 UNAVAILABLE
STOPPING | 503 UNAVAILABLE | 503 UNAVAILABLE

## Install

```bash
$ npm i egg-healthy --save
```

## Usage

### Configuration

Configure plugin.js

```js
// {app_root}/config/plugin.js
exports.healthy = {
  enable: true,
  package: 'egg-healthy',
};
```

Configure config.js

```js
// {app_root}/config/config.default.js
exports.healthy = {
  readinessPath: 'custom path for readiness check',
  livenessPath: 'custom path for liveness check',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

### Run with Kubernetes
You can run egg in kubernetes well with this plugin, you can set [Liveness and Readiness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) when create pod.

```yaml
livenessProbe:
  httpGet:
    path: /healthy/liveness
    port: 7001
  initialDelaySeconds: 3
  periodSeconds: 3
readinessProbe:
  httpGet:
    path: /healthy/readiness
    port: 7001
  initialDelaySeconds: 3
  periodSeconds: 3
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
