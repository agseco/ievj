'use-strict';

const expect = require('chai').expect;

const interpolateEnvVars = require('../index.js').interpolateEnvVars;

describe('interpolateEnvVars()', () => {
  before(function() {
    process.env.REPEATS = 'interpolated multiple times';
    process.env.UNIQUE = 'interpolated once';
  });

  after(function() {
    delete process.env.REPEATS;
    delete process.env.UNIQUE;
  });

  it('should work', () => {
    const object = {
      a: 'a',
      b: '${env.REPEATS}',
      c: {
        a: '${env.UNIQUE}',
        b: {
          a: '${env.REPEATS}',
          b: '${env.MISSING}'
        }
      }
    };

    const result = interpolateEnvVars(object);
    expect(result.a).to.equal('a');
    expect(result.b).to.equal(process.env.REPEATS);
    expect(result.c.a).to.equal(process.env.UNIQUE);
    expect(result.c.b.a).to.equal(process.env.REPEATS);
    expect(result.c.b.b).to.equal('${env.MISSING}');

    expect(() => interpolateEnvVars(object, true)).to.throw('Some environment variables could not be replaced');
  });
});
