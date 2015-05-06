'use strict';

var _ = require('lodash');
var util = require('util');
var assert = require('better-assert');
var throws = require('assert').throws;

describe('ES6 Test Suite', function() {

    it('let scoping', function() {

        // var is function wide
        var a = 1;

        // let is block-wide
        {
            let a = 0;

            // using let in for loops
            for (let i = 0; i < 10; ++i) {
                ++a;
            }
            assert(a === 10);
        }
        assert(a === 1);

        // block scope
        {
            let a = 20;
        }
        assert(a === 1);

        // var don't complain if var is already defined in scope
        {
            // it simply gets overrwritten
            var a = 20;
        }
        assert(a === 20);

        // undefined variable throws error
        throws(function() {
            absent = true;
        }, ReferenceError);
    });

    it('block scoped functions', function() {

        // block functions
        {
            function test1() {
            }

            function test2() {
                // function inside block
                {
                    // the name is unique to the block scope and not conflicts with parent function
                    function test2() {
                    }

                    test2('inside block inside function');
                }
            }

            // works as expected
            test1('nothing');
            test2('a', 'b', 'c');
        }

        // functions aren't visible outside the scope
        throws(function() {
            test1();
        }, ReferenceError);
    });

    it('const keyword', function() {
        const a = 0;

        throws(function() {
            a = 10;
        }, TypeError);
    });

    it('map creation and iteration', function() {
        let data = [
            ['a', 10],
            ['b', 20],
            ['c', 30],
            ['d', 40],
            ['e', 50],
        ];

        let map = new Map(data);
        assert(map instanceof Map);
        assert(map.get('a') === 10);
        assert(map.get('b') === 20);
        assert(map.get('c') === 30);
        assert(map.get('d') === 40);
        assert(map.get('e') === 50);

        // map iteration
        let iter = map.entries();
        let current = iter.next();
        while (!current.done) {
            current = iter.next();
        }
        assert(current.done === true);
    });
});
