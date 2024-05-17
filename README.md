RUN LIVE ANDROID SERVER:

ionic cap run android --livereload --external

To be able to run localhost on android emulator:
 adb reverse tcp:5000 tcp:5000
