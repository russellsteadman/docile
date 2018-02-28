#!/bin/bash

SAUCEPASS=$(cat ~/.sauce-auth)

curl https://saucelabs.com/rest/v1/teamtofu/js-tests -X POST -u teamtofu:$SAUCEPASS -H 'Content-Type: application/json' -d "{\"platforms\":[[\"Windows 8\", \"internet explorer\", \"10\"], [\"Mac 10.10\", \"safari\", \"8\"], [\"Mac 10.11\", \"safari\", \"10\"], [\"Windows 10\", \"microsoft edge\", \"13\"]], \"url\":\"https://docile.js.org/test/\", \"framework\": \"jasmine\", \"name\": \"docile-compat\"}"