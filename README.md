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

# Contributions


# Distribution and signing
If you want to use the addon on the daily, and if you want to distribute it to others, you should create a signed XPI file.

Read about this here: https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/