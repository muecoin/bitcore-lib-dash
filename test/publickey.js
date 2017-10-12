'use strict';

var should = require('chai').should();
var expect = require('chai').expect;

var bitcore = require('..');
var Point = bitcore.crypto.Point;
var BN = bitcore.crypto.BN;
var PublicKey = bitcore.PublicKey;
var PrivateKey = bitcore.PrivateKey;
var Address = bitcore.Address;
var Networks = bitcore.Networks;

/* jshint maxlen: 200 */

describe('PublicKey', function() {
  /* jshint maxstatements: 30 */

  var invalidPoint = '0400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

  describe('validating errors on creation', function() {
    it('errors if data is missing', function() {
      (function() {
        return new PublicKey();
      }).should.throw('First argument is required, please include public key data.');
    });

    it('errors if an invalid point is provided', function() {
      (function() {
        return new PublicKey(invalidPoint);
      }).should.throw('Invalid x,y value for curve, cannot equal 0.');
    });

    it('errors if a point not on the secp256k1 curve is provided', function() {
      (function() {
        return new PublicKey(new Point(1000, 1000));
      }).should.throw('Invalid y value for curve.');
    });

    it('errors if the argument is of an unrecognized type', function() {
      (function() {
        return new PublicKey(new Error());
      }).should.throw('First argument is an unrecognized data format.');
    });
  });

  describe('instantiation', function() {

    it('from a private key', function() {
      var privhex = '29BE1B0DA6F6A489B311DEF7BD8762CB3E87B1D24FCF01103F392DE1554891DD';
      var pubhex = '03d800b90a4fb65d975a8a74f3a7d02672633190239e091f4dcaa801d80064f662';
      var privkey = new PrivateKey(new BN(new Buffer(privhex, 'hex')));
      var pk = new PublicKey(privkey);
      pk.toString().should.equal(pubhex);
    });

    it('problematic secp256k1 public keys', function() {

      var knownKeys = [
        {
          wif: 'Kn2mEzRoX4xRZvFP85FStmgsDCxAoseXhAw8UqNg2am7Se3xXHwL',
          priv: 'EDD4EC6D14E46DBA3475C3B94035EE4BED4C52EE7ED1DCCFCCE60F79E87EE096',
          pub: '02b492d383fb931e4777c9ab458978438e5146a2d9be07d3a3d0594d11f79aae11',
          pubx: 'b492d383fb931e4777c9ab458978438e5146a2d9be07d3a3d0594d11f79aae11',
          puby: '80e432d5a3e83e7aaad3e8b73afab4417014eb853e905f7b9995fb879f575724'
        },
        {
          wif: 'KiW6X5Q9kv3Mg33qjNnbRAVi4ZA6eRsPCw7MiSwa74uNNBALfJ1t',
          priv: '848AFEDCE6C98D50C6420CDF5E3D724D68A509B8B1FB7690956E3F69EBB1AD63',
          pub: '03fa340d491b6e895096d8974a652da37b3c36f7c59794502e9005283067fd41c9',
          pubx: 'fa340d491b6e895096d8974a652da37b3c36f7c59794502e9005283067fd41c9',
          puby: '242e6424f0b59021ea31156be0fa25417f529d635d2694a746f622231c0be9e5'
        }
      ];

      for(var i = 0; i < knownKeys.length; i++) {
        var privkey = new PrivateKey(knownKeys[i].wif);
        var pubkey = privkey.toPublicKey();
        pubkey.toString().should.equal(knownKeys[i].pub);
        pubkey.point.x.toString('hex').should.equal(knownKeys[i].pubx);
        pubkey.point.y.toString('hex').should.equal(knownKeys[i].puby);
      }

    });

    it('from a compressed public key', function() {
      var publicKeyHex = '02b492d383fb931e4777c9ab458978438e5146a2d9be07d3a3d0594d11f79aae11';
      var publicKey = new PublicKey(publicKeyHex);
      publicKey.toString().should.equal(publicKeyHex);
    });

    it('from another publicKey', function() {
      var publicKeyHex = '03d800b90a4fb65d975a8a74f3a7d02672633190239e091f4dcaa801d80064f662';
      var publicKey = new PublicKey(publicKeyHex);
      var publicKey2 = new PublicKey(publicKey);
      publicKey.should.equal(publicKey2);
    });

    it('sets the network to defaultNetwork if none provided', function() {
      var publicKeyHex = '03FA340D491B6E895096D8974A652DA37B3C36F7C59794502E9005283067FD41C9';
      var publicKey = new PublicKey(publicKeyHex);
      publicKey.network.should.equal(Networks.defaultNetwork);
    });

    it('from a hex encoded DER string', function() {
      var pk = new PublicKey('04FA340D491B6E895096D8974A652DA37B3C36F7C59794502E9005283067FD41C9242E6424F0B59021EA31156BE0FA25417F529D635D2694A746F622231C0BE9E5');
      should.exist(pk.point);
      pk.point.getX().toString(16).should.equal('fa340d491b6e895096d8974a652da37b3c36f7c59794502e9005283067fd41c9');
    });

    it('from a hex encoded DER buffer', function() {
      var pk = new PublicKey(new Buffer('04FA340D491B6E895096D8974A652DA37B3C36F7C59794502E9005283067FD41C9242E6424F0B59021EA31156BE0FA25417F529D635D2694A746F622231C0BE9E5', 'hex'));
      should.exist(pk.point);
      pk.point.getX().toString(16).should.equal('fa340d491b6e895096d8974a652da37b3c36f7c59794502e9005283067fd41c9');
    });

    it('from a point', function() {
      var p = new Point('86a80a5a2bfc48dddde2b0bd88bd56b0b6ddc4e6811445b175b90268924d7d48',
                        '3b402dfc89712cfe50963e670a0598e6b152b3cd94735001cdac6794975d3afd');
      var a = new PublicKey(p);
      should.exist(a.point);
      a.point.toString().should.equal(p.toString());
      var c = new PublicKey(p);
      should.exist(c.point);
      c.point.toString().should.equal(p.toString());
    });
  });


  describe('#getValidationError', function(){

    it('should recieve an invalid point error', function() {
      var error = PublicKey.getValidationError(invalidPoint);
      should.exist(error);
      error.message.should.equal('Invalid x,y value for curve, cannot equal 0.');
    });

    it('should recieve a boolean as false', function() {
      var valid = PublicKey.isValid(invalidPoint);
      valid.should.equal(false);
    });

    it('should recieve a boolean as true for uncompressed', function() {
      var valid = PublicKey.isValid('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
      valid.should.equal(true);
    });

    it('should recieve a boolean as true for compressed', function() {
      var valid = PublicKey.isValid('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      valid.should.equal(true);
    });

  });

  describe('#fromPoint', function() {

    it('should instantiate from a point', function() {
      var p = new Point('86a80a5a2bfc48dddde2b0bd88bd56b0b6ddc4e6811445b175b90268924d7d48',
                        '3b402dfc89712cfe50963e670a0598e6b152b3cd94735001cdac6794975d3afd');
      var b = PublicKey.fromPoint(p);
      should.exist(b.point);
      b.point.toString().should.equal(p.toString());
    });

    it('should error because paramater is not a point', function() {
      (function() {
        PublicKey.fromPoint(new Error());
      }).should.throw('First argument must be an instance of Point.');
    });
  });

  describe('#json/object', function() {

    it('should input/ouput json', function() {
      var json = JSON.stringify({
        x: '1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a',
        y: '7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341',
        compressed: false
      });
      var pubkey = new PublicKey(JSON.parse(json));
      JSON.stringify(pubkey).should.deep.equal(json);
    });

    it('fails if "y" is not provided', function() {
      expect(function() {
        return new PublicKey({
          x: '1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a'
        });
      }).to.throw();
    });

    it('fails if invalid JSON is provided', function() {
      expect(function() {
        return PublicKey._transformJSON('¹');
      }).to.throw();
    });

    it('works for X starting with 0x00', function() {
      var a = new PublicKey('030589ee559348bd6a7325994f9c8eff12bd5d73cc683142bd0dd1a17abc99b0dc');
      var b = new PublicKey('03'+a.toObject().x);
      b.toString().should.equal(a.toString());
    });

  });

  describe('#fromPrivateKey', function() {

    it('should make a public key from a privkey', function() {
      should.exist(PublicKey.fromPrivateKey(PrivateKey.fromRandom()));
    });

    it('should error because not an instance of privkey', function() {
      (function() {
        PublicKey.fromPrivateKey(new Error());
      }).should.throw('Must be an instance of PrivateKey');
    });

  });

  describe('#fromBuffer', function() {

    it('should parse this uncompressed public key', function() {
      var pk = PublicKey.fromBuffer(new Buffer('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341', 'hex'));
      pk.point.getX().toString(16).should.equal('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pk.point.getY().toString(16).should.equal('7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });

    it('should parse this compressed public key', function() {
      var pk = PublicKey.fromBuffer(new Buffer('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      pk.point.getX().toString(16).should.equal('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pk.point.getY().toString(16).should.equal('7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });

    it('should throw an error on this invalid public key', function() {
      (function() {
        PublicKey.fromBuffer(new Buffer('091ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      }).should.throw();
    });

    it('should throw error because not a buffer', function() {
      (function() {
        PublicKey.fromBuffer('091ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      }).should.throw('Must be a hex buffer of DER encoded public key');
    });

    it('should throw error because buffer is the incorrect length', function() {
      (function() {
        PublicKey.fromBuffer(new Buffer('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a34112', 'hex'));
      }).should.throw('Length of x and y must be 32 bytes');
    });

  });

  describe('#fromDER', function() {

    it('should parse this uncompressed public key', function() {
      var pk = PublicKey.fromDER(new Buffer('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341', 'hex'));
      pk.point.getX().toString(16).should.equal('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pk.point.getY().toString(16).should.equal('7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });

    it('should parse this compressed public key', function() {
      var pk = PublicKey.fromDER(new Buffer('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      pk.point.getX().toString(16).should.equal('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pk.point.getY().toString(16).should.equal('7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });

    it('should throw an error on this invalid public key', function() {
      (function() {
        PublicKey.fromDER(new Buffer('091ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      }).should.throw();
    });

  });

  describe('#fromString', function() {

    it('should parse this known valid public key', function() {
      var pk = PublicKey.fromString('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
      pk.point.getX().toString(16).should.equal('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pk.point.getY().toString(16).should.equal('7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });

  });

  describe('#fromX', function() {

    it('should create this known public key', function() {
      var x = BN.fromBuffer(new Buffer('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      var pk = PublicKey.fromX(true, x);
      pk.point.getX().toString(16).should.equal('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pk.point.getY().toString(16).should.equal('7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });


    it('should error because odd was not included as a param', function() {
      var x = BN.fromBuffer(new Buffer('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      (function() {
        return PublicKey.fromX(null, x);
      }).should.throw('Must specify whether y is odd or not (true or false)');
    });

  });

  describe('#toBuffer', function() {

    it('should return this compressed DER format', function() {
      var x = BN.fromBuffer(new Buffer('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      var pk = PublicKey.fromX(true, x);
      pk.toBuffer().toString('hex').should.equal('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
    });

    it('should return this uncompressed DER format', function() {
      var x = BN.fromBuffer(new Buffer('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      var pk = PublicKey.fromX(true, x);
      pk.toBuffer().toString('hex').should.equal('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
    });

  });

  describe('#toDER', function() {

    it('should return this compressed DER format', function() {
      var x = BN.fromBuffer(new Buffer('1ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a', 'hex'));
      var pk = PublicKey.fromX(true, x);
      pk.toDER().toString('hex').should.equal('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
    });

    it('should return this uncompressed DER format', function() {
      var pk = PublicKey.fromString('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
      pk.toDER().toString('hex').should.equal('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
    });
  });

  describe('#toAddress', function() {

    it('should output this known mainnet address correctly', function() {
      var pk = new PublicKey('03A2DB1F7B8DFA42F38AC0D04E81439970C55A2F13F22B36DA94CDB1D9B20DFF48');
      var address = pk.toAddress('livenet');
      address.toString().should.equal('7YhdBekZ6GwtKMQJJaR3Z56wv5gF7ufEpP');
    });

    it('should output this known testnet address correctly', function() {
      var pk = new PublicKey('03D800B90A4FB65D975A8A74F3A7D02672633190239E091F4DCAA801D80064F662');
      var address = pk.toAddress('testnet');
      address.toString().should.equal('GQwVWgKP2hGPtjjt8o93r4kXLijweQ2nYf');
    });

  });

  describe('hashes', function() {

    // wif private key, address
    // see: https://github.com/dashpay/dash/blob/master/src/test/key_tests.cpp#L20
    var data = [
      ['Kn2mEzRoX4xRZvFP85FStmgsDCxAoseXhAw8UqNg2am7Se3xXHwL', '7dNXKo17Z4y6DGgGwB2TWMWaGvM4evYoFB'],
      ['KiW6X5Q9kv3Mg33qjNnbRAVi4ZA6eRsPCw7MiSwa74uNNBALfJ1t', '7oeyMnxLvbAGxMv6TVdAKGRdWWHq3tETe6'],
      ['AYySpGzVKuMU3kqQr8dyNjXGMoUpStJUbHzcdbznMyaPUZMzFXFa', 'GTprm5HaLW8ksgoQcGzMhSvoGBY6a5hFKk'],
      ['AX24GcaB3J3KSUq5vT2AKT474twFSZctnC4Fqa8M656B277W6YBA', 'Gb47yYEsa96r8V1XkFGo25azWfcKC2YFCk']
    ];

    data.forEach(function(d){
      var publicKey = PrivateKey.fromWIF(d[0]).toPublicKey();
      var address = Address.fromString(d[1]);
      address.hashBuffer.should.deep.equal(publicKey._getID());
    });

  });

  describe('#toString', function() {

    it('should print this known public key', function() {
      var hex = '031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a';
      var pk = PublicKey.fromString(hex);
      pk.toString().should.equal(hex);
    });

  });

  describe('#inspect', function() {
    it('should output known uncompressed pubkey for console', function() {
      var pubkey = PublicKey.fromString('041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341');
      pubkey.inspect().should.equal('<PublicKey: 041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a7baad41d04514751e6851f5304fd243751703bed21b914f6be218c0fa354a341, uncompressed>');
    });

    it('should output known compressed pubkey for console', function() {
      var pubkey = PublicKey.fromString('031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a');
      pubkey.inspect().should.equal('<PublicKey: 031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a>');
    });

    it('should output known compressed pubkey with network for console', function() {
      var privkey = PrivateKey.fromWIF('KiW6X5Q9kv3Mg33qjNnbRAVi4ZA6eRsPCw7MiSwa74uNNBALfJ1t');
      var pubkey = new PublicKey(privkey);
      pubkey.inspect().should.equal('<PublicKey: 03fa340d491b6e895096d8974a652da37b3c36f7c59794502e9005283067fd41c9>');
    });

  });

  describe('#validate', function() {

    it('should not have an error if pubkey is valid', function() {
      var hex = '031ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a';
      expect(function() {
        return PublicKey.fromString(hex);
      }).to.not.throw();
    });

    it('should throw an error if pubkey is invalid', function() {
      var hex = '041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a0000000000000000000000000000000000000000000000000000000000000000';
      (function() {
        return PublicKey.fromString(hex);
      }).should.throw('Invalid x,y value for curve, cannot equal 0.');
    });

    it('should throw an error if pubkey is invalid', function() {
      var hex = '041ff0fe0f7b15ffaa85ff9f4744d539139c252a49710fb053bb9f2b933173ff9a00000000000000000000000000000000000000000000000000000000000000FF';
      (function() {
        return PublicKey.fromString(hex);
      }).should.throw('Invalid y value for curve.');
    });

    it('should throw an error if pubkey is infinity', function() {
      (function() {
        return new PublicKey(Point.getG().mul(Point.getN()));
      }).should.throw('Point cannot be equal to Infinity');
    });

  });

});
