'use strict';

describe('Service: usuario', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var usuario;
  beforeEach(inject(function (_usuario_) {
    usuario = _usuario_;
  }));

  it('should do something', function () {
    expect(!!usuario).toBe(true);
  });

});
