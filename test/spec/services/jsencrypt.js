'use strict';

describe('Service: jsencrypt', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var jsencrypt;
  beforeEach(inject(function (_jsencrypt_) {
    jsencrypt = _jsencrypt_;
  }));

  it('should do something', function () {
    expect(!!jsencrypt).toBe(true);
  });

});
