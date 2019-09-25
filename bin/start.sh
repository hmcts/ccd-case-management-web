#!/bin/bash

function fix_colour_scss() {
    sed -i "s|@error \"Unknown colour \`#{\$colour}\`\";|@return \$colour;|g" ./node_modules/@hmcts/media-viewer/assets/govuk-frontend/helpers/_colour.scss
}

function fix_colour_scss_mac() {
    sed -i "" "s|@error \"Unknown colour \`#{\$colour}\`\";|@return \$colour;|g" ./node_modules/@hmcts/media-viewer/assets/govuk-frontend/helpers/_colour.scss
}

osName="$(uname -s)"
echo "Building with ssr on [$osName]."
if [[ "Darwin" == "$osName" ]];then
    start-mac": "npm run fix_colour_scss_mac && ng serve
else 
    npm run fix_colour_scss && ng serve
fi
