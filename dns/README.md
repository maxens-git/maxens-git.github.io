# dns-mobileconfig
A simple website to create DoH and DoT config files for iOS. 

Might also work on macOS, I don't have a way to test that currently.

## About

Encrypted DNS is getting more and more mainstream. With the release of iOS 14, Apple has included support for DoH and DoT standards, but has not provided a way of using these without an app or profiles.

This tool can generate these profiles from provided data and also provides some premade configurations.

For more information, see the website of the tool itself: https://dns.notjakob.com

## Thanks

- Eli Grey for [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- uuidjs for the [UUID JavaScript library](https://github.com/uuidjs/uuid)
- Nathan Rajlich for [plist.js](https://github.com/TooTallNate/plist.js)
- Paul Miller for [his excellent article](https://paulmillr.com/posts/encrypted-dns/) and the [premade profiles](https://github.com/paulmillr/encrypted-dns)
- W3schools for [w3.css](https://www.w3schools.com/w3css/)
- nitrohorse for [encrypted-dns.party](https://encrypted-dns.party) and the profiles hosted there