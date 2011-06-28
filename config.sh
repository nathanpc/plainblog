#!/bin/sh

echo "Removing the example images"
rm images/*
echo "Done!"

echo "Time to setup the headers"
echo "Blog name: \c"
read title
echo "var blogTitle = '$title';" > "variables/strings.js"
echo "Blog subtitle: \c"
read subtitle
echo "var blogSubTitle = '$subtitle';" >> "variables/strings.js"
echo "Done!"

tput bold
echo "Now edit the variables/headNav.xml file to change the header navigation bar of your blog."
echo "The last thing you need to do is edit the feed.xml file to add your posts(You'll need to change this file every time you make a new post)"
echo "\n\nCongratulations!"
tput reset