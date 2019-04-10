'use-strict';

const expect = require('chai').expect;

const interpolateEnvVars = require('../index.js').interpolateEnvVars;

describe('interpolateEnvVars()', () => {
  before(function() {
    process.env.MANY = 'interpolated MANY times';
    process.env.ONCE = 'interpolated ONCE';
  });

  after(function() {
    delete process.env.MANY;
    delete process.env.ONCE;
  });

  it('should work', () => {
    const object = {
      a: 'a',
      b: '${env.MANY}',
      c: {
        a: '${env.ONCE}',
        b: {
          a: '${env.MANY}',
          b: '${env.MISSING}'
        }
      }
    };

    const result = interpolateEnvVars(object);
    expect(result.a).to.equal('a');
    expect(result.b).to.equal(process.env.MANY);
    expect(result.c.a).to.equal(process.env.ONCE);
    expect(result.c.b.a).to.equal(process.env.MANY);
    expect(result.c.b.b).to.equal('${env.MISSING}');

    expect(() => interpolateEnvVars(object, true)).to.throw('Some environment variables could not be replaced');
  });
});
