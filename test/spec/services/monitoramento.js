'use strict';

describe('Service: monitoramento', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var monitoramento;
  beforeEach(inject(function (_monitoramento_) {
    monitoramento = _monitoramento_;
  }));

  it('should do something', function () {
    expect(!!monitoramento).toBe(true);
  });

});
