# Prerequistes

Python, NodeJS, Web-Ext.

`npm install -g web-ext`

# Development usage

Run addin in Firefox using:

`web-ext run`

The above will run with a temporary Firefox profile.

To use your own profile and also persist changes to that profile:

`web-ext run --keep-profile-changes --firefox-profile=<path to your profile>` 

You can easily find the path to your Firefox profile by going Firefox's hamburger menu > Help > Troubleshooting information.

# Install production version

https://addons.mozilla.org/en-US/firefox/addon/newtabtodo/

# Contributing

Contributions are very welcome!

Check Issues for things that need doing.

Use plain JavaScript, no libraries.
