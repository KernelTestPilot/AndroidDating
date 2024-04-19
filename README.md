RUN LIVE ANDROID SERVER:

ionic cap run android --livereload --external

To be able to run localhost on android emulator:
 adb reverse tcp:3000 tcp:3000
