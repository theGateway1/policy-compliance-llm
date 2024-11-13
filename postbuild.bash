# There was some issue with installation of Puppeteer on Heroku due to location of cache, so this is a fix for the same.

echo -e "Store puppeteer executable in cache\n"

mkdir ./.cache

mv /app/.cache/puppeteer ./.cache
