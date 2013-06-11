/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */

var ModuleTemplate = require("./module").Template;
var fs = require('fs');

var Command = require("commander").Command;

var _firstCapRe = new RegExp('(.)([A-Z][a-z]+)');
var _allCapRe = new RegExp('([a-z0-9])([A-Z])');
var _fromCamelToDashes = function (name){
        var s1 = name.replace(_firstCapRe, "$1-$2");
        return s1.replace(_allCapRe, "$1-$2").toLowerCase();
    };

exports.Template = Object.create(ModuleTemplate, {

    commandDescription: {
        value: "component"
    },

    didSetOptions: {
        value:function (options) {
            ModuleTemplate.didSetOptions.call(this, options);

            if (!options.extendsModuleId) {
                options.extendsModuleId = "montage/ui/component";
            }

            options.extendsName = this.validateExtendsName(options.extendsName);
        }
    },

    validateExtendsName: {
        value: function(name) {
            //TODO derive the extendsName from the extendsModuleId
            return !name || "Montage" === name ? "Component" : name;
        }
    },

    destination: {
        value: "ui"
    },

    finish: {
        value: function() {
            var self = this;
            return ModuleTemplate.finish.apply(self, arguments).then(function(result) {
                console.log(self.options.name + ".reel created.");
                return result;
            });
        }
    }

});
