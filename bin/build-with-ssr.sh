#!/bin/sh

function fix_server_js_syntax() {
    sed -i "s|@hmcts/media-viewer;|'@hmcts/media-viewer';|g" ./dist/server.js
}

function fix_server_js_syntax_mac() {
    sed -i \"\" "s|@hmcts/media-viewer;|'@hmcts/media-viewer';|g" ./dist/server.js
}

function fix_colour_scss() {
    sed -i "s|@error \"Unknown colour \`#{\$colour}\`\";|@return \$colour;|g" ./node_modules/@hmcts/media-viewer/assets/govuk-frontend/helpers/_colour.scss
}

function fix_colour_scss_mac() {
    sed -i "" "s|@error \"Unknown colour \`#{\$colour}\`\";|@return \$colour;|g" ./node_modules/@hmcts/media-viewer/assets/govuk-frontend/helpers/_colour.scss
}

function fix_window_print() {
    find ./node_modules/@hmcts/media-viewer/ -type f -name '*.js' -exec sed -i "s|printWindow.print();|;|g" {} +;
}

function fix_window_print_mac() {
    find ./node_modules/@hmcts/media-viewer/ -type f -name '*.js' -exec sed -i "" "s|printWindow.print();|;|g" {} +;
}

osName="$(uname -s)"
echo "Building with ssr on [$osName]."
if [[ "Darwin" == "$osName" ]];then
    fix_window_print_mac && fix_colour_scss_mac && node --max-old-space-size=8000 $(which npm) run build:client-and-server-bundles && node --max-old-space-size=8000 $(which npm) run webpack:server && fix_server_js_syntax_mac
else 
    fix_window_print && fix_colour_scss && node --max-old-space-size=8000 $(which npm) run build:client-and-server-bundles && node --max-old-space-size=8000 $(which npm) run webpack:server && fix_server_js_syntax
fi
